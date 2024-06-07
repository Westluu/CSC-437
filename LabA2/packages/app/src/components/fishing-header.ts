import { Dropdown, Events, define } from "@calpoly/mustang";
import { LitElement, css, html } from "lit";

export class FishingHeaderElement extends LitElement {
  static uses = define({
    "drop-down": Dropdown.Element,
  });
  render() {
    return html`
      <header>
        <h1>Fish Social 𓆝</h1>
        <a href="/app/posts"> Posts </a>
        <a href="/app/lakes"> Lakes </a>
        <drop-down>
          <label @change=${this.toggleDarkMode}>
            <input type="checkbox" autocomplete="off" />
            Dark mode
          </label>
          <a href="#" @click=${this.signOut}> Sign out </a>
        </drop-down>
      </header>
    `;
  }

  static styles = css`
    header {
      display: flex;
      align-items: center;
      background-color: blue;
      color: white;
      padding: 10px;
    }
    header a {
      color: white;
      text-decoration: none;
      margin: 0 10px;
    }
    drop-down {
      left: 80%;
      margin: 0 10px;
    }
    h1 {
      margin: 0;
    }
  `;

  toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
    console.log("Dark mode toggled:", body.classList.contains("dark-mode"));
  }

  signOut(event: Event) {
    event.preventDefault();
    Events.relay(event, "auth:message", ["auth/signout"]);
  }
}
