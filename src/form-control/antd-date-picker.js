import React from 'https://jspm.1688.com/react@16';
import ReactDOM from 'https://jspm.1688.com/react-dom@16';
import { DatePicker } from 'https://jspm.1688.com/antd@4';

const SYMBOL_VALUE = Symbol('value');

class AntdDatePicker extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();

    this.internals = this.attachInternals();

    ReactDOM.render(React.createElement(DatePicker, {
      onChange: this.onChange,
      showTime: true,
    }, null), this);

  }

  onChange = e => {
    this[SYMBOL_VALUE] = e.format('YYYY-MM-DD HH:mm:ss');
    this.internals.setFormValue(this[SYMBOL_VALUE])
  }

  get value() {
    return this[SYMBOL_VALUE];
  }
  set value(v) {
    this[SYMBOL_VALUE] = v;
  }
}

customElements.define('antd-date-picker', AntdDatePicker);
