// post-list.ts
import { html, css } from "lit";
import { property } from "lit/decorators.js";
import { define, View } from "@calpoly/mustang";
import { Model } from "../model";
import { Msg } from "../messages";

// @ts-ignore
import { Post } from "server/models";

export class PostListElement extends View<Model, Msg> {
  @property({ type: Array }) posts: Post[] = [];

  static styles = css`
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      position: relative;
      margin: 10px 0;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
    }
    h3 {
      margin: 0 0 10px;
      font-size: 1.5em;
      color: #333;
    }
    img {
      max-width: 100%;
      height: auto;
      border-radius: 5px;
      margin-bottom: 10px;
    }
    p {
      margin: 5px 0;
      color: #555;
    }
    .date,
    .location,
    .fish,
    .bait {
      font-size: 0.9em;
      color: #888;
    }
    .edit-button {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 5px 10px;
      cursor: pointer;
      text-decoration: none;
      display: block;
    }
    .edit-button:hover {
      background-color: #0056b3;
    }
    .create-button {
        display: inline-block;
        margin-bottom: 20px;
        padding: 10px 20px;
        background-color: #28a745;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
      }
      .create-button:hover {
        background-color: #218838;
      }
  `;

  constructor() {
    super("fishing:model");
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("Dispatching post/fetchAll message");
    this.dispatchMessage(["post/fetchAll", {}]);
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (this.model.posts) {
      this.posts = this.model.posts || [];
    }
  }

  render() {
    return html`
      <section id="posts">
        <h2>All Posts</h2>
        <a class="create-button" href="/app/post/create">Create Post</a>
        <ul>
          ${this.posts.map(
            (post) => html`
              <li>
                <a class="edit-button" href="/app/post/${post.id}">Edit</a>
                <div>
                  <h3>${post.title}</h3>
                  <img src="${post.image}" alt="${post.title}" />
                  <p class="date">
                    Date: ${new Date(post.date).toLocaleDateString()}
                  </p>
                  <p class="location">Location: ${post.location}</p>
                  <p class="fish">Fish Caught: ${post.fish}</p>
                  <p class="bait">Bait Used: ${post.bait}</p>
                  <p>${post.description}</p>
                </div>
              </li>
            `
          )}
        </ul>
      </section>
    `;
  }
}

define({
  "post-list": PostListElement,
});
