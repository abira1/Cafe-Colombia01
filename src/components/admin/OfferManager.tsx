import React, { useState } from 'react';
import { Pencil, Trash2, Tag, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { v4 as uuidv4 } from 'uuid';

interface Offer {
  id: string;
  title: string;
  description: string;
  iconUrl?: string;
  availability: string;
  validUntil: string;
  active: boolean;
}

export function OfferManager() {
  const { offers, updateOffers } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [offerData, setOfferData] = useState<Offer>({
    id: '',
    title: '',
    description: '',
    iconUrl: '',
    availability: '',
    validUntil: new Date().toISOString().split('T')[0],
    active: true
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingOffer) {
      // Update existing offer
      const updatedOffers = offers.map(offer =>
        offer.id === editingOffer.id ? offerData : offer
      );
      updateOffers(updatedOffers);
    } else {
      // Add new offer
      const newOffer = {
        ...offerData,
        id: uuidv4()
      };
      updateOffers([...offers, newOffer]);
    }
    
    setShowForm(false);
    setEditingOffer(null);
    setOfferData({
      id: '',
      title: '',
      description: '',
      iconUrl: '',
      availability: '',
      validUntil: new Date().toISOString().split('T')[0],
      active: true
    });
  };

  const handleDelete = (offerId: string) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      const updatedOffers = offers.filter(offer => offer.id !== offerId);
      updateOffers(updatedOffers);
    }
  };

  const handleEdit = (offer: Offer) => {
    setEditingOffer(offer);
    setOfferData(offer);
    setShowForm(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOfferData({ ...offerData, iconUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Offer Management</h2>
        <button
          onClick={() => {
            setEditingOffer(null);
            setOfferData({
              id: '',
              title: '',
              description: '',
              iconUrl: '',
              availability: '',
              validUntil: new Date().toISOString().split('T')[0],
              active: true
            });
            setShowForm(true);
          }}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
        >
          Add New Offer
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingOffer ? 'Edit Offer' : 'Add New Offer'}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingOffer(null);
                  setOfferData({
                    id: '',
                    title: '',
                    description: '',
                    iconUrl: '',
                    availability: '',
                    validUntil: new Date().toISOString().split('T')[0],
                    active: true
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
                  value={offerData.title}
                  onChange={(e) => setOfferData({ ...offerData, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={offerData.description}
                  onChange={(e) => setOfferData({ ...offerData, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Icon</label>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                  />
                </div>
                {offerData.iconUrl && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={offerData.iconUrl} alt="Preview" className="w-10 h-10 object-contain" />
                    <button
                      type="button"
                      onClick={() => setOfferData({ ...offerData, iconUrl: '' })}
                      className="text-red-600 text-sm hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Valid Until</label>
                <input
                  type="date"
                  value={offerData.validUntil}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setOfferData({ ...offerData, validUntil: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Availability</label>
                <input
                  type="text"
                  value={offerData.availability}
                  onChange={(e) => setOfferData({ ...offerData, availability: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  placeholder="e.g., '8 PM - 1 AM' or 'Weekdays'"
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={offerData.active}
                  onChange={(e) => setOfferData({ ...offerData, active: e.target.checked })}
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">Active</label>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingOffer(null);
                    setOfferData({
                      id: '',
                      title: '',
                      description: '',
                      iconUrl: '',
                      availability: '',
                      validUntil: new Date().toISOString().split('T')[0],
                      active: true
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

      <div className="bg-white rounded-lg shadow">
        {offers.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No offers found.</div>
        ) : (
          offers.map(offer => (
            <div key={offer.id} className="border-b last:border-b-0 p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{offer.title}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      offer.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {offer.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>{offer.description}</p>
                    <p>Availability: {offer.availability}</p>
                    <p>Valid Until: {new Date(offer.validUntil).toLocaleDateString()}</p>
                    {offer.iconUrl && (
                      <div className="mt-2">
                        <img src={offer.iconUrl} alt={offer.title} className="w-10 h-10 object-contain" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(offer)}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Edit"
                  >
                    <Pencil className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(offer.id)}
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