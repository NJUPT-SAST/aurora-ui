import { CSSResultGroup, LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createComponent } from "@lit/react";
import { classMap } from "lit/directives/class-map.js";
import React from "react";
import styles from "./index.scss?inline";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */

@customElement("s-button")
export class Sbutton extends LitElement {
  static styles = styles as unknown as CSSResultGroup;
  @property({ type: String }) color = "primary";
  @property({ type: String }) size = "medium";
  @property({ type: String }) shadow = "none";
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) disabledShadow = true;
  @property() _onclick: () => void = () => {};

  protected render() {
    return html`
      <button
        part="button"
        class=${`base ${this.color} ${this.size} ${this.shadow} ${classMap({
          disabled: this.disabled,
          disabledShadow: this.disabledShadow,
        })}`}
        @click=${this._onclick}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "s-button": Sbutton;
  }
}

export const Button = createComponent({
  tagName: "s-button",
  elementClass: Sbutton,
  react: React,
});
