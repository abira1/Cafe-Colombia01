import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

export const MenuManager: React.FC = () => {
  const { menu, updateMenu } = useData();
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState<any>({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!newItem.name.trim()) errors.name = 'Name is required';
    if (!newItem.description.trim()) errors.description = 'Description is required';
    if (!newItem.price || newItem.price <= 0) errors.price = 'Price must be greater than 0';
    if (!newItem.category) errors.category = 'Category is required';
    if (!newItem.image.trim()) errors.image = 'Image URL is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      if (editingItem) {
        const updatedMenu = menu.map(item =>
          item.id === editingItem.id ? editingItem : item
        );
        updateMenu(updatedMenu);
        setEditingItem(null);
        setShowForm(false);
      } else {
        const newMenuItem = {
          ...newItem,
          id: Date.now().toString(),
        };
        const updatedMenu = [...menu, newMenuItem];
        updateMenu(updatedMenu);
        setNewItem({
          name: '',
          description: '',
          price: 0,
          category: '',
          image: '',
        });
        setFormErrors({});
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error saving menu item:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const updatedMenu = menu.filter(item => item.id !== id);
        updateMenu(updatedMenu);
      } catch (error) {
        console.error('Error deleting menu item:', error);
      }
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, isEditing: boolean) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const numericValue = value ? parseInt(value, 10) : 0;
    
    if (isEditing) {
      setEditingItem({ ...editingItem, price: numericValue });
    } else {
      setNewItem({ ...newItem, price: numericValue });
    }
    
    if (formErrors.price) {
      setFormErrors({ ...formErrors, price: '' });
    }
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setNewItem({
      name: '',
      description: '',
      price: 0,
      category: '',
      image: '',
    });
    setFormErrors({});
    setShowForm(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Menu Manager</h1>
        <button
          onClick={handleAddNew}
          className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200 flex items-center shadow-md hover:shadow-lg"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Menu Item
        </button>
      </div>
      
      {/* Add/Edit Form */}
      {(showForm || editingItem) && (
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
            </h2>
            <button
              onClick={() => {
                setEditingItem(null);
                setShowForm(false);
              }}
              className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                <input
                  type="text"
                  value={editingItem?.name || newItem.name}
                  onChange={(e) => {
                    if (editingItem) {
                      setEditingItem({ ...editingItem, name: e.target.value });
                    } else {
                      setNewItem({ ...newItem, name: e.target.value });
                    }
                    if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                  }}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    formErrors.name ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors duration-200`}
                  placeholder="Enter item name"
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={editingItem?.category || newItem.category}
                  onChange={(e) => {
                    if (editingItem) {
                      setEditingItem({ ...editingItem, category: e.target.value });
                    } else {
                      setNewItem({ ...newItem, category: e.target.value });
                    }
                    if (formErrors.category) setFormErrors({ ...formErrors, category: '' });
                  }}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    formErrors.category ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors duration-200`}
                >
                  <option value="">Select a category</option>
                  <option value="food">Food</option>
                  <option value="hot drinks">Hot Drinks</option>
                  <option value="cold drinks">Cold Drinks</option>
                </select>
                {formErrors.category && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.category}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (BDT)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">BDT</span>
                  <input
                    type="text"
                    value={editingItem ? formatPrice(editingItem.price).replace('BDT', '').trim() : 
                           formatPrice(newItem.price).replace('BDT', '').trim()}
                    onChange={(e) => handlePriceChange(e, !!editingItem)}
                    className={`w-full pl-12 pr-4 py-2 rounded-lg border ${
                      formErrors.price ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors duration-200`}
                    placeholder="Enter price"
                  />
                </div>
                {formErrors.price && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.price}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingItem?.image || newItem.image}
                  onChange={(e) => {
                    if (editingItem) {
                      setEditingItem({ ...editingItem, image: e.target.value });
                    } else {
                      setNewItem({ ...newItem, image: e.target.value });
                    }
                    if (formErrors.image) setFormErrors({ ...formErrors, image: '' });
                  }}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    formErrors.image ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors duration-200`}
                  placeholder="Enter image URL"
                />
                {formErrors.image && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.image}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editingItem?.description || newItem.description}
                  onChange={(e) => {
                    if (editingItem) {
                      setEditingItem({ ...editingItem, description: e.target.value });
                    } else {
                      setNewItem({ ...newItem, description: e.target.value });
                    }
                    if (formErrors.description) setFormErrors({ ...formErrors, description: '' });
                  }}
                  rows={4}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    formErrors.description ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors duration-200`}
                  placeholder="Enter item description"
                />
                {formErrors.description && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => {
                setEditingItem(null);
                setShowForm(false);
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {editingItem ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </div>
      )}

      {/* Menu Items List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Menu Items</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {menu.map((item) => (
            <div key={item.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center space-x-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                )}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                  <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingItem(item);
                    setShowForm(true);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-4 py-2 border border-transparent rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};