import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Space, Modal, Form, Input, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import JobPostForm from '../components/JobPostForm';
import JobPostEditForm from '../components/JobPostEditForm';
import { useJobPosts } from '../hooks/useJobPosts';
import { JobPost } from '../types/jobPost';
import dayjs from 'dayjs';

const ManageJobs: React.FC = () => {
  const { posts, loading, loadJobPosts, deletePost } = useJobPosts();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPost, setEditingPost] = useState<JobPost | null>(null);

  useEffect(() => {
    loadJobPosts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id);
      message.success('Job post deleted successfully');
      loadJobPosts();
    } catch (error) {
      message.error('Failed to delete job post');
    }
  };

  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'title',
      key: 'title',
      width: '25%',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      width: '15%',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      width: '15%',
    },
    {
      title: 'Type',
      dataIndex: 'employmentType',
      key: 'employmentType',
      width: '15%',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      width: '15%',
      render: (deadline: string) => dayjs(deadline).format('MMM DD, YYYY'),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '15%',
      render: (_: any, record: JobPost) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => setEditingPost(record)}
          />
          <Popconfirm
            title="Delete this job post?"
            description="Are you sure you want to delete this job post?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card
        title="Manage Job Posts"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setShowCreateModal(true)}
          >
            Create New Job
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={posts}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Total ${total} job posts`,
          }}
        />
      </Card>

      <Modal
        title="Create New Job Post"
        open={showCreateModal}
        onCancel={() => setShowCreateModal(false)}
        footer={null}
        width={800}
        destroyOnClose
      >
        <JobPostForm onSuccess={() => {
          setShowCreateModal(false);
          loadJobPosts();
        }} />
      </Modal>

      <Modal
        title="Edit Job Post"
        open={!!editingPost}
        onCancel={() => setEditingPost(null)}
        footer={null}
        width={800}
        destroyOnClose
      >
        {editingPost && (
          <JobPostEditForm
            jobPost={editingPost}
            onSuccess={() => {
              setEditingPost(null);
              loadJobPosts();
              message.success('Job post updated successfully');
            }}
            onCancel={() => setEditingPost(null)}
          />
        )}
      </Modal>
    </div>
  );
};

export default ManageJobs;