import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./index.scss?inline";
import { ifDefined } from "lit/directives/if-defined.js";
import { createComponent } from "@lit/react";
import React from "react";
import { classMap } from "lit/directives/class-map.js";

export interface InputProps {
  /**
   * The width of the Input.
   */
  width: number;
  /**
   * If `true`, the input will be disabled.
   */
  disabled: boolean;
  /**
   * label,the label of the input
   */
  label: string;
  /**
   * The type of the mode.
   */
  mode: "text" | "password";
  /**
   * placeholder,the placeholder of the input
   */
  placeholder?: string;
  /**
   * placeholder,the placeholder of the input
   */
  fontsize: number;
  /**
   * isFillFather, is ture the input fill the father
   */
  isFillFather: boolean;
  /**
   * value ,the value of the input
   */
  value: string;
  /**
   * defaultValue, the defaultValue of the input
   */
  defaultValue?: string;
  /**
   * isBorder? have the border of the input
   */
  isBorder: boolean;
}

@customElement("s-input")
export class SInput extends LitElement {
  static styles = styles;
  @property({ type: Number }) width: InputProps["width"] = 250;
  @property({ type: Boolean }) disabled: InputProps["disabled"] = false;
  @property({ type: String }) label: InputProps["label"] = "输入框";
  @property({ type: String }) mode: InputProps["mode"] = "text";
  @property({ type: String }) placeholder: InputProps["placeholder"];
  @property({ type: Number }) fontsize: InputProps["fontsize"] = 16;
  @property({ type: Boolean }) isFillFather: InputProps["isFillFather"] = false;
  @property({ type: String }) value: InputProps["value"] = "";
  @property({ type: String }) defaultValue: InputProps["defaultValue"];
  @property({ type: Boolean }) isBorder: InputProps["isBorder"] = true;

  @state() isFocus = false;

  handleInput(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
  }

  handleFocus() {
    this.isFocus = true;
  }

  handleBlur() {
    this.isFocus = false;
  }

  protected render() {
    return html`
      <div
        class="base ${classMap({
      disabled: this.disabled,
      fill: this.isFillFather,
      border: this.isBorder,
    })}"
        style="width:${this.width}px;--input-font-size:${this.fontsize}px;"
      >
        ${this.label
        ? html`<label htmlFor="input" class="inputLabel ${classMap({ isUpInputLabel: !!(this.value || this.placeholder || this.isFocus) })}">${this.label}</label>`
        : ""}
        <input
          id="input"
          class="input"
          type="${ifDefined(this.mode)}"
          placeholder=${ifDefined(this.placeholder)}
          .value="${this.value}"
          .disabled="${this.disabled}"
          @input="${this.handleInput}"
          @focus="${this.handleFocus}"
          @blur="${this.handleBlur}"
        />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "s-input": SInput;
  }
}

export const Input = createComponent({
  tagName: "s-input",
  elementClass: SInput,
  react: React,
  events: {
    onchange: "onChange",
    focus: "onFocus",
    blur: "onBlur",
  }
});

