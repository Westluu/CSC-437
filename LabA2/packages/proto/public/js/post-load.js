const articleHTML = `
  <article>
    <h3>John's Memorable Catch at Grand Lake</h3>
    <details>
      <summary>Click to View More</summary>
      <img src="./images/bob.jpg" alt="John holding a large bass at Grand Lake" width="300"/>
      <p class="date">April 14, 2024 6:00PM</p>
      <p><strong>Location:</strong> <a href="./grand_lake.html">Grand Lake</a></p>
      <p><strong>Fish Caught:</strong> <a href="./fishes/bass.html">Bass</a></p>
      <p><strong>Bait Used:</strong> <a href="./baits/minnow.html">Minnows</a></p>
      <p>What an amazing spot here at Grand Lake, caught so many bass here!</p>
    </details>
  </article>
`;

export class MemorableCatchElement extends HTMLElement {
    static template = prepareTemplate(articleHTML); 

    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).appendChild(
            MemorableCatchElement.template.cloneNode(true)
        );
    }
}

customElements.define("memorable-catch", MemorableCatchElement);
