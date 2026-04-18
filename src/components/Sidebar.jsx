import {
  LayoutDashboard, ShoppingCart, BookOpen, Package,
  Users, BarChart3, Settings, Monitor, ChefHat, Utensils
} from 'lucide-react';
import { navItems, quickAccessItems } from '../data.js';

const iconMap = {
  'layout-dashboard': LayoutDashboard,
  'shopping-cart': ShoppingCart,
  'book-open': BookOpen,
  'package': Package,
  'users': Users,
  'bar-chart-3': BarChart3,
  'settings': Settings,
  'monitor': Monitor,
  'chef-hat': ChefHat,
};

export default function Sidebar({ activePage, onPageChange }) {
  return (
    <aside className="sidebar expanded" id="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <Utensils size={18} />
        </div>
        <div className="sidebar-logo-text">
          <h2>Restaurant ERP</h2>
          <span>Admin &amp; Management</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item, i) => {
          const Icon = iconMap[item.icon];
          const isActive = item.label.toLowerCase() === activePage;
          return (
            <div
              key={i}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onPageChange(item.label.toLowerCase())}
            >
              {Icon && <Icon size={20} />}
              <span className="nav-item-label">{item.label}</span>
              {item.badge && (
                <span className={`nav-badge ${item.badgeColor}`}>{item.badge}</span>
              )}
            </div>
          );
        })}

        <div className="sidebar-section-label">QUICK ACCESS</div>

        {quickAccessItems.map((item, i) => {
          const Icon = iconMap[item.icon];
          return (
            <div key={`q-${i}`} className="nav-item">
              {Icon && <Icon size={20} />}
              <span className="nav-item-label">{item.label}</span>
            </div>
          );
        })}
      </nav>

      <div className="sidebar-user">
        <div className="sidebar-user-avatar">JM</div>
        <div className="sidebar-user-info">
          <div className="name">John Manager</div>
          <div className="role">Manager</div>
        </div>
      </div>
    </aside>
  );
}
