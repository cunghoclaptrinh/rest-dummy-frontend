import React from "react";
import { Alert } from "antd";

function ErrorMessage({ message }) {
  return <Alert type="error" showIcon message="Error" description={message} />;
}

export default ErrorMessage;
