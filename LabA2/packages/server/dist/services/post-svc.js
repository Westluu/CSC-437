"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var post_svc_exports = {};
__export(post_svc_exports, {
  default: () => post_svc_default
});
module.exports = __toCommonJS(post_svc_exports);
var import_mongoose = require("mongoose");
const PostSchema = new import_mongoose.Schema(
  {
    id: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    image: { type: String, trim: true },
    location: { type: String, trim: true },
    date: { type: Date },
    fish: { type: String },
    bait: { type: String },
    description: { type: String }
  },
  { collection: "user_posts" }
);
const PostModel = (0, import_mongoose.model)("Post", PostSchema);
function index() {
  return PostModel.find();
}
function get(id) {
  return PostModel.find({ id }).then((list) => list[0]).catch((err) => {
    throw `${id} Not Found`;
  });
}
function update(id, post) {
  return PostModel.findOne({ id }).then((found) => {
    if (!found) throw `${id} Not Found`;
    else
      return PostModel.findByIdAndUpdate(found._id, post, {
        new: true
      });
  }).then((updated) => {
    if (!updated) throw `${id} not updated`;
    else return updated;
  });
}
function create(post) {
  const p = new PostModel(post);
  return p.save();
}
var post_svc_default = { index, get, create, update };
