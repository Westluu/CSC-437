import express, { Request, Response } from "express";
import posts from "./routes/posts";
import path from "path";
import { connect } from "./services/mongo";
import auth from "./routes/auth";
import aws from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const cors = require("cors");

connect("cluster0");
const app = express();
app.use(cors());

const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || path.resolve(__dirname, "../public");

app.use(express.static(staticDir));
app.use(express.json());

app.use("/auth", auth);

const nodeModules = path.resolve(__dirname, "../../../node_modules");
console.log("Serving NPM packages from", nodeModules);
app.use("/node_modules", express.static(nodeModules));

// SPA Routes: /app/...
app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  res.sendFile(indexHtml);
});

// S3 configuration
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Endpoint to get pre-signed URL for S3
app.post("/api/s3/presigned-url", (req: Request, res: Response) => {
  const { filename, filetype } = req.body;
  const key = `uploads/${uuidv4()}-${filename}`;

  s3.getSignedUrl(
    "putObject",
    {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Expires: 60,
      ContentType: filetype,
    },
    (err, url) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.json({ url, key });
    }
  );
});

app.use("/api/posts", posts);

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
