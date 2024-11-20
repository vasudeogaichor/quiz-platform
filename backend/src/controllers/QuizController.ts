import { Request, Response as ExpressResponse } from "express";
import { CATEngine } from "../services/CATEngine";
import Question from "../models/Question";
import QuizAttempt from "../models/QuizAttempt";
import { AppError, Response } from "../core";
import { Types } from "mongoose";
import { AuthenticatedRequest } from "../types/controllers";

interface AnswerSubmission {
  attemptId: string;
  questionId: string;
  answer: number;
  timeSpent: number;
}

interface QuizHistory {
  score: number;
  topicPerformance: Map<string, { correct: number; total: number }>;
  completedAt: Date;
}

export default class QuizController {
  static catEngine = new CATEngine();

  static async getQuestions(
    req: AuthenticatedRequest,
    res: ExpressResponse
  ): Promise<ExpressResponse> {
    const userId = req.user.id;
    let attempt = await QuizAttempt.findOne({
      user: userId,
      completedAt: null,
    }).populate("questions.question");

    if (!attempt) {
      // Start new quiz
      const firstQuestion = await Question.findOne({
        grade: req.user.grade,
        difficulty: 5, // Start with medium difficulty
      });

      if (!firstQuestion)
        throw AppError.notFound("No question found to start the quiz.");

      attempt = await QuizAttempt.create({
        user: userId,
        questions: [
          {
            question: firstQuestion._id,
            difficultyAttempted: firstQuestion.difficulty,
          },
        ],
      });

      return res.json(
        Response.success({
          question: firstQuestion,
          attemptId: attempt._id,
        })
      );
    }

    // Get next question based on CAT algorithm
    const nextQuestion = await this.catEngine.selectNextQuestion(
      attempt.questions,
      await Question.find({ grade: req.user.grade }),
      ["algebra", "geometry"]
    );

    return res.json(
      Response.success({
        question: nextQuestion,
        attemptId: attempt._id,
      })
    );
  }

  static async submitAnswer(
    req: Request,
    res: ExpressResponse
  ): Promise<ExpressResponse> {
    const { attemptId, questionId, answer, timeSpent }: AnswerSubmission =
      req.body;

    const attempt = await QuizAttempt.findById(attemptId);
    if (!attempt) throw AppError.notFound("Quiz attempt not found");

    const question = await Question.findById(questionId);
    if (!question) throw AppError.notFound("Question not found");

    const isCorrect = question.options[answer].isCorrect;

    // Update attempt
    attempt.questions.push({
      question: questionId,
      userAnswer: answer,
      isCorrect,
      timeSpent,
      difficultyAttempted: question.difficulty,
    });

    await attempt.save();

    // Update question stats
    question.stats.timesAnswered++;
    if (isCorrect) question.stats.timesCorrect++;
    await question.save();

    return res.json(Response.success({ isCorrect }));
  }

  static async completeQuiz(
    req: Request,
    res: ExpressResponse
  ): Promise<ExpressResponse> {
    const { attemptId } = req.body;

    const attempt = await QuizAttempt.findById(attemptId).populate(
      "questions.question"
    );

    if (!attempt) throw AppError.notFound("Quiz attempt not found");

    // Calculate final score and topic performance
    const score =
      (attempt.questions.filter((q) => q.isCorrect).length /
        attempt.questions.length) *
      100;

    const topicPerformance = new Map<
      string,
      { correct: number; total: number }
    >();
    attempt.questions.forEach((q) => {
      const topic = q.question.topic;
      if (!topicPerformance.has(topic)) {
        topicPerformance.set(topic, { correct: 0, total: 0 });
      }
      const stats = topicPerformance.get(topic);
      stats.total++;
      if (q.isCorrect) stats.correct++;
    });

    // Convert topic performance to percentages
    const topicScores: { [key: string]: number } = {};
    topicPerformance.forEach((stats, topic) => {
      topicScores[topic] = (stats.correct / stats.total) * 100;
    });

    // Update attempt with final data
    attempt.completedAt = new Date();
    attempt.score = score;
    attempt.topicPerformance = topicScores;
    await attempt.save();

    // Generate recommendations based on performance
    const recommendations = this.generateRecommendations(topicScores);

    return res.json(
      Response.success({
        score,
        topicPerformance: topicScores,
        recommendations,
        timeSpent: attempt.questions.reduce(
          (sum, q) => sum + (q.timeSpent || 0),
          0
        ),
      })
    );
  }

  static generateRecommendations(topicScores: { [key: string]: number }) {
    const recommendations: {
      topic: string;
      message: string;
      priority: string;
    }[] = [];
    for (const [topic, score] of Object.entries(topicScores)) {
      if (score < 60) {
        recommendations.push({
          topic,
          message: `Review ${topic} fundamentals - performance below expected level`,
          priority: "high",
        });
      } else if (score < 80) {
        recommendations.push({
          topic,
          message: `Practice more ${topic} problems to improve mastery`,
          priority: "medium",
        });
      }
    }
    return recommendations;
  }

  static async getQuizHistory(
    req: AuthenticatedRequest,
    res: ExpressResponse
  ): Promise<ExpressResponse> {
    const attempts = await QuizAttempt.find({
      user: req.user.id,
      completedAt: { $ne: null },
    })
      .sort("-completedAt")
      .select("score topicPerformance completedAt");

    return res.json(Response.success(attempts));
  }
}