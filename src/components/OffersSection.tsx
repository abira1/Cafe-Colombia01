import React from 'react';
import { Clock, Coffee, Tag } from 'lucide-react';
export function OffersSection() {
  const offers = [{
    title: 'Happy Hour',
    description: 'BUY 1 CLASSIC COFFEE\nGET ONE FREE',
    time: '8 PM - 1 AM',
    icon: Clock
  }, {
    title: 'Student Special',
    description: '20% off with valid student ID',
    time: 'All day',
    icon: Tag
  }, {
    title: 'Coffee Bundle',
    description: 'Buy 2 coffees, get 1 pastry free',
    time: 'Weekdays',
    icon: Coffee
  }];
  return <section className="py-20 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Special Offers
          </h2>
          <div className="w-24 h-1 bg-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Don't miss out on our amazing deals
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, index) => {
          const Icon = offer.icon;
          return <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-yellow-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{offer.title}</h3>
                <p className="text-gray-600 mb-4 whitespace-pre-line">
                  {offer.description}
                </p>
                <p className="text-yellow-600 font-medium">{offer.time}</p>
              </div>;
        })}
        </div>
      </div>
    </section>;
}