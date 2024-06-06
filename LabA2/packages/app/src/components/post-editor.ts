import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { define, Form } from "@calpoly/mustang";

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
    }
    input,
    textarea,
    button {
      padding: 8px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      background-color: #007bff;
      color: white;
      cursor: pointer;
      border: none;
      grid-column: 1 / -1; /* Ensure the button spans across the entire width */
      margin-top: 20px;
      align-self: end;
    }
    button:hover {
      background-color: #0056b3;
    }
  `;

  _handleSubmit(event: Form.SubmitEvent<Post>) {
    const formData = new FormData(event.target as HTMLFormElement);
    const post = Object.fromEntries(formData.entries()) as Partial<Post>;
    this.dispatchEvent(
      new CustomEvent("post-edit:submit", {
        detail: post,
        bubbles: true,
        composed: true,
      })
    );
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
