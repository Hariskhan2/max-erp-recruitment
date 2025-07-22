import React, { useState, useEffect } from 'react';
import { Form, Input, Select, DatePicker, Button, Card, message, Spin, Row, Col } from 'antd';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { useJobPosts } from '../hooks/useJobPosts';
import { JobPostFormData, EmploymentType } from '../types/jobPost';
import dayjs, { Dayjs } from 'dayjs';
import {
  BoldOutlined,
  ItalicOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  LinkOutlined,
  CodeOutlined,
} from '@ant-design/icons';

const { Option } = Select;

interface JobPostFormProps {
  onSuccess?: () => void;
}

const JobPostForm: React.FC<JobPostFormProps> = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const { addJobPost, createStatus, createError, clearCreateStatus } = useJobPosts();
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: 'Enter detailed job description, responsibilities, and requirements...',
      }),
    ],
    content: '',
  });

  useEffect(() => {
    if (createStatus === 'success') {
      message.success('Job post created successfully!');
      form.resetFields();
      editor?.commands.setContent('');
      clearCreateStatus();
      setSubmitting(false);
      onSuccess?.();
    } else if (createStatus === 'error') {
      message.error(createError || 'Failed to create job post');
      clearCreateStatus();
      setSubmitting(false);
    }
  }, [createStatus, createError, form, clearCreateStatus, editor, onSuccess]);

  const onFinish = async (values: any) => {
    setSubmitting(true);
    
    const formData: JobPostFormData = {
      title: values.title,
      department: values.department,
      employmentType: values.employmentType as EmploymentType,
      description: editor?.getHTML() || '',
      location: values.location,
      deadline: values.deadline.format('YYYY-MM-DD')
    };

    await addJobPost(formData);
  };

  const addLink = () => {
    const url = window.prompt('Enter URL');
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  };

  const disabledDate = (current: Dayjs) => {
    return current && current < dayjs().startOf('day');
  };

  return (
    <Card title="Create New Job Post" style={{ marginBottom: 24 }}>
      <Spin spinning={submitting}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                label="Job Title"
                name="title"
                rules={[
                  { required: true, message: 'Please enter job title' },
                  { min: 3, message: 'Job title must be at least 3 characters' }
                ]}
              >
                <Input placeholder="e.g., Senior Software Engineer" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                label="Department"
                name="department"
                rules={[{ required: true, message: 'Please enter department' }]}
              >
                <Input placeholder="e.g., Engineering, Marketing, Sales" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item
                label="Employment Type"
                name="employmentType"
                rules={[{ required: true, message: 'Please select employment type' }]}
              >
                <Select placeholder="Select employment type">
                  <Option value="Full-time">Full-time</Option>
                  <Option value="Part-time">Part-time</Option>
                  <Option value="Internship">Internship</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
              <Form.Item
                label="Location"
                name="location"
                rules={[{ required: true, message: 'Please enter location' }]}
              >
                <Input placeholder="e.g., New York, NY or Remote" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Item
                label="Application Deadline"
                name="deadline"
                rules={[{ required: true, message: 'Please select application deadline' }]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  disabledDate={disabledDate}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Job Description"
            rules={[
              {
                validator: () => {
                  const text = editor?.getText() || '';
                  if (text.trim().length === 0) {
                    return Promise.reject('Please enter job description');
                  }
                  if (text.trim().length < 50) {
                    return Promise.reject('Description must be at least 50 characters');
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <div className="tiptap-editor">
              <div className="tiptap-toolbar">
                <Button
                  size="small"
                  icon={<BoldOutlined />}
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  className={editor?.isActive('bold') ? 'active' : ''}
                />
                <Button
                  size="small"
                  icon={<ItalicOutlined />}
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className={editor?.isActive('italic') ? 'active' : ''}
                />
                <Button
                  size="small"
                  icon={<UnorderedListOutlined />}
                  onClick={() => editor?.chain().focus().toggleBulletList().run()}
                  className={editor?.isActive('bulletList') ? 'active' : ''}
                />
                <Button
                  size="small"
                  icon={<OrderedListOutlined />}
                  onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                  className={editor?.isActive('orderedList') ? 'active' : ''}
                />
                <Button
                  size="small"
                  icon={<LinkOutlined />}
                  onClick={addLink}
                  className={editor?.isActive('link') ? 'active' : ''}
                />
                <Button
                  size="small"
                  icon={<CodeOutlined />}
                  onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                  className={editor?.isActive('codeBlock') ? 'active' : ''}
                />
              </div>
              <EditorContent editor={editor} className="tiptap-content" />
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting} block>
              Create Job Post
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Card>
  );
};

export default JobPostForm;