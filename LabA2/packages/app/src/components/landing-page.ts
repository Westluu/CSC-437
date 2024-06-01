import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { Events } from "@calpoly/mustang";

export class LandingPageElement extends LitElement {
  @property({ type: String }) title = "Welcome to the Fishing Site!";
  @property({ type: String }) subtitle = "Your adventure starts here.";

  static styles = css`
    :host {
      display: block;
      font-family: "Arial", sans-serif;
      text-align: center;
      padding: 0;
      background-color: #f0f0f0;
      color: #333;
    }
    header {
      background-color: #007bff;
      color: white;
      padding: 40px 0;
    }
    header h1 {
      margin: 0;
      font-size: 3em;
    }
    .hero {
      background-color: #fff;
      padding: 60px 20px;
      margin: 0 auto;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-top: -20px;
      border-radius: 8px;
      max-width: 800px;
    }
    .hero h2 {
      margin-top: 0;
      font-size: 2.5em;
      color: #333;
    }
    .hero p {
      font-size: 1.2em;
      color: #555;
      margin: 20px 0;
    }
    .cta-buttons {
      margin-top: 30px;
    }
    .cta-buttons a {
      display: inline-block;
      margin: 0 10px;
      padding: 15px 30px;
      font-size: 1.2em;
      color: white;
      background-color: #007bff;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    .cta-buttons a:hover {
      background-color: #0056b3;
    }
  `;

  render() {
    return html`
      <header>
        <h1>${this.title}</h1>
      </header>
      <section class="hero">
        <h2>${this.subtitle}</h2>
        <p>
          Discover the best fishing spots, tips, and gear. Join our community
          and start your fishing adventure today!
        </p>
        <div class="cta-buttons">
            </label>
                <a href="#" @click=${this.login}> Login </a>
            </drop-down>
        </div>
      </section>
    `;
  }

  login(event: Event) {
    event.preventDefault();
    Events.relay(event, "auth:message", ["auth/signout"]);
  }
}

customElements.define("landing-page", LandingPageElement);
