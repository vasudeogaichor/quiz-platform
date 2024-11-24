import mongoose, { Document, Schema } from 'mongoose';

export interface IOption {
  text: string;
  isCorrect: boolean;
}

export interface IQuestionStats {
  timesAnswered: number;
  timesCorrect: number;
}

export interface IQuestion extends Document {
  text: string;
  options: IOption[];
  difficulty: number;
  topic: string;
  grade: 7 | 8 | 9 | 10;
  stats: IQuestionStats;
}

const questionSchema = new Schema<IQuestion>({
  text: {
    type: String,
    required: true
  },
  options: [{
    text: {
      type: String,
      required: true
    },
    isCorrect: {
      type: Boolean,
      required: true
    }
  }],
  difficulty: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  topic: {
    type: String,
    required: true
  },
  // grade: {
  //   type: Number,
  //   required: true,
  //   enum: [7, 8, 9, 10]
  // },
  stats: {
    timesAnswered: {
      type: Number,
      default: 0
    },
    timesCorrect: {
      type: Number,
      default: 0
    }
  }
}, { timestamps: true });

export default mongoose.model<IQuestion>('Question', questionSchema);
