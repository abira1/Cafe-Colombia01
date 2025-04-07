import React from 'react';
import { Tag } from 'lucide-react';
import { useData } from '../context/DataContext';

export function SpecialOffers() {
  const { offers } = useData();
  const activeOffers = offers.filter(offer => {
    const isActive = offer.active;
    const isValid = new Date(offer.validUntil) >= new Date();
    return isActive && isValid;
  });

  return (
    <section className="py-16 bg-[#FFFBF5]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Special Offers</h2>
          <div className="h-1 w-24 bg-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Don't miss out on our amazing deals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeOffers.map(offer => (
            <div key={offer.id} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-24 h-24 rounded-full bg-yellow-600 flex items-center justify-center mb-6 overflow-hidden">
                {offer.iconUrl ? (
                  <img 
                    src={offer.iconUrl} 
                    alt={offer.title}
                    className="w-16 h-16 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; // Prevent infinite loop
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const fallbackIcon = document.createElement('div');
                        fallbackIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>';
                        parent.appendChild(fallbackIcon.firstChild as Node);
                      }
                    }}
                  />
                ) : (
                  <Tag className="w-12 h-12 text-white" strokeWidth={2} />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-3">{offer.title}</h3>
              <p className="text-gray-700 mb-4 font-medium">{offer.description}</p>
              <p className="text-yellow-600 font-medium">{offer.availability}</p>
              <p className="text-sm text-gray-500 mt-2">
                Valid until: {new Date(offer.validUntil).toLocaleDateString()}
              </p>
            </div>
          ))}

          {activeOffers.length === 0 && (
            <div className="col-span-full text-center text-gray-500 p-8 bg-white rounded-lg">
              No special offers available at the moment.
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 