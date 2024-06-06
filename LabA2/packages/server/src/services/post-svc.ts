import { Schema, Model, Document, model } from "mongoose";
import { Post } from "../models/post";

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
  },
  { collection: "user_posts" }
);

const PostModel = model<Post>("Post", PostSchema);

function index(): Promise<Post[]> {
  return PostModel.find();
}

function get(id: String): Promise<Post> {
  return PostModel.find({ id })
    .then((list) => list[0])
    .catch((err) => {
      throw `${id} Not Found`;
    });
}

function update(id: String, post: Post): Promise<Post> {
  return PostModel.findOne({ id })
    .then((found) => {
      if (!found) throw `${id} Not Found`;
      else
        return PostModel.findByIdAndUpdate(found._id, post, {
          new: true,
        });
    })
    .then((updated) => {
      if (!updated) throw `${id} not updated`;
      else return updated as Post;
    });
}

function create(post: Post): Promise<Post> {
  const p = new PostModel(post);
  return p.save();
}

export default { index, get, create, update };
