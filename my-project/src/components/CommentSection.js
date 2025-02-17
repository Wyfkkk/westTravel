/*
 * @Author: Wyfkkk 2224081986@qq.com
 * @Date: 2025-02-17 00:48:50
 * @LastEditors: Wyfkkk 2224081986@qq.com
 * @LastEditTime: 2025-02-18 01:29:55
 * @FilePath: \my-project\src\components\CommentSection.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client'
import { useState } from 'react';
import { List, Avatar, Form, Button, Input, Card, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
const { TextArea } = Input;

const CommentList = ({ comments, onReply }) => (
  <List
    dataSource={comments}
    itemLayout="horizontal"
    renderItem={(comment, index) => (
      <Card style={{ marginBottom: 16 }}>
        <List.Item
          actions={[
            <Button type="link" key="reply" onClick={() => onReply(index)}>
              回复
            </Button>
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar icon={<UserOutlined />} />}
            title={comment.author}
            description={
              <>
                <div>{comment.content}</div>
                <div style={{ color: '#999', fontSize: '12px' }}>{comment.datetime}</div>
              </>
            }
          />
        </List.Item>
        {comment.replies && comment.replies.length > 0 && (
          <List
            style={{ marginLeft: 32, marginTop: 16 }}
            dataSource={comment.replies}
            itemLayout="horizontal"
            renderItem={(reply) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={reply.author}
                  description={
                    <>
                      <div>{reply.content}</div>
                      <div style={{ color: '#999', fontSize: '12px' }}>{reply.datetime}</div>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </Card>
    )}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value, replyTo, onCancelReply }) => (
  <>
    <Form.Item>
      <TextArea 
        rows={4} 
        onChange={onChange} 
        value={value} 
        placeholder={replyTo !== null ? "回复评论..." : "写下你的评论..."} 
      />
    </Form.Item>
    <Form.Item>
      <Button 
        htmlType="submit" 
        loading={submitting} 
        onClick={onSubmit} 
        type="primary"
        style={{ marginRight: 8 }}
      >
        {replyTo !== null ? '回复' : '发表评论'}
      </Button>
      {replyTo !== null && (
        <Button onClick={onCancelReply}>
          取消回复
        </Button>
      )}
    </Form.Item>
  </>
);

const CommentSection = () => {
  const userInfo = useSelector((state) => state.userInfo.value);
  const [messageApi, contextHolder] = message.useMessage();
  const [comments, setComments] = useState([
    {
      author: '用户1',
      content: '这是一条评论',
      datetime: '2024-02-17 12:00:00',
      replies: [
        {
          author: '用户2',
          content: '这是一条回复',
          datetime: '2024-02-17 12:30:00',
        }
      ]
    }
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const [replyTo, setReplyTo] = useState(null);

  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);

    if (replyTo !== null) {
      // 添加回复
      const updatedComments = [...comments];
      updatedComments[replyTo].replies = [
        ...(updatedComments[replyTo].replies || []),
        {
          author: userInfo.username,
          content: value,
          datetime: new Date().toLocaleString(),
        }
      ];
      setComments(updatedComments);
      messageApi.success('回复成功');
      setReplyTo(null);
    } else {
      // 添加新评论
      const newComment = {
        author: userInfo.username,
        content: value,
        datetime: new Date().toLocaleString(),
        replies: []
      };
      setComments([...comments, newComment]);
      messageApi.success('评论成功');
    }

    setSubmitting(false);
    setValue('');
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleReply = (index) => {
    setReplyTo(index);
  };

  const handleCancelReply = () => {
    setReplyTo(null);
    setValue('');
  };

  return (
    <div className="comment-section">
      {contextHolder}
      <Card style={{ marginBottom: 16 }}>
        <Editor
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitting={submitting}
          value={value}
          replyTo={replyTo}
          onCancelReply={handleCancelReply}
        />
      </Card>
      <CommentList 
        comments={comments} 
        onReply={handleReply}
      />
    </div>
  );
};

export default CommentSection;