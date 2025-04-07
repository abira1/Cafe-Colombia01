import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Image as ImageIcon, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { v4 as uuidv4 } from 'uuid';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export function GalleryManager() {
  const { gallery, updateGallery } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [itemData, setItemData] = useState<GalleryItem>({
    id: '',
    title: '',
    description: '',
    image: ''
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      // Update existing item
      const updatedGallery = gallery.map(item =>
        item.id === editingItem.id ? itemData : item
      );
      updateGallery(updatedGallery);
    } else {
      // Add new item
      const newItem = {
        ...itemData,
        id: uuidv4()
      };
      updateGallery([...gallery, newItem]);
    }
    
    setShowForm(false);
    setEditingItem(null);
    setItemData({
      id: '',
      title: '',
      description: '',
      image: ''
    });
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setItemData(item);
    setShowForm(true);
  };

  const handleDelete = (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      const updatedGallery = gallery.filter(item => item.id !== itemId);
      updateGallery(updatedGallery);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Gallery Management</h2>
        <button
          onClick={() => {
            setEditingItem(null);
            setItemData({
              id: '',
              title: '',
              description: '',
              image: ''
            });
            setShowForm(true);
          }}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
        >
          Add New Image
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingItem ? 'Edit Image' : 'Add New Image'}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
                  setItemData({
                    id: '',
                    title: '',
                    description: '',
                    image: ''
                  });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={itemData.title}
                  onChange={(e) => setItemData({ ...itemData, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={itemData.description}
                  onChange={(e) => setItemData({ ...itemData, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="url"
                  value={itemData.image}
                  onChange={(e) => setItemData({ ...itemData, image: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingItem(null);
                    setItemData({
                      id: '',
                      title: '',
                      description: '',
                      image: ''
                    });
                  }}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.length === 0 ? (
          <div className="col-span-full p-4 text-center text-gray-500">No images found.</div>
        ) : (
          gallery.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Edit"
                  >
                    <Pencil className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 hover:bg-red-100 rounded"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}