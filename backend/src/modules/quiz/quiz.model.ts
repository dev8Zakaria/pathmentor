import { Schema, model, Types } from "mongoose";

export type QuizQuestion = {
  id: string;
  skillTag: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
};

export type QuizTemplateDocument = {
  _id: string;
  careerGoalId: string;
  title: string;
  questions: QuizQuestion[];
};

export type QuizAttemptAnswer = {
  questionId: string;
  skillTag: string;
  selectedOptionIndex: number;
  isCorrect: boolean;
};

export type QuizAttemptDocument = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  careerGoalId: string;
  quizTemplateId: string;
  score: number;
  answers: QuizAttemptAnswer[];
  strengths: string[];
  weaknesses: string[];
  completedAt: Date;
};

const quizQuestionSchema = new Schema<QuizQuestion>(
  {
    id: { type: String, required: true },
    skillTag: { type: String, required: true },
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctOptionIndex: { type: Number, required: true }
  },
  { _id: false }
);

const quizTemplateSchema = new Schema<QuizTemplateDocument>(
  {
    _id: { type: String, required: true },
    careerGoalId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    questions: { type: [quizQuestionSchema], default: [] }
  },
  { timestamps: true }
);

const quizAttemptAnswerSchema = new Schema<QuizAttemptAnswer>(
  {
    questionId: String,
    skillTag: String,
    selectedOptionIndex: Number,
    isCorrect: Boolean
  },
  { _id: false }
);

const quizAttemptSchema = new Schema<QuizAttemptDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    careerGoalId: { type: String, required: true },
    quizTemplateId: { type: String, required: true },
    score: { type: Number, required: true },
    answers: { type: [quizAttemptAnswerSchema], default: [] },
    strengths: { type: [String], default: [] },
    weaknesses: { type: [String], default: [] },
    completedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const QuizTemplate = model<QuizTemplateDocument>("QuizTemplate", quizTemplateSchema);
export const QuizAttempt = model<QuizAttemptDocument>("QuizAttempt", quizAttemptSchema);
