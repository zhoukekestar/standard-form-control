
```js
import React from 'react';
import ReactDOM from 'react-dom';
import { SchemaForm, FormButtonGroup, Submit } from '@formily/antd';


ReactDOM.render(
  <SchemaForm schema={{
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "title": "name",
        "name": "name",
        "x-component": "Input"
      },
      "age": {
        "type": "number",
        "title": "age",
        "name": "age",
        "x-component": "Number"
      }
    }
  }}>
    <FormButtonGroup>
      <Submit>查询</Submit>
    </FormButtonGroup>
  </SchemaForm>, document.body);
```

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Button } from 'antd';

const Demo = () => {
  return (
    <Form>
      <Form.Item label='name' name='name'>
        <Input />
      </Form.Item>
      <Form.Item label='age' name='age'>
        <Input.Number />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

ReactDOM.render(<Demo />, document.body);

```


```vue
<template>
  <a-form :form="form">
    <a-form-item label="name">
      <a-input/>
    </a-form-item>
    <a-form-item label="age">
      <a-input-number>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">
        Submit
      </a-button>
    </a-form-item>
  </a-form>
</template>
```