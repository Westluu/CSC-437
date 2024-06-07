import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { define, Form, History } from "@calpoly/mustang";

// @ts-ignore
import { Post } from "server/models";

export class PostEditorElement extends LitElement {
  @property({ type: Object }) post: Post | undefined;

  static styles = css`
    :host {
      display: block;
      padding: 16px;
      background: #f9f9f9;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-top: 20px;
    }
    form {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }
    label {
      display: flex;
      flex-direction: column;
      font-weight: bold;
      color: #333;
    }
    input,
    textarea,
    button {
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 100%;
    }
    textarea {
      resize: vertical;
    }
    button {
      background-color: #007bff;
      color: white;
      cursor: pointer;
      border: none;
      margin-top: 20px;
      align-self: end;
    }
    button:hover {
      background-color: #0056b3;
    }
  `;

  _handleSubmit(event: Form.SubmitEvent<Post>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const post = Object.fromEntries(formData.entries()) as Partial<Post>;
    this.dispatchEvent(
      new CustomEvent("post-edit:submit", {
        detail: post,
        bubbles: true,
        composed: true,
      })
    );
    History.dispatch(this, "history/navigate", { href: `/app/posts` });
  }

  render() {
    return html`
      <form @submit="${this._handleSubmit}">
        <label>
          Title
          <input
            type="text"
            name="title"
            .value="${this.post?.title || ""}"
            required
          />
        </label>
        <label>
          Image URL
          <input type="text" name="image" .value="${this.post?.image || ""}" />
        </label>
        <label>
          Location
          <input
            type="text"
            name="location"
            .value="${this.post?.location || ""}"
          />
        </label>
        <label>
          Fish Caught
          <input type="text" name="fish" .value="${this.post?.fish || ""}" />
        </label>
        <label>
          Bait Used
          <input type="text" name="bait" .value="${this.post?.bait || ""}" />
        </label>
        <label>
          Description
          <textarea name="description" rows="3">
${this.post?.description || ""}</textarea
          >
        </label>
        <button type="submit">Edit Post</button>
      </form>
    `;
  }
}

customElements.define("post-editor", PostEditorElement);
