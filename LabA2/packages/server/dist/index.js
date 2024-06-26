"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_express = __toESM(require("express"));
var import_posts = __toESM(require("./routes/posts"));
var import_path = __toESM(require("path"));
var import_mongo = require("./services/mongo");
var import_auth = __toESM(require("./routes/auth"));
var import_aws_sdk = __toESM(require("aws-sdk"));
var import_uuid = require("uuid");
const cors = require("cors");
(0, import_mongo.connect)("cluster0");
const app = (0, import_express.default)();
app.use(cors());
const port = process.env.PORT || 3e3;
const staticDir = process.env.STATIC || import_path.default.resolve(__dirname, "../public");
app.use(import_express.default.static(staticDir));
app.use(import_express.default.json());
app.use("/auth", import_auth.default);
const nodeModules = import_path.default.resolve(__dirname, "../../../node_modules");
console.log("Serving NPM packages from", nodeModules);
app.use("/node_modules", import_express.default.static(nodeModules));
app.use("/app", (req, res) => {
  const indexHtml = import_path.default.resolve(staticDir, "index.html");
  res.sendFile(indexHtml);
});
const s3 = new import_aws_sdk.default.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});
app.post("/api/s3/presigned-url", (req, res) => {
  const { filename, filetype } = req.body;
  const key = `uploads/${(0, import_uuid.v4)()}-${filename}`;
  s3.getSignedUrl(
    "putObject",
    {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Expires: 60,
      ContentType: filetype
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
app.use("/api/posts", import_posts.default);
app.get("/hello", (req, res) => {
  res.send("Hello, World");
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
