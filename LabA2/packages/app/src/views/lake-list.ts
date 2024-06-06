import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

interface Lake {
  name: string;
  url: string;
}

export class LakeListElement extends LitElement {
  @property({ type: Array }) lakes: Lake[] = [
    { name: "American River", url: "../../lakes/american_river.html" },
    { name: "Grand Lake", url: "../../lakes/grand_lake.html" },
    { name: "Lake Forth", url: "../../lakes/lake_forth.html" },
    { name: "Clear Lake", url: "../../lakes/clear_lake.html" },
    { name: "Colorado River", url: "../../lakes/colorado_river.html" },
    { name: "Mississippi River", url: "../../lakes/miss_river.html" },
    { name: "Nile River", url: "../../lakes/nile_river.html" },
    { name: "Amazon River", url: "../../lakes/amazon_river.html" },
    { name: "Yangtze River", url: "../../lakes/yangtze_river.html" },
  ];

  @state() filterTerm: string = "";
  @state() selectedLakeContent: string = "";

  static styles = css`
    :host {
      display: block;
      padding: 16px;
      font-family: Arial, sans-serif;
    }

    h2 {
      font-size: 24px;
      margin-bottom: 16px;
      color: #333;
    }

    input {
      padding: 8px;
      font-size: 16px;
      width: 100%;
      max-width: 300px;
      margin-bottom: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .container {
      display: flex;
      gap: 16px;
    }

    .list {
      flex: 1;
    }

    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
    }

    li {
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      transition: box-shadow 0.3s ease;
    }

    li:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    a {
      color: #007bff;
      text-decoration: none;
      font-weight: bold;
    }

    a:hover {
      text-decoration: underline;
    }

    .details-wrapper {
      flex: 3;
      background-color: #fff;
      padding: 16px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }

    .details {
      margin-top: 10px;
    }
  `;

  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterTerm = input.value.toLowerCase();
  }

  get filteredLakes() {
    return this.lakes.filter((lake) =>
      lake.name.toLowerCase().includes(this.filterTerm)
    );
  }

  handleClick(event: MouseEvent, lake: Lake) {
    event.preventDefault();
    this.fetchLakeContent(lake.url);
  }

  fetchLakeContent(url: string) {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
        }
        return res.text();
      })
      .then((text) => {
        this.selectedLakeContent = text;
      })
      .catch((error) => {
        console.error(error);
        this.selectedLakeContent = `<p>Error loading content: ${error.message}</p>`;
      });
  }

  render() {
    return html`
      <section id="locations">
        <h2>Lakes (Click For Quick View)</h2>
        <input
          type="text"
          placeholder="Filter lakes"
          .value="${this.filterTerm}"
          @input="${this.handleInput}"
        />
        <div class="container">
          <div class="list">
            <ul>
              ${this.filteredLakes.map(
                (lake) => html`
                  <li>
                    <a
                      href="#"
                      @click="${(e: MouseEvent) => this.handleClick(e, lake)}"
                      >${lake.name}</a
                    >
                  </li>
                `
              )}
            </ul>
          </div>
          <div class="details-wrapper">
            <div class="details">${unsafeHTML(this.selectedLakeContent)}</div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("lake-list", LakeListElement);
