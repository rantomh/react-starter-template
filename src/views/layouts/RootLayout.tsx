import {
  BarChart3,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ShoppingBag,
  ShoppingCart,
  User,
  Users,
} from 'lucide-react';
import { FC, useState } from 'react';
import { logout } from '@core/utils/urls.util';

interface Props {
  children?: React.ReactNode;
}

const RootLayout: FC<Props> = ({ children }) => {
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
        <main className="content">{children}</main>
      </div>
    </div>
  );
};

export default RootLayout;
