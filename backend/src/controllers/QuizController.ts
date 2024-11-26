import { Request, Response as ExpressResponse } from "express";
import { CATEngine } from "../services/CATEngine";
import Question, { IQuestion } from "../models/Question";
import QuizAttempt from "../models/QuizAttempt";
import { AppError, Response } from "../core";
import mongoose, { Types } from "mongoose";
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

interface Question {
  _id: string;
  topic: string;
  difficulty: number;
}

export default class QuizController {
  static catEngine = new CATEngine();
  // console.log('catEngine - ', catEngine)

  static async getQuestions(
    req: AuthenticatedRequest,
    res: ExpressResponse
  ): Promise<ExpressResponse> {
    const userId = req.user.id;
    let attempt = await QuizAttempt.findOne({
      user: userId,
      completedAt: null,
    }).populate("questions.questionId");

    if (!attempt) {
      // Start new quiz
      const firstQuestion = await Question.findOne({
        // grade: req.user.grade,
        difficulty: 5,
      }).select("-options.isCorrect -__v");
      // console.log('firstQuestion - ', firstQuestion)

      if (!firstQuestion)
        throw AppError.notFound("No question found to start the quiz.");

      attempt = await QuizAttempt.create({
        user: userId,
        questions: [
          {
            questionId: firstQuestion._id,
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

    // TODO: when more questions are available use grade to filter the available questions further
    const attemptedQuestionIds = attempt.questions.map((q) => q.questionId);
    const remainingQuestions: Question[] = await Question.find({
      _id: { $nin: attemptedQuestionIds },
      // grade: req.user.grade,
    }).select("-options.isCorrect -__v");

    // Get next question based on CAT algorithm
    const nextQuestion = await QuizController.catEngine.selectNextQuestion(
      attempt.questions.map((q) => ({
        ...q,
        questionId: q.questionId.toString(),
      })),
      remainingQuestions,
      ["algebra", "geometry", "biology", "physics", "chemistry", "mathematics", "computing"]
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
    let { attemptId, questionId, answer, timeSpent }: AnswerSubmission =
      req.body;
    // console.log('attemptId, questionId, answer, timeSpent - ', attemptId, questionId, answer, timeSpent)
    const attempt = await QuizAttempt.findById(attemptId);
    // console.log('attempt - ', attempt)
    if (!attempt) throw AppError.notFound("Quiz attempt not found");

    const question = await Question.findById(questionId);
    // console.log('question - ', question)
    if (!question) throw AppError.notFound("Question not found");

    const isCorrect = question.options[answer].isCorrect;
    // console.log('isCorrect - ', isCorrect)

    const questionIndex = attempt.questions.findIndex(
      (q) => q.questionId.toString() === questionId
    );

    if (questionIndex !== -1) {
      // Update the existing question in the array
      attempt.questions[questionIndex].userAnswer = answer + 1;
      attempt.questions[questionIndex].isCorrect = isCorrect;
      attempt.questions[questionIndex].timeSpent = timeSpent;
    } else {
      attempt.questions.push({
        questionId: new mongoose.Types.ObjectId(questionId),
        userAnswer: answer + 1,
        isCorrect,
        timeSpent,
        difficultyAttempted: question.difficulty,
      });
    }

    // Update attempt
    // attempt.questions.push({
    //   questionId: new mongoose.Types.ObjectId(questionId),
    //   userAnswer: answer + 1,
    //   isCorrect,
    //   timeSpent,
    //   difficultyAttempted: question.difficulty,
    // });

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
      "questions.questionId"
    );
    // console.log('attempt - ', attempt)
    if (!attempt) throw AppError.notFound("Quiz attempt not found");

    let correctAnswers = attempt.questions.filter((q) => q.isCorrect).length;

    // Calculate final score and topic performance
    const score = correctAnswers * 100;

    const topicPerformance = new Map<
      string,
      { correct: number; total: number }
    >();
    attempt.questions.forEach((q) => {
      // console.log('q - ', q)
      const question = q.questionId as any;
      const topic = question.topic;
      if (!topicPerformance.has(topic)) {
        topicPerformance.set(topic, { correct: 0, total: 0 });
      }
      const stats = topicPerformance.get(topic);
      if (stats) {
        stats.total++;
        if (q.isCorrect) stats.correct++;
      }
    });

    // Convert topic performance to percentages
    const topicScores: { [key: string]: number } = {};
    topicPerformance.forEach((stats, topic) => {
      topicScores[topic] = parseFloat(
        ((stats.correct / stats.total) * 100).toFixed(2)
      );
    });

    // Update attempt with final data
    attempt.completedAt = new Date();
    attempt.score = score;
    attempt.topicPerformance = topicScores;
    await attempt.save();

    // Generate recommendations based on performance
    const recommendations = QuizController.generateRecommendations(topicScores);

    // TODO: Enable timespent calculation after version 1 is deployed
    return res.json(
      Response.success({
        correctAnswers: correctAnswers.toFixed(0),
        score: score.toFixed(0),
        topicPerformance: topicScores,
        recommendations,
        // timeSpent: attempt.questions.reduce(
        //   (sum, q) => sum + (q.timeSpent || 0),
        //   0
        // ),
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
