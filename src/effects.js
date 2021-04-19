
const ORIGIN_STYLE_DISPLAY_SYMBOL = Symbol('style.display');

export const hide = (form, name) => {
  const input = form.elements.namedItem(name);
  if (!input) return;

  // 保存元素原有的 display 属性
  input[ORIGIN_STYLE_DISPLAY_SYMBOL] = input.style.display || "";
  input.style.display = "none";

  if (!input.labels) return;

  input.labels.forEach((label) => {
    label[ORIGIN_STYLE_DISPLAY_SYMBOL] = label.style.display || "";
    label.style.display = "none";
  });
};

export const show = (form, name) => {
  const input = form.elements.namedItem(name);
  if (!input) return;

  input.style.display = input[ORIGIN_STYLE_DISPLAY_SYMBOL] || "";

  if (!input.labels) return;

  input.labels.forEach((label) => {
    label.style.display = label[ORIGIN_STYLE_DISPLAY_SYMBOL] || "";
  });
};

export const disable = (form, name) => {
  const input = form.elements.namedItem(name);
  if (!input) return;

  input.setAttribute('disabled', true);
};

export const enable = (form, name) => {
  const input = form.elements.namedItem(name);
  if (!input) return;

  input.removeAttribute('disabled');
};

export const hideAndDisable = (form, name) => {
  hide(form, name);
  disable(form, name);
}

export const showAndEnable = (form, name) => {
  show(form, name);
  enable(form, name);
}

export const effects = function(e) {
  const data = Object.fromEntries(new FormData(this));
  if (data.name === 'a') {
    showAndEnable(this, 'age');
    this.elements.namedItem('age').value = 1;
  } else if (data.name === 'aa') {
    showAndEnable(this, 'age');
    this.elements.namedItem('age').value = 2;
  } else {
    hideAndDisable(this, 'age');
  }
}