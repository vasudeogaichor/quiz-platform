// src/controllers/UserController.ts
import { Request, Response as ExpressResponse } from "express";
import User from "../models/User";
import QuizAttempt from "../models/QuizAttempt";
import { AppError, Response } from "../core/index";
import { IQuizAttempt } from "../models/QuizAttempt";
import { AuthenticatedRequest } from "../types/controllers";
import { startOfDay, subDays } from "date-fns";

interface IQuizStats {
  totalQuizzes: number;
  averageScore: number;
  topScore: number;
  streakDays: number;
  completedToday: number;
}

interface ITopicMastery {
  [topic: string]: number;
}

export default class UserController {
  static async getProfile(
    req: AuthenticatedRequest,
    res: ExpressResponse
  ): Promise<Response> {
    const user = await User.findById(req.user.id).select("-password");
    // console.log('user - ', user)
    if (!user) throw AppError.notFound("User not found");

    // TODO: Cache below stats and update whenevera new quiz is attempted by user to reduce queries

    // Get quiz statistics
    const quizStats: IQuizStats[] = await QuizAttempt.aggregate([
      { $match: { user: user._id, completedAt: { $ne: null } } },
      {
        $group: {
          _id: null,
          totalQuizzes: { $sum: 1 },
          averageScore: { $avg: "$score" },
          topScore: { $max: "$score" },
        },
      },
    ]);

    // Get topic mastery levels
    const topicMastery = await QuizAttempt.aggregate([
      { $match: { user: user._id, completedAt: { $ne: null } } },
      { $unwind: "$topicPerformance" },
      {
        $group: {
          _id: "$topicPerformance.topic",
          averageScore: { $avg: "$topicPerformance.score" },
        },
      },
    ]);

    const today = startOfDay(new Date());
    const yesterday = startOfDay(subDays(today, 1));

    // Quizzes Attempted Today
    const quizzesToday = await QuizAttempt.countDocuments({
      user: user._id,
      completedAt: { $gte: today },
    });

    // Consecutive Quiz Days
    const consecutiveDays = await QuizAttempt.aggregate([
      { $match: { user: user._id, completedAt: { $ne: null } } },
      { $sort: { completedAt: -1 } }, // Sort by latest completion
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$completedAt" } },
          count: { $sum: 1 }, // Group by unique day
        },
      },
    ]);

    // Calculate streak
    let streak = 0;
    let expectedDate = today;

    for (const day of consecutiveDays) {
      const dayDate = new Date(day._id);
      if (dayDate.toISOString() === expectedDate.toISOString()) {
        streak++;
        expectedDate = subDays(expectedDate, 1); // Move to the previous day
      } else if (dayDate < expectedDate) {
        break; // Streak is broken
      }
    }

    if (quizStats[0]) {
      quizStats[0] = {
        ...quizStats[0],
        completedToday: quizzesToday,
        streakDays: streak,
      };
    }

    return res.json(Response.success({
      user,
      stats: quizStats[0] || {
        totalQuizzes: 0,
        averageScore: 0,
        topScore: 0,
        streakDays: 0,
        completedToday: 0,
      },
      topicMastery: topicMastery.reduce((acc: ITopicMastery, topic: any) => {
        acc[topic._id] = topic.averageScore;
        return acc;
      }, {}),
    }));
  }

  static async updateProfile(
    req: Request,
    res: ExpressResponse
  ): Promise<Response> {
    const allowedUpdates = ["fullName", "grade"];
    const updates = Object.keys(req.body)
      .filter((key) => allowedUpdates.includes(key))
      .reduce((obj: { [key: string]: any }, key: string) => {
        obj[key] = req.body[key];
        return obj;
      }, {});

    if (Object.keys(updates).length === 0) {
      throw AppError.badRequest("No valid updates provided");
    }

    const user = await User.findByIdAndUpdate(req?.user?.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password -googleId");

    return res.json(Response.success(user));
  }

  // static async getPerformanceAnalytics(req: AuthenticatedRequest, res: ExpressResponse): Promise<Response> {
  //   const timeframe: string = req.query.timeframe?.toString() || '30days';
  //   const endDate = new Date();
  //   const startDate = new Date();

  //   switch (timeframe) {
  //     case '7days':
  //       startDate.setDate(startDate.getDate() - 7);
  //       break;
  //     case '30days':
  //       startDate.setDate(startDate.getDate() - 30);
  //       break;
  //     case '90days':
  //       startDate.setDate(startDate.getDate() - 90);
  //       break;
  //     default:
  //       throw AppError.badRequest('Invalid timeframe');
  //   }

  //   const performanceData = await QuizAttempt.aggregate([
  //     {
  //       $match: {
  //         user: req.user.id,
  //         completedAt: { $gte: startDate, $lte: endDate }
  //       }
  //     },
  //     {
  //       $group: {
  //         _id: { $dateToString: { format: '%Y-%m-%d', date: '$completedAt' } },
  //         averageScore: { $avg: '$score' },
  //         quizCount: { $sum: 1 }
  //       }
  //     },
  //     { $sort: { _id: 1 } }
  //   ]);

  //   return Response.success({
  //     timeframe,
  //     performanceData
  //   });
  // }
}
