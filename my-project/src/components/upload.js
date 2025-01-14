// components/FileUpload.js
'use client'
import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const FileUpload = () => {
    const [messageApi, contextHolder] = message.useMessage();    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await fetch('http://localhost:8000/api/uploads', {
                method: 'POST',
                body: formData,
            });
            
            if (!response.ok) {
                throw new Error('文件上传失败');
            }
            const result = await response.json();
            console.log(result, 'data')
            // message.success(`文件上传成功: ${result.data.filename}`);
            messageApi.open({
                type: 'success',
                content: '文件上传成功',
              });
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: '文件上传失败',
              });
        }

        return false; // 返回 false 以阻止默认行为
    };

    return (
        <Upload
            customRequest={({ file, onSuccess, onError }) => {
                handleUpload(file)
                    .then(() => onSuccess(file))
                    .catch(onError);
            }}
            showUploadList={false}
        >{contextHolder}
            <Button icon={<UploadOutlined />}>上传文件</Button>
        </Upload>
    );
};

export default FileUpload;