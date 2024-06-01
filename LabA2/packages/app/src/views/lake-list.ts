import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";

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
  ];

  @state() filterTerm: string = "";
  @state() openLake: string | null = null;

  static styles = css`
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      margin: 10px 0;
    }
    a {
      color: var(--link-color, blue);
      text-decoration: none;
      cursor: pointer;
    }
    a:hover {
      text-decoration: underline;
    }
  `;

  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.value) {
      this.filterTerm = input.value.toLowerCase();
      console.log(`Filter term updated: ${this.filterTerm}`);
    } else {
      this.filterTerm = "";
      console.error("Input element not found or value is empty");
    }
  }

  get filteredLakes() {
    const filtered = this.lakes.filter((lake) =>
      lake.name.toLowerCase().includes(this.filterTerm)
    );
    console.log(`Filtered lakes: ${JSON.stringify(filtered)}`);
    return filtered;
  }

  handleClick(event: MouseEvent, lake: Lake) {
    event.preventDefault();
    if (this.openLake === lake.name) {
      this.openLake = null; // Close the currently open lake
    } else {
      this.openLake = lake.name; // Open the clicked lake
      const container = (event.currentTarget as HTMLElement).closest("li");
      if (container) {
        this.addFragmentFrom(lake.url, container as HTMLElement);
      }
    }
  }

  addFragmentFrom(url: string, container: HTMLElement) {
    // Clear any existing content
    container.innerHTML = '';
    
    fetch(url)
      .then((res) => res.text())
      .then((text) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const fragment = Array.from(doc.body.childNodes);
        container.append(...fragment);
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
        <ul>
          ${this.filteredLakes.map(
            (lake) => html`
              <li>
                <a
                  href="#"
                  @click="${(e: MouseEvent) => this.handleClick(e, lake)}"
                  >${lake.name}</a
                >
                ${this.openLake === lake.name
                  ? html`<div class="details"></div>`
                  : ""}
              </li>
            `
          )}
        </ul>
      </section>
    `;
  }
}

customElements.define("lake-list", LakeListElement);
