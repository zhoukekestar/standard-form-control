
class KrumpForm extends HTMLFormElement {
  constructor() {
    super();
    this.initialValues();
  }

  initialValues = () => {
    const valScript = this.getAttribute('initial-values');
    if (!valScript) return;

    // 执行初始值的脚本，并将相关的内容做赋值
    Promise.resolve(window.eval(valScript)).then(values => {
       Object.keys(values).forEach(key => {
        const input = this.elements.namedItem(key);
        if (!input) return;
        input.value = values[key];
        input.setAttribute('value', values[key]);
      });
    });
  }
}

if (!customElements.get('krump-form')) {
  customElements.define('krump-form', KrumpForm, {extends: 'form'});
}

export const values = () => new Promise((resolve, reject) => {
  resolve({
    name: 'initial-name',
    age: '4',
  })
})


