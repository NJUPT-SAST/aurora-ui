import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./index.scss?inline";
import { createComponent } from "@lit/react";
import React from "react";
import { classMap } from "lit/directives/class-map.js";

export interface CardProps {
  /**
   * the image of the card
   */
  titleImageUrl?: string;
  /**
   * The theme of the Card.
   */
  theme?: "dark" | "light";
  /**
   * The size of the Card.
   */
  size?: "small" | "medium" | "large";
  /**
   * The shadow of the Card.
   */
  shadow?: "regular" | "small" | "medium" | "large" | "extraLarge" | "inner";
  /**
   * padding, the padding of the card
   */
  padding?: number;
  /**
   * gap , the gap between the content and the header
   */
  gap?: number;
  /**
   * width , the width of the card
   */
  width?: number;
}

@customElement("a-card")
class ACard extends LitElement {
  static styles = styles;
  @property({ type: String }) titleImageUrl: CardProps["titleImageUrl"];
  @property({ type: String }) theme: CardProps["theme"] = "light";
  @property({ type: String }) size: CardProps["size"] = "medium";
  @property({ type: String }) shadow: CardProps["shadow"] = "regular";
  @property({ type: Number }) padding: CardProps["padding"] = 16;
  @property({ type: Number }) gap: CardProps["gap"] = 8;
  @property({ type: Number }) width: CardProps["width"] = 300;

  protected render() {
    return html`
      <div
        class="base ${classMap({
          [this.theme as string]: true,
          [this.size as string]: true,
          [`shadow-${this.shadow}` as string]: this.shadow !== undefined,
        })}"
        style="width: ${this.width}px;"
      >
        ${this.titleImageUrl &&
        html`<div class="titleImage"><img src="${this.titleImageUrl}" /></div>`}
        <div class="contentContainer" style="padding: ${this.padding}px;">
          <div class="mainContent" style="gap: ${this.gap}px;">
            <slot name="header"></slot>
            <slot name="content"></slot>
          </div>
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "a-card": ACard;
  }
}

export const Card = createComponent({
  tagName: "a-card",
  elementClass: ACard,
  react: React,
});
