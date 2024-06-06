// update.ts

import { Auth, Update } from "@calpoly/mustang";

// @ts-ignore
import { Post } from "server/models";
import { Msg } from "./messages";
import { Model } from "./model";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  console.log("IN UPDATE");
  switch (message[0]) {
    case "post/save":
      savePost(message[1], user)
        .then((post) => apply((model) => ({ ...model, post })))
        .then(() => {
          const { onSuccess } = message[1];
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1];
          if (onFailure) onFailure(error);
        });
      break;
    case "post/select":
      selectPost(message[1], user)
        .then((post) => apply((model) => ({ ...model, post })))
        .catch((error: Error) => console.error(error));
      break;
    case "post/fetchAll":
      fetchAllPosts(user)
        .then((posts) => apply((model) => ({ ...model, posts })))
        .then(() => {
          const { onSuccess } = message[1];
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1];
          if (onFailure) onFailure(error);
        });
      break;
    case "post/create":
      createPost(message[1], user)
        .then((post) => apply((model) => ({ ...model, post })))
        .then(() => {
          const { onSuccess } = message[1];
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1];
          if (onFailure) onFailure(error);
        });
      break;
    default:
      const unhandled: never = message[0];
      throw new Error(`Unhandled Auth message "${unhandled}"`);
  }
}

function savePost(
  msg: {
    userid: string;
    post: Post;
  },
  user: Auth.User
) {
  return fetch(`/api/posts/${msg.userid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user),
    },
    body: JSON.stringify(msg.post),
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      throw new Error(`Failed to save post for ${msg.userid}`);
    })
    .then((json: unknown) => {
      if (json) return json as Post;
      return undefined;
    });
}

function selectPost(msg: { userid: string }, user: Auth.User) {
  console.log("SELECT POST CALLED");
  const url = `/api/posts/${msg.userid}`;
  console.log("FETCHING: ", url);
  return fetch(url, {
    headers: Auth.headers(user),
  })
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Post:", json);
        return json as Post;
      }
    });
}

function fetchAllPosts(user: Auth.User) {
  console.log("FETCH ALL POSTS CALLED");
  const url = `/api/posts`;
  console.log("FETCHING: ", url);
  return fetch(url, {
    headers: Auth.headers(user),
  })
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error("Failed to fetch posts");
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Posts:", json);
        return json as Post[];
      }
      return [];
    });
}

function createPost(msg: { post: Post }, user: Auth.User) {
  return fetch(`/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user),
    },
    body: JSON.stringify(msg.post),
  })
    .then((response: Response) => {
      if (response.status === 201) return response.json();
      throw new Error("Failed to create post");
    })
    .then((json: unknown) => {
      if (json) return json as Post;
      return undefined;
    });
}
