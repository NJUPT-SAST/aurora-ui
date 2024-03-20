import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./index.scss?inline";

export interface AccordionProps {
  /**
   * the width of the Accordion
   */
  width?: number;
  /**
   * If `true`, the Accordion will be disabled.
   */
  disabled?: boolean;
  /**
   * the AccordionTrigger of the Accordion
   */
  accordionTrigger: HTMLElement;
  /**
   * the accordionContent of the Accordion
   */
  accordionContent: HTMLElement;
}

@customElement("s-accordion")
export class SAccordion extends LitElement {
  static styles = styles;
  @property({ type: Number }) width: AccordionProps["width"] = 200;
  @property({ type: Boolean }) disabled: AccordionProps["disabled"] = false;
  @state() visible: boolean = false;

  render() {
    return html` <div></div> `;
  }
}
