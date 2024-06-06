// post-create.ts
import { View, Form, define, Observer, Auth, History } from "@calpoly/mustang";
import { html, css } from "lit";
import { property } from "lit/decorators.js";
import { Msg } from "../messages";
import { Model } from "../model";

// @ts-ignore
import { Post } from "server/models";

export class PostCreateElement extends View<Model, Msg> {
  @property()
  username = "anonymous";

  @property({ type: Object }) post: Partial<Post> = {};

  static styles = css`
    :host {
      display: block;
      padding: 16px;
      font-family: Arial, sans-serif;
    }

    h1 {
      font-size: 24px;
      margin-bottom: 20px;
      text-align: center;
      border-bottom: 2px solid #007bff;
      padding-bottom: 10px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-width: 600px;
      margin: 0 auto;
      background: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    label {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      color: #555;
    }

    input,
    textarea {
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-top: 5px;
    }

    textarea {
      resize: vertical;
      height: 100px;
    }

    button {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      align-self: center;
    }

    button:hover {
      background-color: #0056b3;
    }
  `;

  static uses = define({
    "mu-form": Form.Element,
  });

  constructor() {
    super("fishing:model");
  }

  _authObserver = new Observer<Auth.Model>(this, "fishing:auth");

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      if (user) {
        this.username = user.username;
      }
    });
  }

  _handleSubmit(event: Event) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    let post = Object.fromEntries(formData.entries()) as Partial<Post>;

    post = {
      ...post,
      id: this.username,
      image: "../public/images/bob",
      date: "2024-05-05T00:29:00.000+00:00",
    };
    console.log("POST: ", post);
    this.dispatchMessage([
      "post/create",
      {
        post,
        onSuccess: () => {
          alert("Post created successfully!");
          History.dispatch(this, "history/navigate", { href: `/app/posts` });
        },
        onFailure: (error) => {
          console.error("Error creating post:", error);
          alert("Failed to create post.");
        },
      },
    ]);
  }

  render() {
    return html`
      <h1>Create Post</h1>
      <form @submit="${this._handleSubmit}">
        <label>
          Title
          <input
            type="text"
            name="title"
            .value="${this.post.title || ""}"
            required
          />
        </label>
        <label>
          Content
          <textarea name="content" required>
${this.post.content || ""}</textarea
          >
        </label>
        <label>
          Location
          <input
            type="text"
            name="location"
            .value="${this.post.location || ""}"
          />
        </label>
        <label>
          Fish Caught
          <input type="text" name="fish" .value="${this.post.fish || ""}" />
        </label>
        <label>
          Bait Used
          <input type="text" name="bait" .value="${this.post.bait || ""}" />
        </label>
        <label>
          Description
          <textarea name="description">${this.post.description || ""}</textarea>
        </label>
        <button type="submit">Create Post</button>
      </form>
    `;
  }
}

customElements.define("post-create", PostCreateElement);
