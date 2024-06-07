// src/models/comment.ts
import { Schema, model } from "mongoose";

export interface Comment {
  user: string;
  content: string;
  date: Date;
}

const CommentSchema = new Schema<Comment>({
  user: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  date: { type: Date, default: Date.now },
});

export default CommentSchema;