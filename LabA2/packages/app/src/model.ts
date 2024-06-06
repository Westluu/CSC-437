// @ts-ignore
import { Post } from "server/models";

export interface Model {
  post?: Post;
  posts?: Post[];
}

export const init: Model = {};
