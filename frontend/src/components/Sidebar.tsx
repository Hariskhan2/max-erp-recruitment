import React from 'react';
import { Menu } from 'antd';
import { TeamOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  collapsed?: boolean;
  onNavigate?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <TeamOutlined />,
      label: collapsed ? undefined : 'Current Job Openings',
      title: 'Current Job Openings',
    },
    {
      key: '/manage',
      icon: <SettingOutlined />,
      label: collapsed ? undefined : 'Manage Jobs',
      title: 'Manage Jobs',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
    onNavigate?.(); // Call callback for mobile drawer close
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      style={{ height: '100%', borderRight: 0 }}
      items={menuItems}
      onClick={handleMenuClick}
      inlineCollapsed={collapsed}
    />
  );
};

export default Sidebar;