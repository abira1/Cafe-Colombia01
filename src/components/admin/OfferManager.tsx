import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Check, X, Image as ImageIcon } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  validUntil: string;
  image: string;
  active: boolean;
}
export function OfferManager() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [newOffer, setNewOffer] = useState({
    title: '',
    description: '',
    discount: '',
    validUntil: '',
    image: '',
    active: true
  });
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

  // Handle Image Upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, isEditing = false) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (isEditing && editingOffer) {
          setEditingOffer({
            ...editingOffer,
            image: reader.result as string
          });
        } else {
          setNewOffer({
            ...newOffer,
            image: reader.result as string
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Offer
  const addOffer = () => {
    if (!newOffer.title || !newOffer.description || !newOffer.discount || !newOffer.validUntil || !newOffer.image) return;
    setOffers([...offers, {
      id: uuidv4(),
      ...newOffer,
      discount: Number(newOffer.discount)
    }]);
    setNewOffer({
      title: '',
      description: '',
      discount: '',
      validUntil: '',
      image: '',
      active: true
    });
  };

  // Delete Offer
  const deleteOffer = (id: string) => {
    setOffers(offers.filter(offer => offer.id !== id));
  };

  // Toggle Offer Status
  const toggleOfferStatus = (id: string) => {
    setOffers(offers.map(offer => offer.id === id ? {
      ...offer,
      active: !offer.active
    } : offer));
  };

  // Start Editing
  const startEditing = (offer: Offer) => {
    setEditingOffer(offer);
  };

  // Save Edited Offer
  const saveEditedOffer = () => {
    if (!editingOffer) return;
    setOffers(offers.map(offer => offer.id === editingOffer.id ? editingOffer : offer));
    setEditingOffer(null);
  };
  return <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Offer Management</h2>

      {/* Offer Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Add New Offer</h3>
        <div className="grid grid-cols-4 gap-4">
          <input type="text" placeholder="Title" className="border rounded px-3 py-2" value={newOffer.title} onChange={e => setNewOffer({
          ...newOffer,
          title: e.target.value
        })} />
          <input type="text" placeholder="Description" className="border rounded px-3 py-2" value={newOffer.description} onChange={e => setNewOffer({
          ...newOffer,
          description: e.target.value
        })} />
          <input type="number" placeholder="Discount %" className="border rounded px-3 py-2" value={newOffer.discount} onChange={e => setNewOffer({
          ...newOffer,
          discount: e.target.value
        })} />
          <input type="date" className="border rounded px-3 py-2" value={newOffer.validUntil} onChange={e => setNewOffer({
          ...newOffer,
          validUntil: e.target.value
        })} />
          <label className="border rounded px-3 py-2 flex items-center cursor-pointer">
            <ImageIcon className="w-5 h-5 mr-2" /> Upload Image
            <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e)} />
          </label>
          {newOffer.image && <img src={newOffer.image} alt="Offer" className="h-16 w-16 rounded border" />}
          <button onClick={addOffer} className="bg-green-600 text-white px-4 py-2 rounded flex items-center">
            <Plus className="w-4 h-4 mr-2" /> Add Offer
          </button>
        </div>
      </div>

      {/* Offer List */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Existing Offers</h3>
        {offers.length === 0 ? <p className="text-gray-600">No offers available.</p> : <ul className="divide-y">
            {offers.map(offer => <li key={offer.id} className="flex justify-between items-center py-3">
                <div>
                  <h4 className="font-semibold">{offer.title}</h4>
                  <p className="text-sm text-gray-600">{offer.description}</p>
                  <p className="text-sm">Discount: {offer.discount}% | Valid Until: {offer.validUntil}</p>
                  {offer.image && <img src={offer.image} alt={offer.title} className="h-16 w-16 rounded border mt-2" />}
                  <span className={`px-2 py-1 text-sm rounded ${offer.active ? 'bg-green-200 text-green-800' : 'bg-gray-300 text-gray-800'}`}>
                    {offer.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <button onClick={() => toggleOfferStatus(offer.id)} className="text-green-600">
                    {offer.active ? <X className="w-5 h-5" /> : <Check className="w-5 h-5" />}
                  </button>
                  <button onClick={() => startEditing(offer)} className="text-blue-600">
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button onClick={() => deleteOffer(offer.id)} className="text-red-600">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </li>)}
          </ul>}
      </div>

      {/* Edit Offer Modal */}
      {editingOffer && <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Edit Offer</h3>
            <input type="text" placeholder="Title" className="border rounded w-full px-3 py-2 mb-3" value={editingOffer.title} onChange={e => setEditingOffer({
          ...editingOffer,
          title: e.target.value
        })} />
            <input type="text" placeholder="Description" className="border rounded w-full px-3 py-2 mb-3" value={editingOffer.description} onChange={e => setEditingOffer({
          ...editingOffer,
          description: e.target.value
        })} />
            <input type="number" placeholder="Discount %" className="border rounded w-full px-3 py-2 mb-3" value={editingOffer.discount} onChange={e => setEditingOffer({
          ...editingOffer,
          discount: Number(e.target.value)
        })} />
            <input type="date" className="border rounded w-full px-3 py-2 mb-3" value={editingOffer.validUntil} onChange={e => setEditingOffer({
          ...editingOffer,
          validUntil: e.target.value
        })} />
            <label className="border rounded px-3 py-2 flex items-center cursor-pointer mb-3">
              <ImageIcon className="w-5 h-5 mr-2" /> Upload Image
              <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, true)} />
            </label>
            {editingOffer.image && <img src={editingOffer.image} alt="Offer" className="h-16 w-16 rounded border" />}
            <button onClick={saveEditedOffer} className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-3">Save</button>
          </div>
        </div>}
    </div>;
}