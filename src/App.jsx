import { useState } from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import Sidebar from './components/Sidebar.jsx';
import CategoriesPanel from './components/CategoriesPanel.jsx';
import ItemsPanel from './components/ItemsPanel.jsx';
import EditPanel from './components/EditPanel.jsx';

export default function App() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeItem, setActiveItem] = useState(0);

  const handleCategorySelect = (index) => {
    setActiveCategory(index);
    setActiveItem(0);
  };

  return (
    <>
      <Sidebar />
      <div className="content-area">
        <div className="content-top-bar">
          <div className="content-top-left">
            <h1>Menu Management</h1>
            <div className="breadcrumb">
              Bella Vista Restaurant &bull; <span>Downtown Outlet</span> <ChevronDown size={12} />
            </div>
          </div>
          <div className="top-bar">
            <div className="top-search">
              <Search size={16} />
              <input type="text" placeholder="Search menu items..." />
            </div>
            <button className="top-icon-btn">
              <Bell size={18} />
              <span className="notif-dot" />
            </button>
            <div className="top-avatar">JM</div>
          </div>
        </div>
        <div className="content-body">
          <CategoriesPanel
            activeCategory={activeCategory}
            onCategorySelect={handleCategorySelect}
          />
          <ItemsPanel
            activeCategory={activeCategory}
            activeItem={activeItem}
            onItemSelect={setActiveItem}
          />
          <EditPanel
            activeCategory={activeCategory}
            activeItem={activeItem}
          />
        </div>
      </div>
    </>
  );
}
