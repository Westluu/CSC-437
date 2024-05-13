// src/index.ts
import express, { Request, Response } from "express";
import posts from "./routes/posts";
import { connect } from "./services/mongo";
import auth, { authenticateUser } from "./routes/auth";

const cors = require("cors");

connect("cluster0");
const app = express();
app.use(cors());

const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.json());
app.use("/auth", auth);
// app.use("/api/posts", posts);
app.use("/api/posts", authenticateUser, posts);

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
