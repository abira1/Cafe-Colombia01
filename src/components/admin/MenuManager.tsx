import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  available: boolean;
  discount?: number;
}
export function MenuManager() {
  const [items, setItems] = useState<MenuItem[]>([{
    id: '1',
    name: 'Colombian Black',
    description: 'Our signature black coffee from Huila region',
    price: '৳350',
    category: 'hot drinks',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e',
    available: true
  }, {
    id: '2',
    name: 'Iced Latte',
    description: 'Refreshing cold espresso with milk and ice',
    price: '৳400',
    category: 'cold drinks',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348',
    available: true
  }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<MenuItem>({
    id: '',
    name: '',
    description: '',
    price: '',
    category: 'food',
    image: '',
    available: true
  });
  const handleAddItem = () => {
    const itemToAdd = {
      ...newItem,
      id: uuidv4(),
      price: `৳${newItem.price}`
    };
    setItems([...items, itemToAdd]);
    setIsModalOpen(false);
    setNewItem({
      id: '',
      name: '',
      description: '',
      price: '',
      category: 'food',
      image: '',
      available: true
    });
  };
  const renderSection = (title: string, category: string) => <div>
      <h3 className="text-xl font-semibold mt-6 mb-2">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.filter(item => item.category === category).map(item => <div key={item.id} className="border p-4 rounded-lg shadow-md">
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg" />
            <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="font-bold mt-2">{item.price}</p>
          </div>)}
      </div>
    </div>;
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Menu Management</h2>
        <button onClick={() => setIsModalOpen(true)} className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add Item
        </button>
      </div>
      {renderSection("Food Menu", "food")}
      {renderSection("Hot Drinks", "hot drinks")}
      {renderSection("Cold Drinks", "cold drinks")}
      {isModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Add New Item</h3>
            <input type="text" placeholder="Item Name" value={newItem.name} onChange={e => setNewItem({
          ...newItem,
          name: e.target.value
        })} className="border p-2 w-full mb-2" />
            <input type="text" placeholder="Description" value={newItem.description} onChange={e => setNewItem({
          ...newItem,
          description: e.target.value
        })} className="border p-2 w-full mb-2" />
            <input type="text" placeholder="Price (BDT)" value={newItem.price} onChange={e => setNewItem({
          ...newItem,
          price: e.target.value
        })} className="border p-2 w-full mb-2" />
            <input type="text" placeholder="Image URL" value={newItem.image} onChange={e => setNewItem({
          ...newItem,
          image: e.target.value
        })} className="border p-2 w-full mb-2" />
            <select value={newItem.category} onChange={e => setNewItem({
          ...newItem,
          category: e.target.value
        })} className="border p-2 w-full mb-2">
              <option value="food">Food</option>
              <option value="hot drinks">Hot Drinks</option>
              <option value="cold drinks">Cold Drinks</option>
            </select>
            <div className="flex justify-between mt-4">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded-lg">
                Cancel
              </button>
              <button onClick={handleAddItem} className="bg-green-600 text-white px-4 py-2 rounded-lg">
                Add Item
              </button>
            </div>
          </div>
        </div>}
    </div>;
}