import { Plus, SlidersHorizontal, Pizza } from 'lucide-react';
import { categories, pizzaItems } from '../data.js';

export default function ItemsPanel({ activeCategory, activeItem, onItemSelect }) {
  const cat = categories[activeCategory];
  const items = pizzaItems;

  return (
    <div className="items-panel">
      <div className="items-header">
        <div className="items-header-top">
          <div>
            <h2>{cat.name.toUpperCase()} ITEMS</h2>
            <span className="subtitle">{cat.count} items in category</span>
          </div>
          <button className="add-item-btn">
            <Plus size={14} /> Add Item
          </button>
        </div>
      </div>

      <div className="items-search">
        <input type="text" placeholder="Search items..." />
        <button className="filter-btn">
          <SlidersHorizontal size={16} />
        </button>
      </div>

      <div className="items-list">
        {items.map((item, i) => {
          const statusDot = item.status === 'in-stock' ? 'green' : 'red';
          return (
            <div
              key={i}
              className={`food-item ${i === activeItem ? 'active' : ''}`}
              onClick={() => onItemSelect(i)}
            >
              <div
                className="food-item-img"
                style={{ background: `linear-gradient(135deg,${item.color},${item.color}cc)` }}
              >
                <Pizza size={18} />
              </div>
              <div className="food-item-info">
                <div className="item-name">{item.name}</div>
                <div className="item-desc">{item.desc}</div>
                <div className="food-item-bottom">
                  <span className="food-item-price">${item.price.toFixed(2)}</span>
                  <div className="food-item-tags">
                    <span className={`item-status-dot ${statusDot}`} />
                    {item.status === 'in-stock' && (
                      <span className="item-tag in-stock">In Stock</span>
                    )}
                    {item.tags.map((t, ti) => (
                      <span key={ti} className={`item-tag ${t.toLowerCase()}`}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="items-footer">
        <span>Showing {items.length} of {cat.count} items</span>
        <a>View All</a>
      </div>
    </div>
  );
}
