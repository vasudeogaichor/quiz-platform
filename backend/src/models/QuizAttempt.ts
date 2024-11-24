import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestionAttempt {
  questionId: mongoose.Types.ObjectId;
  userAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
  difficultyAttempted: number;
}

export interface ITopicPerformance {
  [topic: string]: number;
}

export interface IQuizAttempt extends Document {
  user: mongoose.Types.ObjectId;
  questions: IQuestionAttempt[];
  startedAt: Date;
  completedAt?: Date;
  score: number;
  topicPerformance: ITopicPerformance;
}

const quizAttemptSchema = new Schema<IQuizAttempt>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questions: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    userAnswer: {
      type: Number,
      // required: true
    },
    isCorrect: {
      type: Boolean,
      // required: true
    },
    timeSpent: {
      type: Number,
      // required: true
    },
    difficultyAttempted: {
      type: Number,
      required: true
    }
  }],
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date,
  score: {
    type: Number,
    // required: true
  },
  topicPerformance: {
    type: Map,
    of: Number,
    // required: true
  }
}, { timestamps: true });

export default mongoose.model<IQuizAttempt>('QuizAttempt', quizAttemptSchema);
