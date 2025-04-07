import React from 'react';
import { useData } from '../context/DataContext';
import { Tag } from 'lucide-react';

export function OffersSection() {
  const { offers, isLoading, error } = useData();

  if (isLoading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">Loading offers...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600">Error loading offers. Please try again later.</div>
        </div>
      </div>
    );
  }

  const activeOffers = offers.filter(offer => offer.active);

  if (activeOffers.length === 0) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">No active offers at the moment.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Special Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeOffers.map(offer => (
            <div key={offer.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {offer.image && (
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-5 h-5 text-yellow-600" />
                  <span className="text-yellow-600 font-semibold">{offer.discount}% OFF</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                <div className="text-sm text-gray-500">
                  Valid until: {new Date(offer.validUntil).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}