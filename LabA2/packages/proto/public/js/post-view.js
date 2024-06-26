import { prepareTemplate } from "./template.js";
import { Auth, Observer } from "@calpoly/mustang";
import { loadJSON } from "./json-loader.js";

export class PostViewElement extends HTMLElement {
  static styles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    article {
      background-color: #f0f0f0;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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

  static template = prepareTemplate(`
    <template>
      <style>${PostViewElement.styles}</style>
      <article>
        <h3><slot name="title"></slot></h3>
        <details>
          <summary>Click to View More</summary>
          <img slot="image">
          <p class="date"><slot name="date"></slot></p>
          <p><strong>Location:</strong> <slot name="location"></slot></p>
          <p><strong>Fish Caught: </strong> <slot name="fish"></slot></p>
          <p><strong>Bait Used:</strong> <slot name="bait"></slot></p>
          <p><slot name="description"></slot></p>
        </details>
      </article>
    </template>
  `);

  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      PostViewElement.template.cloneNode(true)
    );
  }

  get src() {
    return this.getAttribute("src");
  }

  _authObserver = new Observer(this, "fishing:auth");

  get authorization() {
    console.log("Authorization for user, ", this._user);
    return (
      this._user?.authenticated && {
        Authorization: `Bearer ${this._user.token}`
      }
    );
  }

  connectedCallback() {
    this._authObserver.observe(({ user }) => {
      this._user = user;
      if (this._user?.authenticated) {
        if (this.src) {
          loadJSON(this.src, this, this.renderSlots.bind(this), this.authorization);
        }
      } else {
        console.log("User is not authenticated. Skipping data load.");
        this.shadowRoot.innerHTML = "<p>User is not authenticated. No data to display.</p>";
      }
    });
  }

  renderSlots(data) {
    if (!this.shadowRoot) {
      console.error("shadowRoot is not available");
      return;
    }

    for (const key in data) {
      let value = data[key];
      if (key === "image") {
        this.shadowRoot.querySelector(`img[slot='${key}']`).src = value;
      } else {
        const slot = this.shadowRoot.querySelector(`slot[name='${key}']`);
        if (slot) {
          slot.textContent = value;
        }
      }
    }
  }
}

customElements.define("post-view", PostViewElement);
