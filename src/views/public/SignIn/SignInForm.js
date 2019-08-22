import React from "react";
import { Form, Input, Button } from "antd";

import { testEmail, testPassword } from "../../../dummy-data";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

function SignIn({ form, onSubmit, processing, error }) {
  const { getFieldDecorator } = form;
  const submit = () => {
    form.validateFields((err, { email, password }) => {
      if (!err) {
        onSubmit(email.trim(), password.trim());
      }
    });
  };

  return (
    <Form {...formItemLayout}>
      <Form.Item {...tailFormItemLayout}>
        <h2>Sign In</h2>
      </Form.Item>

      <Form.Item label="Email">
        {getFieldDecorator("email", {
          initialValue: testEmail,
          rules: [
            {
              type: "email",
              message: "Invalid email"
            },
            {
              required: true,
              message: "Enter your email"
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Password">
        {getFieldDecorator("password", {
          initialValue: testPassword,
          rules: [
            {
              required: true,
              message: "Enter your password"
            }
          ]
        })(<Input.Password />)}
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button type="primary" onClick={submit} loading={processing}>
          Sign In
        </Button>
        <p>
          Test account: {testEmail}/{testPassword}
        </p>
      </Form.Item>
    </Form>
  );
}

export default Form.create()(SignIn);
