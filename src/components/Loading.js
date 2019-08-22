import React from "react";
import { Spin } from "antd";

function Loading() {
  return (
    <div style={{ textAlign: "center", paddingTop: "1rem" }}>
      <Spin size="large" />;
    </div>
  );
}

export default Loading;
