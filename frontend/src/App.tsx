import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, Typography, Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { store } from './store';
import Sidebar from './components/Sidebar';
import CurrentJobOpenings from './pages/CurrentJobOpenings';
import ManageJobs from './pages/ManageJobs';
import './App.css';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);

  return (
    <Provider store={store}>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Header className="app-header">
            <div className="header-content">
              <Button 
                className="mobile-menu-trigger"
                type="text" 
                icon={<MenuOutlined />}
                onClick={() => setMobileDrawerVisible(true)}
              />
              <Title level={2} className="app-title">
                Max ERP - Recruitment Module
              </Title>
            </div>
          </Header>
          <Layout>
            {/* Desktop Sidebar */}
            <Sider 
              className="desktop-sider"
              width={250} 
              collapsible
              collapsed={collapsed}
              onCollapse={setCollapsed}
              breakpoint="lg"
              collapsedWidth="80"
              style={{ background: '#fff' }}
            >
              <Sidebar collapsed={collapsed} />
            </Sider>
            
            {/* Mobile Drawer */}
            <Drawer
              title="Navigation"
              placement="left"
              onClose={() => setMobileDrawerVisible(false)}
              open={mobileDrawerVisible}
              className="mobile-drawer"
              bodyStyle={{ padding: 0 }}
              width={250}
            >
              <Sidebar collapsed={false} onNavigate={() => setMobileDrawerVisible(false)} />
            </Drawer>
            
            <Content className="app-content">
              <div className="content-wrapper">
                <Routes>
                  <Route path="/" element={<CurrentJobOpenings />} />
                  <Route path="/manage" element={<ManageJobs />} />
                </Routes>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;