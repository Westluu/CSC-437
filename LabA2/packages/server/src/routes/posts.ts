// src/routes/posts.ts
import express, { Request, Response } from "express";
import posts from "../services/post-svc";
import { Post } from "../models/post";
import { Comment } from "../models/comment";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  posts
    .index()
    .then((list: Post[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  posts
    .get(id)
    .then((post: Post) => res.status(200).json(post))
    .catch((err) => res.status(404).end(err));
});

router.post("/", (req: Request, res: Response) => {
  const newPost = req.body;
  posts
    .create(newPost)
    .then((post: Post) => res.status(201).send(post))
    .catch((err) => res.status(500).send(err));
});

router.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const newPost = req.body;
  posts
    .update(id, newPost)
    .then((post: Post) => res.json(post))
    .catch((err) => res.status(404).end(err));
});

router.post("/:id/comments", (req: Request, res: Response) => {
  const { id } = req.params;
  const newComment: Comment = req.body;
  posts
    .addComment(id, newComment)
    .then((post: Post) => res.status(201).send(post))
    .catch((err) => res.status(500).send(err));
});


//upload image to AWS S3-bucket
router.post("/image", (req: Request, res: Response) => {
  const { id, file } = req.params;
});


export default router;
