import {
  Activity,
  BarChart3,
  DollarSign,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ShoppingBag,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  User,
  Users,
} from 'lucide-react';
import { FC, useState } from 'react';
import { logout } from '@utils/urls.util';

const Dashboard: FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard">
      <aside className={`sidebar ${sidebarOpen ? 'show' : ''}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-menu">
          <a href="#" className="menu-item active">
            <LayoutDashboard />
            <span>Dashboard</span>
          </a>
          <a href="#" className="menu-item">
            <Users />
            <span>Users</span>
          </a>
          <a href="#" className="menu-item">
            <ShoppingCart />
            <span>Orders</span>
          </a>
          <a href="#" className="menu-item">
            <ShoppingBag />
            <span>Products</span>
          </a>
          <a href="#" className="menu-item">
            <BarChart3 />
            <span>Analytics</span>
          </a>
          <a href="#" className="menu-item">
            <FileText />
            <span>Reports</span>
          </a>
          <a href="#" className="menu-item">
            <Settings />
            <span>Settings</span>
          </a>
        </nav>
      </aside>

      <div className="main-content">
        <header className="header">
          <div className="header-left">
            <button className="menu-toggle" onClick={toggleSidebar}>
              <Menu />
            </button>
            <h1>Dashboard</h1>
          </div>
          <div className="header-right">
            <div className="user-menu dropdown">
              <button className="user-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <div className="avatar">JD</div>
                <div className="user-info">
                  <span className="user-name">John Doe</span>
                  <span className="user-role">Administrator</span>
                </div>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="#">
                    <User />
                    Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <Settings />
                    Settings
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <LogOut />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </header>
        <main className="content">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-title">Total Revenue</span>
                <div className="stat-icon blue">
                  <DollarSign />
                </div>
              </div>
              <div className="stat-value">$45,231</div>
              <div className="stat-change positive">
                <TrendingUp size={16} />
                <span>+20.1% from last month</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-title">Total Users</span>
                <div className="stat-icon green">
                  <Users />
                </div>
              </div>
              <div className="stat-value">2,350</div>
              <div className="stat-change positive">
                <TrendingUp size={16} />
                <span>+15.3% from last month</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-title">Total Orders</span>
                <div className="stat-icon purple">
                  <ShoppingCart size={16} />
                </div>
              </div>
              <div className="stat-value">1,432</div>
              <div className="stat-change negative">
                <TrendingDown size={16} />
                <span>-4.3% from last month</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-title">Active Sessions</span>
                <div className="stat-icon orange">
                  <Activity />
                </div>
              </div>
              <div className="stat-value">573</div>
              <div className="stat-change positive">
                <TrendingUp size={16} />
                <span>+12.5% from last hour</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
