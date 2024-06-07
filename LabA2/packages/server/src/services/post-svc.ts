// src/services/post-svc.ts
import PostModel, { Post } from "../models/post";
import { Comment } from "../models/comment";

function index(): Promise<Post[]> {
  return PostModel.find().exec();
}

function get(id: string): Promise<Post> {
  return PostModel.findOne({ id }).exec()
    .then((post) => {
      if (!post) throw `${id} Not Found`;
      return post;
    });
}

function update(id: string, post: Post): Promise<Post> {
  return PostModel.findOneAndUpdate({ id }, post, { new: true }).exec()
    .then((updated) => {
      if (!updated) throw `${id} not updated`;
      return updated;
    });
}

function create(post: Post): Promise<Post> {
  const p = new PostModel(post);
  return p.save();
}

function addComment(postId: string, comment: Comment): Promise<Post> {
  return PostModel.findOneAndUpdate(
    { id: postId },
    { $push: { comments: comment } },
    { new: true }
  ).exec()
    .then((updated) => {
      if (!updated) throw `${postId} not updated`;
      return updated;
    });
}

export default { index, get, create, update, addComment };
