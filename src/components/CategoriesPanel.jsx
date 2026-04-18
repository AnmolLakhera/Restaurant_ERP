import { Plus, Pencil, ListOrdered } from 'lucide-react';
import { categories } from '../data.js';

export default function CategoriesPanel({ activeCategory, onCategorySelect }) {
  return (
    <div className="categories-panel">
      <div className="categories-header">
        <h3>Categories</h3>
        <button className="add-cat-btn">
          <Plus size={14} />
        </button>
      </div>

      <div className="categories-search">
        <input type="text" placeholder="Filter categories..." />
      </div>

      <div className="categories-list">
        {categories.map((cat, i) => (
          <div
            key={i}
            className={`category-item ${i === activeCategory ? 'active' : ''}`}
            onClick={() => onCategorySelect(i)}
          >
            <span className="cat-icon" />
            <span className="cat-name">{cat.name}</span>
            <span className="cat-count">{cat.count}</span>
          </div>
        ))}
      </div>

      <div className="categories-footer">
        <div className="label">Category Actions</div>
        <div className="actions">
          <button className="cat-action-btn">
            <Pencil size={12} /> Edit
          </button>
          <button className="cat-action-btn">
            <ListOrdered size={12} /> Reorder
          </button>
        </div>
      </div>
    </div>
  );
}
