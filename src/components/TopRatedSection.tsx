import React from 'react';
import { Star } from 'lucide-react';
export function TopRatedSection() {
  const topItems = [{
    name: 'Hazelnut Mocha',
    type: 'espresso',
    rating: 4.9,
    image: 'https://i.pinimg.com/736x/20/e3/5b/20e35b52a9754514b46e54717f058e28.jpg',
    price: 'BDT 445'
  }, {
    name: 'Tiramisu Frappe',
    type: 'Food',
    rating: 4.8,
    image: 'https://i.pinimg.com/736x/60/76/28/607628e3e546f9617eec016933275a7b.jpg',
    price: 'BDT 565'
  }, {
    name: 'Caramel Macchiato',
    type: 'Dessert',
    rating: 4.9,
    image: 'https://i.pinimg.com/736x/7f/7c/0a/7f7c0a441577459d9a0a01ee28b59cc5.jpg',
    price: 'BDT 495'
  }];
  return <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Top Rated Items
          </h2>
          <div className="w-24 h-1 bg-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Our customers' favorites</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topItems.map((item, index) => <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-600">{item.type}</p>
                  </div>
                  <span className="text-yellow-600 font-bold">
                    {item.price}
                  </span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-2 font-medium">{item.rating}/5.0</span>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
}