import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';
import { Coffee, IceCream, Utensils, Search, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CartDrawer from './CartDrawer';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isPopular?: boolean;
  tags?: string[];
}

export const MenuSection: React.FC = () => {
  const { menu, isLoading, error } = useData();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('food');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCartDrawer, setShowCartDrawer] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hot drinks':
        return <Coffee className="w-5 h-5" />;
      case 'cold drinks':
        return <IceCream className="w-5 h-5" />;
      default:
        return <Utensils className="w-5 h-5" />;
    }
  };

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image || '/placeholder-food.jpg',
    });
    setShowCartDrawer(true);
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-yellow-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-4 h-4 bg-yellow-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-4 h-4 bg-yellow-600 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">
            <p className="font-semibold">Error loading menu</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  // Group menu items by category
  const menuByCategory = menu.reduce((acc: Record<string, MenuItem[]>, item: MenuItem) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  // Ensure all categories exist
  const categories = ['food', 'hot drinks', 'cold drinks'];
  categories.forEach(category => {
    if (!menuByCategory[category]) {
      menuByCategory[category] = [];
    }
  });

  // Filter menu items based on search query
  const filteredMenu = menuByCategory[activeTab]?.filter((item: MenuItem) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.tags && item.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <section id="menu" className="py-24 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Menu</h2>
          <div className="w-24 h-1 bg-yellow-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of Colombian coffee and international cuisine
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-col items-center mb-12">
          <div className="inline-flex rounded-xl bg-amber-50 p-2 shadow-inner mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === category
                    ? "bg-yellow-600 text-white shadow-lg transform scale-105"
                    : "text-gray-700 hover:text-yellow-600 hover:bg-amber-100"
                }`}
              >
                {getCategoryIcon(category)}
                <span className="capitalize">
                  {category === "hot drinks" ? "Hot Drinks" : 
                   category === "cold drinks" ? "Cold Drinks" : "Food"}
                </span>
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMenu?.map((item: MenuItem) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {item.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {item.isPopular && (
                    <div className="absolute top-4 right-4 bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Popular
                    </div>
                  )}
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-yellow-600 font-bold text-lg">
                    {formatPrice(item.price)}
                  </span>
                </div>
                {item.tags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-amber-50 text-amber-800 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-6 flex justify-between items-center">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex items-center justify-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-300"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleViewCart}
                    className="text-yellow-600 hover:text-yellow-700 font-medium"
                  >
                    View Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMenu?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No menu items found matching your search.</p>
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={showCartDrawer} onClose={() => setShowCartDrawer(false)} />
    </section>
  );
};