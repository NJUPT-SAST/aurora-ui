import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./index.scss?inline";
import React from "react";
import { createComponent } from "@lit/react";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";

export interface OptionProps {
  value: string;
  label: string;
  // key: number;
}
export interface SelectProps {
  /**
   * onChange of the select
   */
  onchange?: (value: OptionProps) => void;
  /**
   * the optionList of the select
   */
  optionsList: Array<OptionProps>;
  /**
   * the title of the select
   */
  title: string;
  /**
   * diabled of the select
   */
  disabled?: boolean;
  /**
   * selectKey, the selectKey of the options
   */
  selectKey?: number;
  /**
   * isBorder,  the border of the select
   */
  isBorder?: boolean;
  /**
   * width, the width of the select
   */
  width?: number;
  /**
   * placeHolder of the select
   */
  placeHolder?: string;
}
@customElement("a-select")
class ASelect extends LitElement {
  static styles = styles;
  @property({ type: Array }) optionsList: SelectProps["optionsList"] = [];
  @property({ type: String }) title: SelectProps["title"] = "";
  @property({ type: Boolean }) disabled: SelectProps["disabled"] = false;
  @property({ type: Number }) selectKey: SelectProps["selectKey"] = -1;
  @property({ type: Boolean }) isBorder: SelectProps["isBorder"] = true;
  @property({ type: Number }) width: SelectProps["width"] = 200;
  @property({ type: String }) placeHolder: SelectProps["placeHolder"] =
    "请选择";

  @state() showOptions = false;

  private handleChange = (key: number) => {
    this.showOptions = !this.showOptions;
    this.selectKey = key;
    this.onchange &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.onchange(this.optionsList[key] as any);
  };

  private handleKeyBoardSelect = (e: KeyboardEvent) => {
    // use keyboard to control selection
    if (e.key === "Enter") {
      this.handleChange(this.selectKey as number);
    }
    if (this.showOptions) {
      if (e.key === "ArrowDown") {
        if (this.selectKey !== undefined) {
          if (this.selectKey < this.optionsList.length - 1) {
            this.selectKey++;
          } else {
            this.selectKey = 0;
          }
        } else {
          this.selectKey = 0;
        }
      }
      if (e.key === "ArrowUp") {
        if (this.selectKey !== undefined) {
          if (this.selectKey > 0) {
            this.selectKey--;
          } else {
            this.selectKey = this.optionsList.length - 1;
          }
        } else {
          this.selectKey = this.optionsList.length - 1;
        }
      }
    }
  };

  protected render() {
    return html`
      <a-input
        .label=${this.title}
        width=${this.width as number}
        ?disabled=${this.disabled as boolean}
        placeholder=${ifDefined(this.placeHolder)}
        value=${this.optionsList[this.selectKey as number]?.label}
        ?isBorder=${this.isBorder as boolean}
        @focus=${() => {
          this.showOptions = true;
        }}
        @blur=${() => {
          setTimeout(() => {
            this.showOptions = false;
          }, 200);
        }}
        @keydown=${this.handleKeyBoardSelect}
        id="select"
      ></a-input>
      <div
        class="options ${classMap({
          show: this.showOptions,
        })}"
      >
        ${this.optionsList.map(
          (item: OptionProps, index: number) => html`
            <div
              class="option-item ${classMap({
                "option-item-selected": this.selectKey === index,
              })}"
              @click=${this.handleChange.bind(this, index)}
            >
              <span class="option-item-span">${item.label}</span>
            </div>
          `
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "a-select": ASelect;
  }
}

export const Select = createComponent({
  tagName: "a-select",
  elementClass: ASelect,
  react: React,
});
