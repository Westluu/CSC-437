// src/models/post.ts
import { Schema, model, Document } from "mongoose";
import CommentSchema, { Comment } from "./comment";

export interface Post {
  id: string;
  title: string;
  image: string;
  location: string;
  date: Date;
  fish: string;
  bait: string;
  description: string;
  comments: Comment[]; // Add this line
}

const PostSchema = new Schema<Post>(
  {
    id: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    image: { type: String, trim: true },
    location: { type: String, trim: true },
    date: { type: Date },
    fish: { type: String },
    bait: { type: String },
    description: { type: String },
    comments: { type: [CommentSchema], default: [] }, // Add this line
  },
  { collection: "user_posts" }
);

const PostModel = model<Post>("Post", PostSchema);

export default PostModel;
