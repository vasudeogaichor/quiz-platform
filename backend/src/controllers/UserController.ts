// src/controllers/UserController.ts
import { Request, Response as ExpressResponse } from 'express';
import User from '../models/User';
import QuizAttempt from '../models/QuizAttempt';
import { AppError, Response } from '../core/index';
import { IQuizAttempt } from '../models/QuizAttempt';
import { AuthenticatedRequest } from '../types/controllers';

interface IQuizStats {
  totalQuizzes: number;
  averageScore: number;
  topScore: number;
}

interface ITopicMastery {
  [topic: string]: number;
}

export default class UserController {
  static async getProfile(req: AuthenticatedRequest, res: ExpressResponse): Promise<Response> {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw AppError.notFound('User not found');

    // Get quiz statistics
    const quizStats: IQuizStats[] = await QuizAttempt.aggregate([
      { $match: { user: user._id, completedAt: { $ne: null } } },
      { $group: {
        _id: null,
        totalQuizzes: { $sum: 1 },
        averageScore: { $avg: '$score' },
        topScore: { $max: '$score' }
      }}
    ]);

    // Get topic mastery levels
    const topicMastery = await QuizAttempt.aggregate([
      { $match: { user: user._id, completedAt: { $ne: null } } },
      { $unwind: '$topicPerformance' },
      { $group: {
        _id: '$topicPerformance.topic',
        averageScore: { $avg: '$topicPerformance.score' }
      }}
    ]);

    return Response.success({
      user,
      stats: quizStats[0] || { totalQuizzes: 0, averageScore: 0, topScore: 0 },
      topicMastery: topicMastery.reduce((acc: ITopicMastery, topic: any) => {
        acc[topic._id] = topic.averageScore;
        return acc;
      }, {})
    });
  }

  // static async updateProfile(req: Request, res: ExpressResponse): Promise<Response> {
  //   const allowedUpdates = ['name', 'grade'];
  //   const updates = Object.keys(req.body)
  //     .filter(key => allowedUpdates.includes(key))
  //     .reduce((obj: { [key: string]: any }, key: string) => {
  //       obj[key] = req.body[key];
  //       return obj;
  //     }, {});

  //   if (Object.keys(updates).length === 0) {
  //     throw AppError.badRequest('No valid updates provided');
  //   }

  //   const user = await User.findByIdAndUpdate(
  //     req.user.id,
  //     updates,
  //     { new: true, runValidators: true }
  //   ).select('-password');

  //   return Response.success(user);
  // }

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
