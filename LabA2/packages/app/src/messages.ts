// messages.ts

// @ts-ignore
import { Post } from "server/models";

export type Msg =
  | ["post/save", { userid: string; post: Post; onSuccess?: () => void; onFailure?: (err: Error) => void; }]
  | ["post/fetchAll", { onSuccess?: () => void; onFailure?: (err: Error) => void; }]
  | ["post/select", { userid: string }]
  | ["post/create", { post: Post; onSuccess?: () => void; onFailure?: (err: Error) => void; }];

