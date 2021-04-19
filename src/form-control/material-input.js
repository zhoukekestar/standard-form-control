import "https://jspm.1688.com/@material/mwc-textfield";

const SYMBOL_VALUE = Symbol('value');

class MaterialTextField extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();

    this.internals = this.attachInternals();
    this.attachShadow({ mode: "open", delegatesFocus: true });

    // 初始化 material 输入框
    this.shadowRoot.innerHTML = `
      <mwc-textfield
        label="${this.getAttribute("label")}"
        name="${this.getAttribute("name")}"
      >
      </mwc-textfield>
    `;

    this.textfield = this.shadowRoot.children[0].shadowRoot;
    this.shadowRoot.addEventListener("input", this.onInput);
  }

  connectedCallback() {
    // 获取到加载完成后的 input，并做首次非空检测
    const observer = new MutationObserver(() => {
      this.onInput({ target: { value: this.getAttribute('value') }});
      observer.disconnect();
    });

    observer.observe(this.textfield, { childList: true });
  }

  onInput = (e) => {
    // 设置 value
    this[SYMBOL_VALUE] = e.target.value;
    this.internals.setFormValue(this[SYMBOL_VALUE]);

    // 校验
    const input = this.textfield.querySelector('input');
    const required = this.getAttribute("required");

    if (required !== null && !this[SYMBOL_VALUE]) {
      this.internals.setValidity({ valueMissing: true }, "必填项", input);
    } else {
      this.internals.setValidity({});
    }
    this.dispatchEvent(new CustomEvent("change", { bubbles: true }));
  };

  get value() {
    return this[SYMBOL_VALUE];
  }
  set value(v) {
    this[SYMBOL_VALUE] = v;
  }
}

customElements.define("material-input", MaterialTextField);
