import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { createComponent } from "@lit/react";
import React from "react";
import styles from "./index.scss?inline";
import { classMap } from "lit/directives/class-map.js";

export interface CalendarProps {
  /**
   * the onChange of the calendar
   */
  onchange?: (value: Date) => void;
  /**
   * the selected of the date
   */
  selected?: Date;
}

@customElement("a-calendar")
export class ACalendar extends LitElement {
  static styles = styles;
  @property() onSelect?: (value: Date) => void;
  @property({ type: Object }) selected?: Date;

  @state() private selectDate: Date | undefined;
  @state() private currentDate: Date = new Date();
  @state() private selectMonth: number = new Date().getMonth();
  @state() private numberOfDaysFromPrevMonth: number = 0;
  @state() private numberOfDaysInLastMonth: number = 0;
  @state() private numberOfDaysInMonth: number = 0;
  @state() private numberOfDaysFromAfterMonth: number = 0;

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has("selected")) {
      this.selectDate = this.selected;
    }
  }

  firstUpdated() {
    this.updateCalendar();
  }

  // update number of days in month
  private updateNumberOfDaysInMonth() {
    this.numberOfDaysInMonth = new Date(
      this.currentDate.getFullYear(),
      this.selectMonth + 1,
      0
    ).getDate();
  }

  // update number of days from prev month
  private updateNumberOfDaysFromPrevMonth() {
    const firstDay = new Date(
      this.currentDate.getFullYear(),
      this.selectMonth,
      1
    ).getDay();
    this.numberOfDaysFromPrevMonth = firstDay === 0 ? 6 : firstDay - 1;
  }

  // update number of days from after month
  private updateNumberOfDaysFromAfterMonth() {
    const lastDay = new Date(
      this.currentDate.getFullYear(),
      this.selectMonth + 1,
      0
    ).getDay();
    this.numberOfDaysFromAfterMonth = lastDay === 0 ? 0 : 7 - lastDay;
  }

  // update number of days in last month
  private updateNumberOfDaysInLastMonth() {
    this.numberOfDaysInLastMonth = new Date(
      this.currentDate.getFullYear(),
      this.selectMonth,
      0
    ).getDate();
  }

  private updateCalendar() {
    this.updateNumberOfDaysInMonth();
    this.updateNumberOfDaysFromPrevMonth();
    this.updateNumberOfDaysFromAfterMonth();
    this.updateNumberOfDaysInLastMonth();
  }

  private changeMonth(isBack: boolean) {
    this.selectMonth = isBack ? this.selectMonth - 1 : this.selectMonth + 1;
    this.updateCalendar();
  }

  private generateCalendarGrid() {
    const dayItems = [];
    for (let index = 0; index < this.numberOfDaysFromPrevMonth; index++) {
      dayItems.push(
        html`<div class="calendarItem otherMonth">
          ${this.numberOfDaysInLastMonth -
          this.numberOfDaysFromPrevMonth +
          index +
          1}
        </div>`
      );
    }
    for (let index = 0; index < this.numberOfDaysInMonth; index++) {
      dayItems.push(
        html`<div
          class="calendarItem thisMonth ${classMap({
            select:
              this.selectDate?.toDateString() ===
              new Date(
                this.currentDate.getFullYear(),
                this.selectMonth,
                index + 1
              ).toDateString(),
            today:
              this.selectDate?.toDateString() !==
                new Date(
                  this.currentDate.getFullYear(),
                  this.selectMonth,
                  index + 1
                ).toDateString() &&
              new Date(
                this.currentDate.getFullYear(),
                this.selectMonth,
                index + 1
              ).toDateString() === new Date().toDateString(),
          })}"
          @click=${() => {
            this.selected = new Date(
              this.currentDate.getFullYear(),
              this.selectMonth,
              index + 1
            );
            this.onSelect && this.onSelect(this.selected);
          }}
        >
          ${index + 1}
        </div>`
      );
    }
    for (let index = 0; index < this.numberOfDaysFromAfterMonth; index++) {
      dayItems.push(
        html`<div class="calendarItem otherMonth">${index + 1}</div>`
      );
    }
    return dayItems;
  }

  render() {
    return html`
      <div class="base">
        <div class="calendarTitle">
          <div class="buttonContainer">
            <a-button
              @click=${() => this.changeMonth(true)}
              color="border"
              size="small"
              class="button"
            >
              <svg
                width="16"
                height="16"
                fill="#333333"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7265 12L12.6665 11.06L9.61317 8L12.6665 4.94L11.7265 4L7.7265 8L11.7265 12Z"
                />
                <path
                  d="M7.33344 12L8.27344 11.06L5.2201 8L8.27344 4.94L7.33344 4L3.33344 8L7.33344 12Z"
                />
              </svg>
            </a-button>
            <a-button
              @click=${() => this.changeMonth(false)}
              color="border"
              size="small"
              class="button"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="#333333"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.2735 4L3.3335 4.94L6.38683 8L3.3335 11.06L4.2735 12L8.2735 8L4.2735 4Z"
                />
                <path
                  d="M8.66656 4L7.72656 4.94L10.7799 8L7.72656 11.06L8.66656 12L12.6666 8L8.66656 4Z"
                />
              </svg>
            </a-button>
          </div>
          <span
            >${new Date(this.currentDate.getFullYear(), this.selectMonth + 1, 0)
              .toDateString()
              .split(" ")[1]},
            ${this.currentDate.getFullYear()}</span
          >
        </div>
        <div class="weekdays">
          <div class="weekday">Mo</div>
          <div class="weekday">Tu</div>
          <div class="weekday">We</div>
          <div class="weekday">Th</div>
          <div class="weekday">Fr</div>
          <div class="weekday">Sa</div>
          <div class="weekday">Su</div>
        </div>
        <div class="calendarItems">
          ${this.generateCalendarGrid().map((value) => {
            return value;
          })}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "a-calendar": ACalendar;
  }
}

export const Calendar = createComponent({
  tagName: "a-calendar",
  elementClass: ACalendar,
  react: React,
});
