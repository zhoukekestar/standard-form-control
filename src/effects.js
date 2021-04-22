
const ORIGIN_STYLE_DISPLAY_SYMBOL = Symbol('style.display');

export const hide = (form, name) => {
  const input = form.elements.namedItem(name);
  if (!input) return;

  input.style.display = "none";

  if (!input.labels) return;

  input.labels.forEach((label) => {
    label.style.display = "none";
  });
};

export const show = (form, name) => {
  const input = form.elements.namedItem(name);
  if (!input) return;

  input.style.display = "";

  if (!input.labels) return;

  input.labels.forEach((label) => {
    label.style.display = "";
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