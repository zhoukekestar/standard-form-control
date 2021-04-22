
# Standard Form Control

  HTML form is so powerful that may be beyond your imagination!

  在工作台场景下，很多页面本质上都是表单 + 列表（表单 + Table）的组合，而其中表单承接了工作台大部分的交互逻辑。对表单的抽象和维护，是工作台场景下的【可维护性】的重要命题。

> ℹ️ 可以调查一下工作台的内容时间占比

> ℹ️ 可以调查一下工作台的表单维护痛点

  本文重点讨论一下如何编写【高可维护性】的表单控件。在软件架构上【可维护】的重要性可参考 [聊聊工作台的可维护性](https://topic.atatech.org/articles/197320)。

  在 CBU 工作台场景中，已经从传统的 ProCode 向以搭建为中心的 LowCode/NoCode 架构演进，以此将传统的巨石应用拆分为更细粒度的页面维度，从而降低了工作台场景下的应用维护成本。

  但依托 阿里巴巴中后台搭建协议规范的 JSON Schema + Render Engine 的组合，依旧被束缚在 React 体系内，所以，我们就此落地全量的 WebComponents 方案来脱离对具体框架的依赖。但随着 Formily 的逐渐推进，发现作为【表单工具】的 Formily 已经变得越来越像【表单框架】，变得越来越难以脱离、替换。所以，再次寻求标准的表单解决方案，来脱离对【表单框架】的依赖。

# 表单设计几个原则

1. 尽可能多的原生能力，尽可能少的非规范扩展

> 任何的非规范扩展，都会成为相应的学习成本，从而演变成历史债务。仅在原生能力不满足的情况下，才进行功能的扩展。

2. 功能组件高内聚、功能单一、可扩展

> 自定义控件内，仅处理本身字段的输入、验证等，不处理联动逻辑。要求样式、逻辑高度内聚，但提供属性配置进行扩展。

3. Side Effects 尽可能抽离

> 任何非通用逻辑，应都成为 Side Effects

# 表单特性列表

  首先，先简单罗列一下表单的基础功能，对现有表单的认识，能让我们对表单有个更叫充分的了解。

## 基础特性

  通过 `<form>`, `<input>`, `<label>`, `<button>` 即能构建出一个基础的表单，并具备一些非常基础的特性，包括
  * 控制表单输入，如：字符串、数字等
  * 通过 `<input type="submit">` 或 `<button>` 提交表单
  * 默认使用 GET 请求，并通过 URL Encode 拼接至 URL Query String 上 （`application/x-www-form-urlencoded`）
    * 可使用 `method`, `enctype` 指定请求方式和加密类型
  * 按【回车键】提交表单
  * 当提交表单后，浏览器点击返回，将会回写原有的表单值，可通过 [base](https://zhoukekestar.github.io/standard-form-control/src/base.html) 进行在线尝试

## Input 类型

  参考 [MDN 类型文档](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)，最让人感到欣慰的某过于对 `date` 和 `datetime` 的支持，还有非常赞的 `color`。

  除了对默认类型的支持，其实很多的自定义组件扩展，本质上，都是对不同业务类型数据交互的扩展。

  [尝试一下](https://zhoukekestar.github.io/standard-form-control/src/types.html)
## 表单验证

  表单验证，是我们写表单的逻辑重要的一环，哪些数据可以，哪些数据不行。通过一些自带的功能特性，我们可以通过一些最简单的校验来验证数据，比如：`require`, `minlength`, `maxlength`, `max`, `min` 等等。

  在一些较为复杂的字符串 case 下，我们可以通过 `pattern` 来进行数据校验，并通过 `setCustomValidity` 来提示一些自定义的错误提示消息。

  当出现错误的时候，浏览器会自动 focus 到第一个错误的 `input` 并 pop 出相关错误内容。

  [尝试一下](https://zhoukekestar.github.io/standard-form-control/src/valid.html)


## PseudoClass

  通过 `:invalid` 和 `:valid`，我们能查询到当前表单输入框中 【合法】和 【非法】的输入框
  通过 `:disabled` 我们就能查询到被禁用的控件

  [尝试一下](https://zhoukekestar.github.io/standard-form-control/src/pseudo.html)
## 表单数据

```html
 <form
  onformdata="event.formData.append('formDataAppend', true)"
  onsubmit="event.preventDefault(); import('./formdata.js').then(d => d.onsubmit(event))"
>
  <label>
    name:
    <input name="name" />
  </label>
  <label>
    age:
    <input type="number" name="age" />
  </label>
  <input type='submit' />
</form>
```

#### 添加数据

  很多时候，并非所有数据都需要用户输入，比如：csrf_token 等。通常情况下，我们使用 `<input type="hidden" />` 进行数据的添加。

  在新的浏览器中，我们通过 `formdata` event，并在通过 formData 的 append 方法添加新的数据。

#### 获取数据

  如果我们需要获取一个表单的数据，通过 `new FormData(formElement)` 即可获取所有表单控件的输入值。


  [尝试一下](https://zhoukekestar.github.io/standard-form-control/src/formdata.html)
## Associated

  元素之间关联关系，这块属于冷知识的范畴，平时 `querySelctor` 一把梭就能搞定，但如果在框架设计的时候，这个特性就显得非常有必要。

  比如：
* 表单和文档的关联：`document.forms[0]`
* 表单和控件的关联：`form.elements`
* 控件和label 的关联：`input.labels`

  [尝试一下](https://zhoukekestar.github.io/standard-form-control/src/associated.html)


# Formily

  使用过 Formily 的同学，应该觉得 Formily 的设计非常的赞。依托阿里巴巴原有中后台复杂的表单场景，打磨了比较久的时间，
也沉淀了较多的最佳实践，通过 Formily，我们来看看现有的浏览器特性能否覆盖全它的能力。

  通过 Formily Antd 的 API 文档，梳理如下：

* Form 对应 SchemaForm
  * Formily Schema: HTML 是描述 UI 最为合适的语言，JSON 次之【checked】
  * Form Component: Custom Form Control 【TODO】
  * Column, Align: 布局信息，归属于 UI 描述范畴 【TODO】
  * initialValues: 初始化表单值，这块类似表单提交之后，点击返回的回填。【TODO】
  * effects & actions
    * 表单联动【TODO】
    * 从外部控制内部：包括 `value` 和 显隐 【TODO】
    * 从内部控制外部：包括 `value` 和 显隐 【TODO】
  * onChange、onSubmit、onRest、onValidateFailed 等 form 常规事件【checked】

* Form Control 对应 SchemaMarkupField
  * name, type : 对应 `input` 的 `name、type` 【checked】
  * title: 对应 `form control` 的 `label` 元素 【checked】
  * enum: 对应 `<select>` 和 `<option>` 【checked】
  * x-rules: 对应 `setCustomValidity` 【checked】
  * maxLength, maxItems 等常规的常用数据校验 【checked】

* Reset, Submit 等与之对应的 input type

# 表单的特性增强

  通过与 Formily 的对比，能够发现除了对 `initialValues` 和 `联动` 的能力缺失以外，其他的能力基本能够覆盖。所以，我们对 form 做一个简单的扩展，以及对联动做一些简单的处理。

## 初始值

  虽然 `initialValues` 特性和之前演示中，点击浏览器返回的数据回写类似，但在 [官方文档](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-reactions) 中说明了此特性只能被动触发。所以，我们通过扩展 `form` 元素才简单实现一下。

```html
<form is='krump-form' initial-values="import('./enhance-form.js').then(d => d.values())">
  <label>
    name:
    <input name="name" />
  </label>
  <label>
    age:
    <input type="number" name="age" />
  </label>
  <button>submit</button>
</form>
```

[尝试一下](https://zhoukekestar.github.io/standard-form-control/src/enhance-form.html)

## 联动

  从实践来看，所有的联动关系都应抽离 `form control`，并放在 `form` 的副作用中，而触发时间可自己定义，常用的有 `onchange` 和 `oninput`。所以，就有如下代码：

```html
 <form oninput="import('./effects.js').then(m => m.effects.call(this, event))">
  <label>
    name:
    <input name="name" />
  </label>
  <label>
    age:
    <input type="number" name="age" />
  </label>
  <button>submit</button>
</form>
```

[尝试一下](https://zhoukekestar.github.io/standard-form-control/src/effects.html)


## 布局

  通过 Grid 布局，常见的表单布局将变得轻而易举。布局参考：
* https://getbootstrap.com/docs/5.0/layout/grid/
* http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html

  [尝试一下](https://zhoukekestar.github.io/standard-form-control/src/layout.html)

# 自定义控件

## 添加数据

自定义 WebComponents，通过以下三步，即可为 `form` 表单添加相关数据

* 开启 `formAssociated`, 设置静态属性为 `true`
* 获取 `internals`，通过 `this.attachInternals();` 获取
* 添加、设置表单数据 `internals.setFormValue(xx)`

```html
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
```

## 检测数据

  通过 internals 对象，不仅可以设置表单数据，还可以进行数据校验。在控件的每次输入时做检测即可

```html
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
```


# Real World Example



# FAQ

* 前端与后端的接口数据交换形式通常的结构化的 JSON，而 formdata 是扁平的，该怎么办？

> 使用 formdata2json 工具库解决，我们认为 formdata 仅作为表单的数据获取方案，已经足够了，根据 **单一职责** 的原则，formdata 和 json 的数据格式转换问题，不应在表单方案的层面讨论。

# References

* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
* https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
* https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
* https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/formdata_event
* https://web.dev/more-capable-form-controls/
* https://caniuse.com/?search=formdata
* https://javascript.info/blob
* https://html.spec.whatwg.org/multipage/custom-elements.html#validitystateflags
* https://getbootstrap.com/docs/5.0/layout/grid/
* http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html

