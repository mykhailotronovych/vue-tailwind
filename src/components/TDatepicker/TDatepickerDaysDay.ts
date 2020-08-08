import Vue, { CreateElement, VNode } from 'vue';

const TDatepickerDaysDay = Vue.extend({
  name: 'TDatepickerDaysDay',

  props: {
    day: {
      type: Date,
      required: true,
    },
    locale: {
      type: String,
      required: true,
    },
    value: {
      type: Date,
      required: true,
    },
    getElementCssClass: {
      type: Function,
      required: true,
    },
    dateFormatter: {
      type: Function,
      required: true,
    },
  },

  computed: {
    isSelected(): boolean {
      const d1 = new Date(this.value);
      const d2 = new Date(this.day);
      return d1.getFullYear() === d2.getFullYear()
        && d1.getMonth() === d2.getMonth()
        && d1.getDate() === d2.getDate();
    },
    // @TODO
    isDisabled(): boolean {
      const d = new Date(this.day);
      return d.getDate() === 10;
    },
    isForAnotherMonth(): boolean {
      const d1 = new Date(this.value);
      const d2 = new Date(this.day);
      return d1.getFullYear() !== d2.getFullYear()
        || d1.getMonth() !== d2.getMonth();
    },
  },

  methods: {
    getClass() {
      if (this.isDisabled) {
        return this.getElementCssClass('disabledDay');
      }

      if (this.isSelected) {
        return this.getElementCssClass('selectedDay');
      }

      if (this.isForAnotherMonth) {
        return this.getElementCssClass('otherMonthDay');
      }

      return this.getElementCssClass('day');
    },
    getDay(): string {
      return this.dateFormatter(this.day, 'j');
    },
  },

  render(createElement: CreateElement): VNode {
    return createElement(
      'button',
      {
        class: this.getClass(),
        on: {
          click: (e: MouseEvent) => this.$emit('click', e),
        },
      },
      this.getDay(),
    );
  },
});

export default TDatepickerDaysDay;
