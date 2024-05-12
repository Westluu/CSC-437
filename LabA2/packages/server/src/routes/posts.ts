// src/routes/profiles.ts
import express, { Request, Response } from "express";
import posts from "../services/post-svc";
import { Post } from "../models/post";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  posts
    .index()
    .then((list: Post[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;
  posts
    .get(userid)
    .then((post: Post) => res.json(post))
    .catch((err) => res.status(404).end(err));
});

router.post("/", (req: Request, res: Response) => {
  console.log("here");
  const newPost = req.body;

  posts
    .create(newPost)
    .then((post: Post) => res.status(201).send(post))
    .catch((err) => res.status(500).send(err));
});

// router.get("/:userid", (req: Request, res: Response) => {
//   const { userid } = req.params;
//   const got = profiles.get(userid);

//   if (got) res.send(got);
//   else res.status(404).end();
// });

export default router;
