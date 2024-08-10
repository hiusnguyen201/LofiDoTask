import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

export default function LoadingScreen() {
  return (
    <Flex
      style={{
        height: "100vh",
      }}
      align="center"
      justify="center"
      gap="middle"
    >
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </Flex>
  );
}
