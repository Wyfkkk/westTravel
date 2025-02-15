/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2025-01-13 23:18:48
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-02-14 12:54:24
 * @FilePath: \my-project\src\components\upload.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// components/FileUpload.js
"use client";
import React from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const FileUpload = ({ onFileChange }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("http://localhost:8000/api/uploads", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("文件上传失败");
      }
      const result = await response.json();
      sendFile(result);
      // message.success(`文件上传成功: ${result.data.filename}`);
      messageApi.open({
        type: "success",
        content: "文件上传成功",
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "文件上传失败",
      });
    }

    return false; // 返回 false 以阻止默认行为
  };
  const sendFile = (res) => {
    onFileChange(res.data);
  };
  return (
    <Upload
      customRequest={({ file, onSuccess, onError }) => {
        handleUpload(file)
          .then(() => onSuccess(file))
          .catch(onError);
      }}
      showUploadList={false}
    >
      {contextHolder}
      <Button icon={<UploadOutlined />}>上传文件</Button>
    </Upload>
  );
};

export default FileUpload;
