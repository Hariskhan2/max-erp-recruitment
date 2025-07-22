import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, Typography } from 'antd';
import { store } from './store';
import Sidebar from './components/Sidebar';
import CurrentJobOpenings from './pages/CurrentJobOpenings';
import ManageJobs from './pages/ManageJobs';
import './App.css';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Header style={{ background: '#001529', padding: '0 50px' }}>
            <Title level={2} style={{ color: 'white', margin: '14px 0' }}>
              Max ERP - Recruitment Module
            </Title>
          </Header>
          <Layout>
            <Sider width={250} style={{ background: '#fff' }}>
              <Sidebar />
            </Sider>
            <Content style={{ padding: '24px', background: '#f0f2f5' }}>
              <div style={{ maxWidth: 1200, margin: '0 auto' }}>
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