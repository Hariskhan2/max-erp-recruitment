import React, { useEffect } from 'react';
import { Card, List, Tag, Typography, Empty, Spin, Alert, Row, Col } from 'antd';
import { CalendarOutlined, EnvironmentOutlined, TeamOutlined } from '@ant-design/icons';
import { useJobPosts } from '../hooks/useJobPosts';
import { JobPost } from '../types/jobPost';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const JobPostsList: React.FC = () => {
  const { posts, loading, error, loadJobPosts } = useJobPosts();

  useEffect(() => {
    loadJobPosts();
  }, []);

  const getEmploymentTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time':
        return 'green';
      case 'Part-time':
        return 'blue';
      case 'Internship':
        return 'orange';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Card>
        <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />
      </Card>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        style={{ marginBottom: 24 }}
      />
    );
  }

  if (posts.length === 0) {
    return (
      <Card>
        <Empty description="No job posts available yet" />
      </Card>
    );
  }

  return (
    <Card title="Current Job Openings">
      <List
        itemLayout="vertical"
        size="large"
        dataSource={posts}
        renderItem={(item: JobPost) => (
          <List.Item
            key={item.id}
            style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: 24 }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <Title level={4} style={{ marginBottom: 8 }}>{item.title}</Title>
                <div style={{ marginBottom: 12 }}>
                  <Tag
                    color={getEmploymentTypeColor(item.employmentType)}
                    style={{ marginRight: 8 }}
                  >
                    {item.employmentType}
                  </Tag>
                  <Text type="secondary">
                    <TeamOutlined /> {item.department}
                  </Text>
                  <Text type="secondary" style={{ marginLeft: 16 }}>
                    <EnvironmentOutlined /> {item.location}
                  </Text>
                </div>
              </Col>
              <Col xs={24}>
                <div 
                  dangerouslySetInnerHTML={{ __html: item.description }}
                  style={{ 
                    lineHeight: 1.6,
                    color: 'rgba(0, 0, 0, 0.65)'
                  }}
                />
              </Col>
              <Col xs={24}>
                <div style={{ marginTop: 8 }}>
                  <Text type="secondary" style={{ marginRight: 16 }}>
                    <CalendarOutlined /> Deadline: {dayjs(item.deadline).format('MMM DD, YYYY')}
                  </Text>
                  <Text type="secondary">
                    Posted: {dayjs(item.createdAt).format('MMM DD, YYYY')}
                  </Text>
                </div>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default JobPostsList;