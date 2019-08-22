import React from "react";
import { Form, Input, Button, Select } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 18,
      offset: 6
    }
  }
};

function PostInputForm({ form, post, onSubmit, onCancel, processing, error }) {
  const { getFieldDecorator } = form;
  const submit = () => {
    form.validateFields((err, { title, body, shortDescription, status }) => {
      if (!err) {
        const input = {
          title: title.trim(),
          body: body.trim(),
          shortDescription: shortDescription.trim(),
          status
        };
        onSubmit(post ? { id: post.id, ...input } : input);
      }
    });
  };

  return (
    <Form {...formItemLayout}>
      <Form.Item {...tailFormItemLayout}>
        <h2>{post ? "Edit Post" : "New Post"}</h2>
      </Form.Item>

      <Form.Item label="Title">
        {getFieldDecorator("title", {
          initialValue: post ? post.title : "",
          rules: [
            {
              required: true,
              message: "Enter post title"
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Short Description">
        {getFieldDecorator("shortDescription", {
          initialValue: post ? post.shortDescription : "",
          rules: [
            {
              required: true,
              message: "Enter post description"
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Content" extra="Use Markdown syntax">
        {getFieldDecorator("body", {
          initialValue: post ? post.body : "",
          rules: [
            {
              required: true,
              message: "Enter post content"
            }
          ]
        })(<Input.TextArea rows={25} />)}
      </Form.Item>
      <Form.Item label="Status">
        {getFieldDecorator("status", {
          initialValue: post ? post.status : "draft"
        })(
          <Select>
            <Select.Option value="draft">Draft</Select.Option>
            <Select.Option value="published">Published</Select.Option>
          </Select>
        )}
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button type="primary" onClick={submit} loading={processing}>
          Submit
        </Button>
        <Button type="link" onClick={onCancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Form.create()(PostInputForm);
