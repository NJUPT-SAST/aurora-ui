import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./index.scss";
import { ifDefined } from "lit/directives/if-defined.js";

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
  @property({ type: Boolean }) isBorder: InputProps["isBorder"] = false;

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
        class="input-container"
        style="width:${this.width}px;--input-font-size:${this.fontsize}px;"
      >
        ${this.label
          ? html`<label class="input-label">${this.label}</label>`
          : ""}
        <input
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
