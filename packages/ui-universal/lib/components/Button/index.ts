import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createComponent } from "@lit/react";
import { classMap } from "lit/directives/class-map.js";
import React from "react";
import styles from "./index.scss?inline";

export interface ButtonProps {
  /**
   * The color of the button.
   */
  color?: "primary" | "secondary" | "ghost" | "danger" | "border";
  /**
   * The size of the button.
   */
  size?: "small" | "medium" | "large";
  /**
   * The shadow of the button.
   */
  shadow?:
  | "regular"
  | "small"
  | "medium"
  | "large"
  | "extraLarge"
  | "inner"
  | "none";
  /**
   * If `true`, the button will be disabled.
   */
  disabled?: boolean;
  /**
   * disabledShadow, when the button is disabled ,the shadow is or not
   */
  disabledShadow?: boolean;
}

/**
 * @element s-button
 */
@customElement("a-button")
export class Abutton extends LitElement {
  static styles = styles;
  @property({ type: String }) color: ButtonProps["color"] = "primary";
  @property({ type: String }) size: ButtonProps["size"] = "medium";
  @property({ type: String }) shadow: ButtonProps["shadow"] = "none";
  @property({ type: Boolean }) disabled: ButtonProps["disabled"] = false;
  @property({ type: Boolean }) disabledShadow: ButtonProps["disabledShadow"] =
    true;

  protected render() {
    return html`
      <button
        part="button"
        class=${`base ${this.color} ${this.size} ${this.shadow} ${classMap({
      disabled: this.disabled as boolean,
      disabledShadow: this.disabledShadow as boolean,
    })}`}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "a-button": Abutton;
  }
}

export const Button = createComponent({
  tagName: "a-button",
  elementClass: Abutton,
  react: React,
});
