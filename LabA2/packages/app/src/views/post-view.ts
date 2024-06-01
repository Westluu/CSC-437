import { View, define } from "@calpoly/mustang";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { Msg } from "../messages";
import { Model } from "../model";
import { PostEditorElement } from "../components/post-editor.ts";

// @ts-ignore
import { Post } from "server/models";
// import { Auth } from "@calpoly/mustang";

export class PostViewElement extends View<Model, Msg> {
  static uses = define({
    "post-editor": PostEditorElement,
  });

  @property({ attribute: "post-id", reflect: true })
  postid = "";

  @property()
  get post(): Post | undefined {
    return this.model.post;
  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    article {
      background-color: #f0f0f0;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    img {
      max-width: 100%;
      height: auto;
      border-radius: 5px;
    }
    details {
      margin-top: 10px;
    }
  `;

  constructor() {
    super("fishing:model");
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.postid) {
      this.dispatchMessage(["post/select", { userid: this.postid }]);
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "post-id" && oldValue !== newValue) {
      this.dispatchMessage(["post/select", { userid: newValue }]);
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (this.model.post) {
      this.renderSlots(this.model.post);
    }
  }

  renderSlots(data: any) {
    if (!this.shadowRoot) {
      console.error("shadowRoot is not available");
      return;
    }

    for (const key in data) {
      let value = data[key];
      if (key === "image") {
        const img = this.shadowRoot.querySelector(
          `img[slot='${key}']`
        ) as HTMLImageElement;
        if (img) img.src = value;
      } else {
        const slot = this.shadowRoot.querySelector(
          `slot[name='${key}']`
        ) as HTMLSlotElement;
        if (slot) {
          slot.textContent = value;
        }
      }
    }
  }

  _handleSubmit(event: CustomEvent) {
    const post = event.detail as Post;
    this.dispatchMessage([
      "post/save",
      {
        userid: this.postid,
        post,
        onSuccess: () => console.log(`Post ${this.postid} saved successfully`),
        onFailure: (error: Error) =>
          console.error(`Failed to save post ${this.postid}:`, error),
      },
    ]);
  }

  render() {
    return html`
      <article>
        <h3><slot name="title"></slot></h3>
        <details>
          <summary>Click to View More</summary>
          <img slot="image" />
          <p class="date"><slot name="date"></slot></p>
          <p><strong>Location:</strong> <slot name="location"></slot></p>
          <p><strong>Fish Caught:</strong> <slot name="fish"></slot></p>
          <p><strong>Bait Used:</strong> <slot name="bait"></slot></p>
          <p><slot name="description"></slot></p>
        </details>
        <post-editor
          .post=${this.post}
          @post-edit:submit=${this._handleSubmit}
        ></post-editor>
      </article>
    `;
  }
}

customElements.define("post-view", PostViewElement);
