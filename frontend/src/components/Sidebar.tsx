import React from 'react';
import { Menu } from 'antd';
import { TeamOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <TeamOutlined />,
      label: 'Current Job Openings',
    },
    {
      key: '/manage',
      icon: <SettingOutlined />,
      label: 'Manage Jobs',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      style={{ height: '100%', borderRight: 0 }}
      items={menuItems}
      onClick={handleMenuClick}
    />
  );
};

export default Sidebar;