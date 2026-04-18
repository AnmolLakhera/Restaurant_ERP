import { useState } from 'react';
import {
  Search, Bell, ChevronDown, RefreshCcw, Download,
  DollarSign, ShoppingCart, AlertTriangle, Minus, BarChart3,
  ArrowUpRight, Users, MoreVertical, Plus, ChevronRight,
  Package, FileText, UtensilsCrossed, LayoutGrid, Clock,
  Hourglass, Target, Star, CheckCircle2, Info, ArrowUp, ArrowDown
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';

/* ---- Chart Data ---- */
const salesData = [
  { time: '8 AM', sales: 120 },
  { time: '9 AM', sales: 280 },
  { time: '10 AM', sales: 450 },
  { time: '11 AM', sales: 680 },
  { time: '12 PM', sales: 1020 },
  { time: '1 PM', sales: 1380 },
  { time: '2 PM', sales: 1650 },
  { time: '3 PM', sales: 1820 },
];

const orderTypeData = [
  { name: 'Dine-in', value: 62, pct: '48.8%' },
  { name: 'Takeaway', value: 41, pct: '32.3%' },
  { name: 'Delivery', value: 24, pct: '18.9%' },
];

const PIE_COLORS = ['#1a2332', '#6b7280', '#d1d5db'];

const topItems = [
  { rank: 1, name: 'Margherita Pizza', orders: 42, revenue: '$672.00', change: '+15.2%', up: true },
  { rank: 2, name: 'Classic Burger', orders: 38, revenue: '$532.00', change: '+8.7%', up: true },
  { rank: 3, name: 'Caesar Salad', orders: 29, revenue: '$348.00', change: '+12.3%', up: true },
  { rank: 4, name: 'Grilled Salmon', orders: 24, revenue: '$528.00', change: '+5.4%', up: true },
  { rank: 5, name: 'Pasta Carbonara', orders: 21, revenue: '$315.00', change: '-2.1%', up: false },
];

const stockAlerts = [
  { name: 'Fresh Mozzarella', detail: 'Critical: 2 kg remaining', level: 'critical', action: 'Order Now' },
  { name: 'Salmon Fillet', detail: 'Critical: 3 kg remaining', level: 'critical', action: 'Order Now' },
  { name: 'Tomato Sauce', detail: 'Low: 8 L remaining', level: 'low', action: 'Review' },
  { name: 'Lettuce', detail: 'Low: 5 heads remaining', level: 'low', action: 'Review' },
  { name: 'Olive Oil', detail: 'Low: 4 L remaining', level: 'low', action: 'Review' },
];

const recentOrders = [
  { id: '#1247', time: '2:45 PM', type: 'Dine-in', table: '12', items: 3, amount: '$54.50', status: 'Completed' },
  { id: '#1246', time: '2:38 PM', type: 'Takeaway', table: '-', items: 2, amount: '$28.00', status: 'Preparing' },
  { id: '#1245', time: '2:32 PM', type: 'Delivery', table: '-', items: 5, amount: '$87.50', status: 'En Route' },
  { id: '#1244', time: '2:28 PM', type: 'Dine-in', table: '8', items: 4, amount: '$62.00', status: 'Completed' },
  { id: '#1243', time: '2:15 PM', type: 'Dine-in', table: '5', items: 2, amount: '$34.00', status: 'Completed' },
  { id: '#1242', time: '2:08 PM', type: 'Takeaway', table: '-', items: 1, amount: '$16.00', status: 'Completed' },
];

const quickActions = [
  { icon: Plus, label: 'New Order', desc: 'Create manual order', color: '#1a2332' },
  { icon: LayoutGrid, label: 'Table Status', desc: 'View floor plan', color: '#b45309' },
  { icon: Package, label: 'Inventory', desc: 'Manage stock', color: '#2d6bcf' },
  { icon: FileText, label: 'Reports', desc: 'Generate report', color: '#dc2626' },
  { icon: UtensilsCrossed, label: 'Menu Editor', desc: 'Update menu items', color: '#2563eb' },
];

const revenueByCategoryData = [
  { category: 'Pizza', revenue: 1450 },
  { category: 'Burgers', revenue: 1120 },
  { category: 'Salads', revenue: 880 },
  { category: 'Seafood', revenue: 750 },
  { category: 'Pasta', revenue: 580 },
  { category: 'Desserts', revenue: 420 },
  { category: 'Beverages', revenue: 680 },
];

const paymentMethodsData = [
  { method: 'Cash', amount: 1456, pct: 30, color: '#1a2332' },
  { method: 'Credit Card', amount: 2423.50, pct: 50, color: '#3b4b61' },
  { method: 'Debit Card', amount: 726, pct: 15, color: '#6b7280' },
  { method: 'Digital Wallet', amount: 242, pct: 5, color: '#9ca3af' },
];

const staffPerformanceData = [
  { name: 'Sarah Johnson', role: 'Server', sales: '$842.50', orders: 28, avatar: 'SJ' },
  { name: 'Mike Chen', role: 'Server', sales: '$756.00', orders: 24, avatar: 'MC' },
  { name: 'Emma Davis', role: 'Server', sales: '$682.00', orders: 22, avatar: 'ED' },
  { name: 'James Wilson', role: 'Server', sales: '$624.50', orders: 20, avatar: 'JW' },
  { name: 'Lisa Brown', role: 'Server', sales: '$568.00', orders: 18, avatar: 'LB' },
];

const systemAlerts = [
  { title: 'Printer Connection Issue', desc: 'Kitchen printer #2 is offline. Orders may be delayed.', time: '5 minutes ago', level: 'warning' },
  { title: 'Peak Hour Starting', desc: 'Lunch rush typically begins in 15 minutes. All staff should be ready.', time: '12 minutes ago', level: 'info' },
  { title: 'Delivery Order Completed', desc: 'Order #1245 has been successfully delivered.', time: '18 minutes ago', level: 'success' },
];

const customerFeedback = [
  { name: 'Robert Anderson', rating: 5, text: 'Excellent service and food quality! The Margherita pizza was perfect.', time: '2h ago', avatar: 'RA' },
  { name: 'Jennifer Lee', rating: 4, text: 'Great atmosphere and friendly staff. Would recommend!', time: '4h ago', avatar: 'JL' },
  { name: 'David Martinez', rating: 5, text: "Best burger I've had in years. Will definitely come back!", time: '6h ago', avatar: 'DM' },
];

const performanceStats = [
  { label: 'AVG. PREP TIME', value: '12m 34s', change: '1m 12s', isGood: true, arrow: 'down', trend: 'faster', icon: Clock },
  { label: 'CUSTOMER WAIT TIME', value: '8m 42s', change: '45s', isGood: true, arrow: 'down', trend: 'faster', icon: Hourglass },
  { label: 'ORDER ACCURACY', value: '98.4%', change: '0.8%', isGood: true, arrow: 'up', trend: 'improvement', icon: Target },
  { label: 'CUSTOMER RATING', value: '4.7 / 5.0', change: '0.2', isGood: true, arrow: 'up', trend: 'from 23 reviews', icon: Star },
];

/* ---- Custom tooltip ---- */
const SalesTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="chart-tooltip">
        <span>${payload[0].value.toLocaleString()}</span>
      </div>
    );
  }
  return null;
};

/* ---- Dashboard Component ---- */
export default function Dashboard() {
  const [chartTab, setChartTab] = useState('hourly');

  return (
    <div className="content-area">
      {/* Top Bar */}
      <div className="content-top-bar">
        <div className="content-top-left">
          <h1>Dashboard</h1>
          <div className="breadcrumb">
            Bella Vista Restaurant &bull; <span>Downtown Outlet</span> <ChevronDown size={12} />
          </div>
        </div>
        <div className="top-bar">
          <div className="top-search">
            <Search size={16} />
            <input type="text" placeholder="Search..." />
          </div>
          <button className="top-icon-btn">
            <Bell size={18} />
            <span className="notif-dot" />
          </button>
          <div className="top-avatar">JM</div>
        </div>
      </div>

      {/* Dashboard Body */}
      <div className="dash-body">
        {/* Filters Row */}
        <div className="dash-filters">
          <div className="dash-filters-left">
            <div className="filter-group">
              <span className="filter-label">DATE RANGE</span>
              <button className="filter-dropdown">
                <span>📅</span> Today <ChevronDown size={12} />
              </button>
            </div>
            <div className="filter-group">
              <span className="filter-label">COMPARE TO</span>
              <button className="filter-dropdown">
                Yesterday <ChevronDown size={12} />
              </button>
            </div>
            <div className="filter-group">
              <span className="filter-label">TIME PERIOD</span>
              <button className="filter-dropdown">
                All Day <ChevronDown size={12} />
              </button>
            </div>
          </div>
          <div className="dash-filters-right">
            <button className="dash-action-btn"><RefreshCcw size={14} /> Refresh</button>
            <button className="dash-action-btn"><Download size={14} /> Export</button>
          </div>
        </div>

        {/* Top Stats */}
        <div className="dash-stats-row">
          <div className="dash-stat-card">
            <div className="dash-stat-header">
              <span className="dash-stat-title">TODAY'S SALES</span>
              <div className="dash-stat-icon blue"><DollarSign size={16} /></div>
            </div>
            <div className="dash-stat-value">$4,847.50</div>
            <div className="dash-stat-change positive">
              <ArrowUp size={12} /> 12.5% <span className="vs">vs yesterday</span>
            </div>
            <div className="dash-stat-sub">Target: $5,000.00 (96.9%)</div>
          </div>

          <div className="dash-stat-card">
            <div className="dash-stat-header">
              <span className="dash-stat-title">ORDERS COUNT</span>
              <div className="dash-stat-icon purple"><ShoppingCart size={16} /></div>
            </div>
            <div className="dash-stat-value">127</div>
            <div className="dash-stat-change positive">
              <ArrowUp size={12} /> 8.3% <span className="vs">vs yesterday</span>
            </div>
            <div className="dash-stat-sub">Avg Order: $38.17</div>
          </div>

          <div className="dash-stat-card">
            <div className="dash-stat-header">
              <span className="dash-stat-title">LOW STOCK ALERTS</span>
              <div className="dash-stat-icon yellow"><AlertTriangle size={16} /></div>
            </div>
            <div className="dash-stat-value">5</div>
            <div className="dash-stat-change negative">
              <ArrowUp size={12} /> 2 items <span className="vs">since yesterday</span>
            </div>
            <div className="dash-stat-sub">Critical: 2 items</div>
          </div>

          <div className="dash-stat-card">
            <div className="dash-stat-header">
              <span className="dash-stat-title">TOP SELLING ITEM</span>
              <div className="dash-stat-icon green"><ArrowUp size={16} /></div>
            </div>
            <div className="dash-stat-value" style={{ fontSize: 20 }}>Margherita Pizza</div>
            <div className="dash-stat-sub" style={{ marginTop: 4 }}>42 orders today</div>
            <div className="dash-stat-sub">Revenue: $672.00</div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="dash-charts-row">
          {/* Sales Overview */}
          <div className="dash-chart-card sales-chart">
            <div className="dash-chart-header">
              <div>
                <h3>Sales Overview</h3>
                <span className="dash-chart-sub">Hourly breakdown of today's sales</span>
              </div>
              <div className="chart-tabs">
                {['Hourly', 'Daily', 'Weekly'].map(tab => (
                  <button
                    key={tab}
                    className={`chart-tab ${chartTab === tab.toLowerCase() ? 'active' : ''}`}
                    onClick={() => setChartTab(tab.toLowerCase())}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="chart-area">
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={salesData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2d6bcf" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2d6bcf" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
                  <Tooltip content={<SalesTooltip />} />
                  <Area type="monotone" dataKey="sales" stroke="#2d6bcf" strokeWidth={2.5} fill="url(#salesGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Order Types Pie */}
          <div className="dash-chart-card order-types-chart">
            <div className="dash-chart-header">
              <h3>Order Types</h3>
              <button className="more-btn"><MoreVertical size={16} /></button>
            </div>
            <div className="chart-area pie-area">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={orderTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {orderTypeData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-legend">
                {orderTypeData.map((d, i) => (
                  <div key={i} className="pie-legend-item">
                    <span className="pie-dot" style={{ background: PIE_COLORS[i] }} />
                    <span className="pie-label">{d.name}</span>
                    <span className="pie-val">{d.value} ({d.pct})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="dash-stats-row">
          <div className="dash-stat-card">
            <div className="dash-stat-header">
              <span className="dash-stat-title">AVERAGE ORDER VALUE</span>
              <div className="dash-stat-icon blue"><BarChart3 size={16} /></div>
            </div>
            <div className="dash-stat-value">$38.17</div>
            <div className="dash-stat-change positive">
              <ArrowUp size={12} /> 3.8% <span className="vs">vs yesterday</span>
            </div>
          </div>

          <div className="dash-stat-card">
            <div className="dash-stat-header">
              <span className="dash-stat-title">TABLE TURNOVER</span>
              <div className="dash-stat-icon purple"><ArrowUpRight size={16} /></div>
            </div>
            <div className="dash-stat-value">2.8x</div>
            <div className="dash-stat-change neutral">
              <Minus size={12} /> 0.2x <span className="vs">vs yesterday</span>
            </div>
          </div>

          <div className="dash-stat-card">
            <div className="dash-stat-header">
              <span className="dash-stat-title">ACTIVE TABLES</span>
              <div className="dash-stat-icon green"><BarChart3 size={16} /></div>
            </div>
            <div className="dash-stat-value">12 / 28</div>
            <div className="dash-stat-sub">42.9% occupancy</div>
          </div>

          <div className="dash-stat-card">
            <div className="dash-stat-header">
              <span className="dash-stat-title">STAFF ON DUTY</span>
              <div className="dash-stat-icon yellow"><Users size={16} /></div>
            </div>
            <div className="dash-stat-value">18</div>
            <div className="dash-stat-sub">8 servers, 6 kitchen, 4 others</div>
          </div>
        </div>

        {/* Top Performing & Low Stock */}
        <div className="dash-charts-row">
          <div className="dash-chart-card sales-chart">
            <div className="dash-chart-header">
              <div>
                <h3>Top Performing Items</h3>
                <span className="dash-chart-sub">By revenue today</span>
              </div>
              <a className="view-all-link">View All</a>
            </div>
            <div className="top-items-list">
              {topItems.map(item => (
                <div key={item.rank} className="top-item-row">
                  <span className="top-item-rank">{item.rank}</span>
                  <div className="top-item-info">
                    <span className="top-item-name">{item.name}</span>
                    <span className="top-item-orders">{item.orders} orders</span>
                  </div>
                  <div className="top-item-revenue">
                    <span className="top-item-amount">{item.revenue}</span>
                    <span className={`top-item-change ${item.up ? 'positive' : 'negative'}`}>
                      {item.up ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dash-chart-card order-types-chart">
            <div className="dash-chart-header">
              <div>
                <h3>Low Stock Alerts</h3>
                <span className="dash-chart-sub">Items requiring attention</span>
              </div>
              <a className="view-all-link">Manage Inventory</a>
            </div>
            <div className="stock-alerts-list">
              {stockAlerts.map((item, i) => (
                <div key={i} className={`stock-alert-row ${item.level}`}>
                  <div className={`stock-alert-icon ${item.level}`}>
                    <AlertTriangle size={14} />
                  </div>
                  <div className="stock-alert-info">
                    <span className="stock-alert-name">{item.name}</span>
                    <span className="stock-alert-detail">{item.detail}</span>
                  </div>
                  <button className={`stock-alert-btn ${item.level}`}>{item.action}</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders & Quick Actions */}
        <div className="dash-charts-row">
          <div className="dash-chart-card sales-chart">
            <div className="dash-chart-header">
              <div>
                <h3>Recent Orders</h3>
                <span className="dash-chart-sub">Last 10 orders</span>
              </div>
              <a className="view-all-link">View All Orders</a>
            </div>
            <table className="orders-table">
              <thead>
                <tr>
                  <th>ORDER ID</th>
                  <th>TIME</th>
                  <th>TYPE</th>
                  <th>TABLE</th>
                  <th>ITEMS</th>
                  <th>AMOUNT</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(o => (
                  <tr key={o.id}>
                    <td className="order-id">{o.id}</td>
                    <td>{o.time}</td>
                    <td>{o.type}</td>
                    <td>{o.table}</td>
                    <td>{o.items}</td>
                    <td className="order-amount">{o.amount}</td>
                    <td><span className={`order-status ${o.status.toLowerCase().replace(' ', '-')}`}>{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="dash-chart-card order-types-chart">
            <div className="dash-chart-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="quick-actions-list">
              {quickActions.map((qa, i) => {
                const Icon = qa.icon;
                return (
                  <div key={i} className="quick-action-row">
                    <div className="quick-action-icon" style={{ background: qa.color }}>
                      <Icon size={16} />
                    </div>
                    <div className="quick-action-info">
                      <span className="quick-action-label">{qa.label}</span>
                      <span className="quick-action-desc">{qa.desc}</span>
                    </div>
                    <ChevronRight size={16} className="quick-action-arrow" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Revenue by Category & Payment Methods */}
        <div className="dash-charts-row">
          <div className="dash-chart-card sales-chart">
            <div className="dash-chart-header">
              <div>
                <h3>Revenue by Category</h3>
                <span className="dash-chart-sub">Today's breakdown</span>
              </div>
            </div>
            <div className="chart-area">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={revenueByCategoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
                  <Tooltip cursor={{ fill: '#f9fafb' }} />
                  <Bar dataKey="revenue" fill="#1a2332" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="dash-chart-card order-types-chart">
            <div className="dash-chart-header">
              <div>
                <h3>Payment Methods</h3>
                <span className="dash-chart-sub">Distribution of payments</span>
              </div>
            </div>
            <div className="payment-methods-list">
              {paymentMethodsData.map((pm, i) => (
                <div key={i} className="payment-method-row">
                  <div className="payment-method-info">
                    <span className="payment-method-name">{pm.method}</span>
                    <span className="payment-method-amount">${pm.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })} ({pm.pct}%)</span>
                  </div>
                  <div className="payment-progress-bg">
                    <div className="payment-progress-bar" style={{ width: `${pm.pct}%`, background: pm.color }} />
                  </div>
                </div>
              ))}
              <div className="payment-total">
                <span>Total Processed</span>
                <span className="total-amount">$4,847.50</span>
              </div>
            </div>
          </div>
        </div>

        {/* Staff Performance */}
        <div className="dash-chart-card staff-performance-section">
          <div className="dash-chart-header">
            <div>
              <h3>Staff Performance</h3>
              <span className="dash-chart-sub">Top servers by sales today</span>
            </div>
            <a className="view-all-link">View All Staff</a>
          </div>
          <div className="staff-performance-list">
            {staffPerformanceData.map((staff, i) => (
              <div key={i} className="staff-card">
                <div className="staff-avatar">{staff.avatar}</div>
                <div className="staff-info">
                  <span className="staff-name">{staff.name}</span>
                  <span className="staff-role">{staff.role}</span>
                </div>
                <div className="staff-metrics">
                  <span className="staff-sales">{staff.sales}</span>
                  <span className="staff-orders">{staff.orders} orders</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts & Customer Feedback */}
        <div className="dash-charts-row">
          <div className="dash-chart-card sales-chart">
            <div className="dash-chart-header">
              <h3>System Alerts</h3>
              <a className="view-all-link">View All</a>
            </div>
            <div className="alerts-list">
              {systemAlerts.map((alert, i) => (
                <div key={i} className={`alert-box ${alert.level}`}>
                  <div className={`alert-icon-circle ${alert.level}`}>
                    {alert.level === 'warning' && <AlertTriangle size={16} />}
                    {alert.level === 'info' && <Info size={16} />}
                    {alert.level === 'success' && <CheckCircle2 size={16} />}
                  </div>
                  <div className="alert-content">
                    <div className="alert-top">
                      <span className="alert-title">{alert.title}</span>
                    </div>
                    <span className="alert-desc">{alert.desc}</span>
                    <span className="alert-time">{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dash-chart-card order-types-chart">
            <div className="dash-chart-header">
              <h3>Customer Feedback</h3>
              <a className="view-all-link">View All</a>
            </div>
            <div className="feedback-list">
              {customerFeedback.map((f, i) => (
                <div key={i} className="feedback-item">
                  <div className="feedback-header">
                    <div className="feedback-user">
                      <div className="feedback-avatar">{f.avatar}</div>
                      <div className="feedback-user-info">
                        <span className="feedback-name">{f.name}</span>
                        <div className="feedback-stars">
                          {[...Array(5)].map((_, si) => (
                            <Star key={si} size={12} fill={si < f.rating ? "#fbbf24" : "none"} stroke={si < f.rating ? "#fbbf24" : "#d1d5db"} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="feedback-time">{f.time}</span>
                  </div>
                  <p className="feedback-text">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Performance Stats */}
        <div className="dash-stats-row">
          {performanceStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="dash-stat-card">
                <div className="dash-stat-header">
                  <span className="dash-stat-title">{stat.label}</span>
                  <Icon size={16} className="stat-icon-muted" />
                </div>
                <div className="dash-stat-value">{stat.value}</div>
                <div className={`dash-stat-change ${stat.isGood ? 'positive' : 'negative'}`}>
                  {stat.arrow === 'up' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                  {stat.change} <span className="vs">{stat.trend}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
