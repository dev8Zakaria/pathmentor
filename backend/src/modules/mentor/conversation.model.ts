import { Schema, model, Types } from "mongoose";

export type ConversationMessage = {
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
};

export type ConversationDocument = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  messages: ConversationMessage[];
};

const messageSchema = new Schema<ConversationMessage>(
  {
    role: { type: String, enum: ["user", "assistant"], required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const conversationSchema = new Schema<ConversationDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, default: "Conversation mentor" },
    messages: { type: [messageSchema], default: [] }
  },
  { timestamps: true }
);

export const Conversation = model<ConversationDocument>("Conversation", conversationSchema);
