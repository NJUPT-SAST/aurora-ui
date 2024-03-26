import { createComponent } from "@lit/react";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import React from "react";
import styles from "./index.scss?inline";

export interface BadgeProps {
  /**
   * the type of the Badge
   */
  type?: "info" | "success" | "warning" | "error";
  /**
   * the size of the Badge
   */
  size?: "small" | "medium" | "large";
  /**
   * the content of the Badge
   */
  content: string;
  /**
   * is clickCopy work?
   */
  clickCopy?: boolean;
}

@customElement("a-badge")
class ABadge extends LitElement {
  static styles = styles;
  @property({ type: String }) type: BadgeProps["type"] = "info";
  @property({ type: String }) size: BadgeProps["size"] = "medium";
  @property({ type: String }) content: BadgeProps["content"] = "hello";
  @property({ type: Boolean }) clickCopy: BadgeProps["clickCopy"] = false;

  render() {
    return html`
      <div
        class="base ${classMap({
          base: true,
          [this.type as string]: true,
          [this.size as string]: true,
        })}"
        @click=${this.clickCopy ? this.handleBadge : undefined}
      >
        <span>${this.content}</span>
      </div>
    `;
  }

  handleBadge() {
    navigator.clipboard.writeText(this.content);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "a-badge": ABadge;
  }
}

export const Badge = createComponent({
  tagName: "a-badge",
  elementClass: ABadge,
  react: React,
});
