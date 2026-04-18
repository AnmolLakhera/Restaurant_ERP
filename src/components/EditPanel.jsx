import { useState, useRef } from 'react';
import {
  RefreshCcw, Check, Trash2, Plus, CloudUpload,
  ImageIcon, TrendingUp, Copy, X
} from 'lucide-react';
import { categories, pizzaItems, sizes as defaultSizes, modifiers as defaultModifiers, availableDays } from '../data.js';

// --- Initial defaults (used by Reset) ---
const INITIAL_TAGS = ['Popular', 'Vegetarian'];
const INITIAL_SIZES = () => defaultSizes.map(s => ({ ...s }));
const INITIAL_MODIFIERS = () => defaultModifiers.map(m => ({ ...m }));

export default function EditPanel({ activeCategory, activeItem }) {
  const item = pizzaItems[activeItem];
  const [autoSave, setAutoSave] = useState(true);
  const [itemEnabled, setItemEnabled] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [tags, setTags] = useState([...INITIAL_TAGS]);
  const [activeDays, setActiveDays] = useState([...availableDays]);
  const [allDayChecked, setAllDayChecked] = useState(true);
  const [resetKey, setResetKey] = useState(0); // forces uncontrolled inputs to re-render

  // --- Sizes state ---
  const [sizesList, setSizesList] = useState(INITIAL_SIZES());

  const toggleSizeChecked = (index) => {
    setSizesList(prev => prev.map((s, i) =>
      i === index ? { ...s, checked: !s.checked } : s
    ));
  };

  const updateSize = (index, field, value) => {
    setSizesList(prev => prev.map((s, i) =>
      i === index ? { ...s, [field]: value } : s
    ));
  };

  const deleteSize = (index) => {
    setSizesList(prev => prev.filter((_, i) => i !== index));
  };

  const addSize = () => {
    setSizesList(prev => [
      ...prev,
      { name: '', checked: true, default: false, basePrice: '0.00', costPrice: '0.00', margin: '0%' }
    ]);
  };

  // --- Modifiers state ---
  const [modifiersList, setModifiersList] = useState(INITIAL_MODIFIERS());

  const toggleModChecked = (index) => {
    setModifiersList(prev => prev.map((m, i) =>
      i === index ? { ...m, checked: !m.checked } : m
    ));
  };

  const updateModifier = (index, field, value) => {
    setModifiersList(prev => prev.map((m, i) =>
      i === index ? { ...m, [field]: value } : m
    ));
  };

  const deleteModifier = (index) => {
    setModifiersList(prev => prev.filter((_, i) => i !== index));
  };

  const addModifier = () => {
    setModifiersList(prev => [
      ...prev,
      { name: '', desc: '', checked: true, price: '0.00' }
    ]);
  };

  // --- Reset All ---
  const resetAll = () => {
    setAutoSave(true);
    setItemEnabled(true);
    setFeatured(false);
    setTags([...INITIAL_TAGS]);
    setActiveDays([...availableDays]);
    setAllDayChecked(true);
    setSizesList(INITIAL_SIZES());
    setModifiersList(INITIAL_MODIFIERS());
    setImages([null, null, null, null]);
    setResetKey(prev => prev + 1); // re-mount uncontrolled inputs
  };

  // --- Images state ---
  const [images, setImages] = useState([null, null, null, null]); // 4 slots, null = empty
  const fileInputRef = useRef(null);
  const [uploadSlot, setUploadSlot] = useState(null);

  const handleUploadClick = (slotIndex) => {
    setUploadSlot(slotIndex);
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImages(prev => {
      const next = [...prev];
      if (uploadSlot !== null) {
        next[uploadSlot] = url;
      } else {
        // Find first empty slot
        const emptyIdx = next.indexOf(null);
        if (emptyIdx !== -1) next[emptyIdx] = url;
      }
      return next;
    });
    setUploadSlot(null);
    e.target.value = '';
  };

  const removeImage = (index) => {
    setImages(prev => {
      const next = [...prev];
      if (next[index]) URL.revokeObjectURL(next[index]);
      next[index] = null;
      return next;
    });
  };

  // --- Tags ---
  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const toggleDay = (day) => {
    setActiveDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  // --- Margin calculation ---
  const calcMargin = (basePrice, costPrice) => {
    const base = parseFloat(basePrice) || 0;
    const cost = parseFloat(costPrice) || 0;
    if (base === 0) return '0%';
    return (((base - cost) / base) * 100).toFixed(1) + '%';
  };

  // Find first empty image slot for the upload zone
  const firstEmptySlot = images.indexOf(null);

  return (
    <div className="edit-panel">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
      />

      {/* Header */}
      <div className="edit-header">
        <div className="edit-header-left">
          <h2>Edit Menu Item</h2>
          <span>Last updated: 2 hours ago by Sarah Johnson</span>
        </div>
        <div className="edit-header-right">
          <div className="auto-save">
            <span>Auto-save</span>
            <div
              className={`toggle-switch ${!autoSave ? 'off' : ''}`}
              onClick={() => setAutoSave(!autoSave)}
            />
          </div>
          <button className="reset-btn" onClick={resetAll}>
            <RefreshCcw size={14} /> Reset
          </button>
          <button className="save-btn">
            <Check size={14} /> Save Changes
          </button>
        </div>
      </div>

      {/* Scrollable Body */}
      <div className="edit-body" key={resetKey}>
        {/* BASIC INFORMATION */}
        <div className="section-title">BASIC INFORMATION</div>
        <div className="form-row">
          <div className="form-group" style={{ flex: 2 }}>
            <label>Item Name <span className="req">*</span></label>
            <input type="text" defaultValue={item.name} />
            <span className="char-limit">Max 100 characters</span>
          </div>
          <div className="form-group">
            <label>Category <span className="req">*</span></label>
            <select defaultValue={categories[activeCategory].name}>
              {categories.map((c, i) => (
                <option key={i}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Description</label>
            <textarea rows={3} defaultValue={item.desc} />
            <span className="char-limit">Max 500 characters</span>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>SKU / Item Code</label>
            <input type="text" defaultValue="PZ-MARG-001" />
          </div>
          <div className="form-group">
            <label>Tags</label>
            <div className="tags-input-wrap">
              {tags.map((t, i) => (
                <span key={i} className="tag-chip">
                  {t} <span className="remove-tag" onClick={() => removeTag(i)}>&times;</span>
                </span>
              ))}
              <input type="text" placeholder="Add tag..." />
            </div>
          </div>
        </div>

        {/* PRICING & SIZES */}
        <div className="section-title">PRICING &amp; SIZES</div>
        {sizesList.map((s, i) => (
          <div key={i} className="size-card">
            <div className="size-card-header">
              <div className="size-card-header-left">
                <div
                  className={`size-checkbox ${s.checked ? '' : 'unchecked'}`}
                  onClick={() => toggleSizeChecked(i)}
                >
                  {s.checked && <Check size={12} />}
                </div>
                <input
                  type="text"
                  className="size-name-input"
                  value={s.name}
                  onChange={(e) => updateSize(i, 'name', e.target.value)}
                  placeholder='Size name (e.g. Medium 12")'
                />
                {s.default && <span className="default-badge">Default</span>}
              </div>
              <button className="delete-size-btn" onClick={() => deleteSize(i)}>
                <Trash2 size={14} />
              </button>
            </div>
            <div className="size-prices">
              <div className="form-group">
                <label>Base Price <span className="req">*</span></label>
                <input type="text" value={`$  ${s.basePrice}`} onChange={(e) => updateSize(i, 'basePrice', e.target.value.replace(/^\$\s*/, ''))} />
              </div>
              <div className="form-group">
                <label>Cost Price</label>
                <input type="text" value={`$  ${s.costPrice}`} onChange={(e) => updateSize(i, 'costPrice', e.target.value.replace(/^\$\s*/, ''))} />
              </div>
              <div className="form-group">
                <label>Margin</label>
                <div className="margin-value">{calcMargin(s.basePrice, s.costPrice)}</div>
              </div>
            </div>
          </div>
        ))}
        <button className="add-size-option-btn" onClick={addSize}>
          <Plus size={14} /> Add Size Option
        </button>

        {/* MODIFIERS & ADD-ONS */}
        <div className="section-title">MODIFIERS &amp; ADD-ONS</div>
        {modifiersList.map((m, i) => (
          <div key={i} className="modifier-card">
            <div className="modifier-left">
              <div
                className={`size-checkbox ${m.checked ? '' : 'unchecked'}`}
                onClick={() => toggleModChecked(i)}
              >
                {m.checked && <Check size={12} />}
              </div>
              <div className="modifier-info">
                <input
                  type="text"
                  className="modifier-name-input"
                  value={m.name}
                  onChange={(e) => updateModifier(i, 'name', e.target.value)}
                  placeholder="Modifier name"
                />
                <input
                  type="text"
                  className="modifier-desc-input"
                  value={m.desc}
                  onChange={(e) => updateModifier(i, 'desc', e.target.value)}
                  placeholder="Description"
                />
              </div>
            </div>
            <div className="modifier-right">
              <input type="text" className="modifier-price-input" value={`$  ${m.price}`} onChange={(e) => updateModifier(i, 'price', e.target.value.replace(/^\$\s*/, ''))} />
              <button className="delete-size-btn" onClick={() => deleteModifier(i)}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        <button className="add-size-option-btn" onClick={addModifier}>
          <Plus size={14} /> Add Modifier
        </button>

        {/* AVAILABILITY & STATUS */}
        <div className="section-title">AVAILABILITY &amp; STATUS</div>
        <div className="availability-row">
          <div className="availability-card">
            <div className="avail-card-top">
              <span className="avail-label">Item Status</span>
              <span className="avail-value">{itemEnabled ? 'Enabled' : 'Disabled'}</span>
              <div
                className={`toggle-switch ${!itemEnabled ? 'off' : ''}`}
                onClick={() => setItemEnabled(!itemEnabled)}
              />
            </div>
            <span className="avail-hint">Toggle to enable/disable this item from all menus</span>
          </div>
          <div className="availability-card">
            <div className="avail-card-top">
              <span className="avail-label">Featured Item</span>
              <span className="avail-value">{featured ? 'Yes' : 'No'}</span>
              <div
                className={`toggle-switch ${!featured ? 'off' : ''}`}
                onClick={() => setFeatured(!featured)}
              />
            </div>
            <span className="avail-hint">Show as featured on menu displays</span>
          </div>
        </div>

        {/* SCHEDULED AVAILABILITY */}
        <div className="section-subtitle">Scheduled Availability</div>
        <div className="schedule-card">
          <div className="schedule-header">
            <span>All Day</span>
            <div
              className={`size-checkbox ${allDayChecked ? '' : 'unchecked'}`}
              onClick={() => setAllDayChecked(!allDayChecked)}
            >
              {allDayChecked && <Check size={12} />}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Start Time</label>
              <input type="text" defaultValue="--:--" />
            </div>
            <div className="form-group">
              <label>End Time</label>
              <input type="text" defaultValue="--:--" />
            </div>
          </div>
        </div>

        <div className="section-subtitle">Available Days</div>
        <div className="day-chips">
          {availableDays.map(d => (
            <span
              key={d}
              className={`day-chip ${activeDays.includes(d) ? 'active' : ''}`}
              onClick={() => toggleDay(d)}
            >
              {d}
            </span>
          ))}
        </div>

        {/* INVENTORY TRACKING */}
        <div className="section-title">INVENTORY TRACKING</div>
        <div className="form-row">
          <div className="form-group">
            <label>Track Inventory</label>
            <div className="radio-group">
              <label className="radio-label"><input type="radio" name="trackInventory" defaultChecked /> Yes</label>
              <label className="radio-label"><input type="radio" name="trackInventory" /> No</label>
            </div>
          </div>
          <div className="form-group">
            <label>Current Stock Level</label>
            <div className="stock-level-row">
              <input type="text" defaultValue="Unlimited" className="stock-input" />
              <button className="set-limit-btn">Set Limit</button>
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Low Stock Alert</label>
            <input type="text" placeholder="e.g., 10" />
          </div>
          <div className="form-group">
            <label>Out of Stock Action</label>
            <select defaultValue="Hide from menu">
              <option>Hide from menu</option>
              <option>Show as unavailable</option>
              <option>Keep visible</option>
            </select>
          </div>
        </div>

        {/* DIETARY INFORMATION */}
        <div className="section-title">DIETARY INFORMATION</div>
        <div className="dietary-grid">
          <label className="dietary-item"><span className="dietary-icon">🥬</span> Vegetarian <input type="checkbox" defaultChecked /></label>
          <label className="dietary-item"><span className="dietary-icon">🌱</span> Vegan <input type="checkbox" /></label>
          <label className="dietary-item"><span className="dietary-icon">🌾</span> Gluten-Free <input type="checkbox" /></label>
          <label className="dietary-item"><span className="dietary-icon">💧</span> Dairy-Free <input type="checkbox" /></label>
          <label className="dietary-item"><span className="dietary-icon">🔴</span> Contains Eggs <input type="checkbox" defaultChecked /></label>
          <label className="dietary-item"><span className="dietary-icon">🌶️</span> Spicy <input type="checkbox" /></label>
        </div>
        <div className="form-row" style={{ marginTop: 14 }}>
          <div className="form-group">
            <label>Allergen Information</label>
            <textarea rows={2} placeholder="List any allergens or special dietary notes..." />
          </div>
        </div>

        {/* PREPARATION DETAILS */}
        <div className="section-title">PREPARATION DETAILS</div>
        <div className="form-row">
          <div className="form-group">
            <label>Preparation Time</label>
            <div className="prep-time-row">
              <input type="text" defaultValue="15" className="prep-time-input" />
              <span className="prep-time-unit">minutes</span>
            </div>
          </div>
          <div className="form-group">
            <label>Cooking Station</label>
            <select defaultValue="Pizza Oven">
              <option>Pizza Oven</option>
              <option>Grill</option>
              <option>Fryer</option>
              <option>Cold Station</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Kitchen Notes</label>
            <textarea rows={3} defaultValue="Stretch dough to specified size. Apply sauce evenly. Add cheese and toppings. Bake at 450°F for 12-15 minutes until crust is golden." />
          </div>
        </div>

        {/* ITEM IMAGES */}
        <div className="section-title">ITEM IMAGES</div>
        <div className="images-grid">
          {/* Upload zone — clicking opens file picker for first empty slot */}
          <div className="image-upload-zone" onClick={() => handleUploadClick(firstEmptySlot !== -1 ? firstEmptySlot : 0)}>
            <CloudUpload size={28} />
            <span className="upload-label">Upload Image</span>
            <span className="upload-hint">JPG, PNG up to 5MB</span>
          </div>

          {/* Image slots */}
          {images.map((img, i) => (
            <div
              key={i}
              className={`image-slot ${img ? 'has-image' : ''}`}
              onClick={() => !img && handleUploadClick(i)}
              style={{ cursor: img ? 'default' : 'pointer' }}
            >
              {img ? (
                <>
                  <img src={img} alt={`Upload ${i + 1}`} className="uploaded-img" />
                  <button className="remove-img-btn" onClick={(e) => { e.stopPropagation(); removeImage(i); }}>
                    <X size={12} />
                  </button>
                  {i === 0 && <span className="primary-badge">Primary</span>}
                </>
              ) : (
                <div className="image-placeholder"><ImageIcon size={24} /></div>
              )}
            </div>
          ))}
        </div>

        {/* SALES PERFORMANCE */}
        <div className="section-title">SALES PERFORMANCE</div>
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Total Orders</span>
            <span className="stat-value">1,247</span>
            <span className="stat-change positive"><TrendingUp size={12} /> 12.5% vs last month</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Revenue</span>
            <span className="stat-value">$19,952</span>
            <span className="stat-change positive"><TrendingUp size={12} /> 8.3% vs last month</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Avg. Rating</span>
            <span className="stat-value">4.8</span>
            <span className="stat-stars">★★★★★</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Popularity Rank</span>
            <span className="stat-value">#1</span>
            <span className="stat-change neutral">in Pizza category</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="edit-footer">
        <div className="edit-footer-left">
          <button className="delete-item-btn"><Trash2 size={14} /> Delete Item</button>
          <button className="duplicate-btn"><Copy size={14} /> Duplicate Item</button>
        </div>
        <div className="edit-footer-right">
          <button className="cancel-btn">Cancel</button>
          <button className="save-all-btn"><Check size={14} /> Save All Changes</button>
        </div>
      </div>
    </div>
  );
}
