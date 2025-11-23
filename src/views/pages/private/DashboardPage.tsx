import { Activity, DollarSign, ShoppingCart, TrendingDown, TrendingUp, Users } from 'lucide-react';
import { FC } from 'react';
import RootLayout from '@views/layouts/RootLayout';

const DashboardPage: FC = () => {
  return (
    <RootLayout>
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
    </RootLayout>
  );
};

export default DashboardPage;
