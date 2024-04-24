import { prepareTemplate } from "./template.js";

export class DropdownElement extends HTMLElement {
  static template = prepareTemplate(`<template>
    <slot name="actuator"><button> Menu </button></slot>
    <div id="panel">
      <slot></slot>
    </div>
    
    <style>
      :host {
        position: relative;
      }
      #is-shown {
        display: none;
      }
      #panel {
        display: none;
        width: max-content;
        border-radius: 1px;
        background: #FFF;
        color: #000;
      }
      :host([open]) #panel {
        display: block;
      }
    </style>
  </template>`);

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      DropdownElement.template.cloneNode(true)
    );
    this.shadowRoot
      .querySelector("slot[name='actuator']")
      .addEventListener("click", () => this.toggle());
  }

  toggle() {
    if (this.hasAttribute("open")) this.removeAttribute("open");
    else this.setAttribute("open", "open");
  }
}

customElements.define("drop-down", DropdownElement);
