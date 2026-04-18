/* Restaurant ERP — Data */
export const categories = [
  { name: 'Pizza', count: 12, icon: '🍕' },
  { name: 'Burgers', count: 8, icon: '🍔' },
  { name: 'Salads', count: 6, icon: '🥗' },
  { name: 'Seafood', count: 7, icon: '🦐' },
  { name: 'Pasta', count: 9, icon: '🍝' },
  { name: 'Chicken', count: 10, icon: '🍗' },
  { name: 'Steaks', count: 5, icon: '🥩' },
  { name: 'Desserts', count: 11, icon: '🍰' },
  { name: 'Beverages', count: 15, icon: '🥤' },
  { name: 'Appetizers', count: 8, icon: '🍟' },
];

export const pizzaItems = [
  { name: 'Margherita Pizza', desc: 'Classic tomato sauce, fresh mozzarella, basil', price: 16.00, status: 'in-stock', tags: ['Popular'], color: '#ef4444' },
  { name: 'Pepperoni Pizza', desc: 'Tomato sauce, mozzarella, pepperoni slices', price: 18.00, status: 'in-stock', tags: [], color: '#f97316' },
  { name: 'Quattro Formaggi', desc: 'Four cheese blend, mozzarella, gorgonzola...', price: 20.00, status: 'in-stock', tags: [], color: '#eab308' },
  { name: 'Hawaiian Pizza', desc: 'Ham, pineapple, mozzarella, tomato sauce', price: 17.50, status: 'in-stock', tags: [], color: '#22c55e' },
  { name: 'Vegetarian Supreme', desc: 'Bell peppers, mushrooms, olives, onions, tomatoes', price: 19.00, status: 'in-stock', tags: ['Veg'], color: '#14b8a6' },
  { name: 'BBQ Chicken Pizza', desc: 'BBQ sauce, grilled chicken, red onions, cilantro', price: 19.50, status: 'disabled', tags: ['Disabled'], color: '#6366f1' },
  { name: 'Meat Lovers', desc: 'Pepperoni, sausage, bacon, ham, ground beef', price: 22.00, status: 'in-stock', tags: [], color: '#ec4899' },
  { name: 'Truffle Mushroom', desc: 'Truffle oil, mixed mushrooms, mozzarella, arugula', price: 24.00, status: 'in-stock', tags: ['Premium'], color: '#8b5cf6' },
];

export const navItems = [
  { icon: 'layout-dashboard', label: 'Dashboard' },
  { icon: 'shopping-cart', label: 'Orders', badge: 3, badgeColor: 'red' },
  { icon: 'book-open', label: 'Menu', active: true },
  { icon: 'package', label: 'Inventory', badge: 5, badgeColor: 'green' },
  { icon: 'users', label: 'Staff' },
  { icon: 'bar-chart-3', label: 'Reports' },
  { icon: 'settings', label: 'Settings' },
];

export const quickAccessItems = [
  { icon: 'monitor', label: 'POS App' },
  { icon: 'chef-hat', label: 'Kitchen Display' },
];

export const sizes = [
  { name: 'Small (10")', checked: true, default: false, basePrice: '12.00', costPrice: '4.50', margin: '62.5%' },
  { name: 'Medium (12")', checked: true, default: true, basePrice: '16.00', costPrice: '6.00', margin: '62.5%' },
  { name: 'Large (14")', checked: true, default: false, basePrice: '20.00', costPrice: '7.50', margin: '62.5%' },
];

export const modifiers = [
  { name: 'Extra Cheese', desc: 'Additional mozzarella', checked: true, price: '2.50' },
  { name: 'Extra Basil', desc: 'Fresh basil leaves', checked: true, price: '1.00' },
  { name: 'Gluten-Free Crust', desc: 'Substitute regular crust', checked: true, price: '3.00' },
];

export const availableDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
