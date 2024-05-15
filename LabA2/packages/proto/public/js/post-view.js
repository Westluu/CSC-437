import { prepareTemplate } from "./template.js";
import { Auth, Observer } from "@calpoly/mustang";

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
    _authObserver = new Observer(this, "cluster0:auth");

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
        console.log("USER: ", user);
        if (this.src) {
          this.loadJSON(this.src, this.authorization);
        }
      });
    }
  
    loadJSON(src, authorization) {
      const a = {headers: authorization};
      console.log("A: ", a);

      fetch(src, {headers: this.authorization})
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          console.log("Response: ", response);
          return response.json();
        })
        .then(data => this.renderSlots(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  
    renderSlots(data) {
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