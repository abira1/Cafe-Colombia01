import React, { useState } from 'react';
export function MenuSection() {
  const [activeTab, setActiveTab] = useState('food');
  const menuItems = {
    food: [{
      name: 'English Breakfast',
      description: 'A hearty breakfast with eggs, toast, and sausages',
      price: 'BDT 695'
    }, {
      name: 'Smoked Chicken Croissant',
      description: 'Flaky croissant filled with smoked chicken',
      price: 'BDT 555'
    }, {
      name: 'Easy Breakfast',
      description: 'Simple and delicious breakfast combo',
      price: 'BDT 325'
    }, {
      name: 'Grilled Tomato',
      description: 'Juicy tomatoes grilled to perfection',
      price: 'BDT 30'
    }, {
      name: 'Butter Sachet',
      description: 'A portion of creamy butter',
      price: 'BDT 65'
    }, {
      name: 'Egg (In any Style)',
      description: 'Cooked to your preference',
      price: 'BDT 75'
    }, {
      name: 'Garlic Toast',
      description: 'Crispy toast with garlic butter',
      price: 'BDT 75'
    }, {
      name: 'Baked Beans',
      description: 'Slow-cooked beans in tomato sauce',
      price: 'BDT 125'
    }, {
      name: 'Grilled Mushroom',
      description: 'Flavorful grilled mushrooms',
      price: 'BDT 125'
    }, {
      name: 'Chicken Chorizo Sausage',
      description: 'Spicy chicken sausage',
      price: 'BDT 150'
    }, {
      name: 'Chicken Bacon',
      description: 'Crispy and savory chicken bacon',
      price: 'BDT 165'
    }, {
      name: 'Sautéed Mushroom',
      description: 'Mushrooms sautéed with garlic and herbs',
      price: 'BDT 350'
    }, {
      name: 'Bruschetta',
      description: 'Toasted bread topped with fresh tomatoes',
      price: 'BDT 275'
    }, {
      name: 'French Fries',
      description: 'Crispy golden fries',
      price: 'BDT 260'
    }, {
      name: 'Potato Wedges',
      description: 'Thick-cut seasoned potato wedges',
      price: 'BDT 280'
    }, {
      name: 'Calamari Rings',
      description: 'Crispy fried squid rings',
      price: 'BDT 605'
    }, {
      name: 'Potato Ring with Chicken',
      description: 'Potato rings served with chicken',
      price: 'BDT 295'
    }, {
      name: 'Fish Finger',
      description: 'Crispy breaded fish fillets',
      price: 'BDT 395'
    }, {
      name: 'Chicken Lollipop',
      description: 'Spicy deep-fried chicken drumettes',
      price: 'BDT 300'
    }, {
      name: 'Crispy Wings (Hot/Spicy)',
      description: 'Crispy chicken wings with hot sauce',
      price: 'BDT 355'
    }, {
      name: 'Thai Style Salad',
      description: 'Spicy and tangy Thai-inspired salad',
      price: 'BDT 275'
    }, {
      name: 'Garden Salad',
      description: 'Fresh vegetables with house dressing',
      price: 'BDT 295'
    }, {
      name: 'Salad in Skewer',
      description: 'Salad served on skewers',
      price: 'BDT 355'
    }, {
      name: 'Chicken Cheese Burger',
      description: 'Juicy chicken patty with cheese',
      price: 'BDT 425'
    }, {
      name: 'Beef Cheese Burger',
      description: 'Classic beef burger with melted cheese',
      price: 'BDT 520'
    }, {
      name: 'Cajun Cheese Burger',
      description: 'Spicy Cajun-style burger',
      price: 'BDT 675'
    }, {
      name: 'Mexican Cheese Burger',
      description: 'Burger with a Mexican twist',
      price: 'BDT 695'
    }, {
      name: 'Grilled Chicken Sandwich',
      description: 'Grilled chicken with fresh veggies',
      price: 'BDT 575'
    }, {
      name: 'Smoked Chicken Sandwich',
      description: 'Smoked chicken with tangy sauce',
      price: 'BDT 575'
    }, {
      name: 'Croissant Sandwich',
      description: 'Flaky croissant filled with deli meats',
      price: 'BDT 580'
    }, {
      name: 'Club Sandwich',
      description: 'Layered sandwich with meats and veggies',
      price: 'BDT 650'
    }, {
      name: 'Creamy Spaghetti',
      description: 'Spaghetti in a creamy sauce',
      price: 'BDT 420'
    }, {
      name: 'Spaghetti Marinara',
      description: 'Spaghetti in rich tomato sauce',
      price: 'BDT 420'
    }, {
      name: 'Spaghetti Carbonara',
      description: 'Classic pasta with bacon and cheese',
      price: 'BDT 575'
    }, {
      name: 'Sicilian Style Spaghetti',
      description: 'Pasta with a Sicilian touch',
      price: 'BDT 855'
    }, {
      name: 'Spaghetti Seafood',
      description: 'Pasta with fresh seafood',
      price: 'BDT 975'
    }],
    hotDrinks: [{
      name: 'Espresso',
      description: 'Strong and rich coffee shot',
      price: 'BDT 195'
    }, {
      name: 'Chocolate Espresso',
      description: 'Espresso with a chocolate twist',
      price: 'BDT 335'
    }, {
      name: 'Macchiato',
      description: 'Espresso topped with milk foam',
      price: 'BDT 275'
    }, {
      name: 'Café Latte',
      description: 'Smooth and creamy coffee',
      price: 'BDT 230'
    }],
    coldDrinks: [{
      name: 'Vanilla Frappe',
      description: 'Icy vanilla blended drink',
      price: 'BDT 475'
    }, {
      name: 'Caramel Frappe',
      description: 'Sweet caramel blended coffee',
      price: 'BDT 545'
    }, {
      name: 'Iced Americano',
      description: 'Chilled black coffee',
      price: 'BDT 195'
    }, {
      name: 'Strawberry Smoothie',
      description: 'Refreshing strawberry blend',
      price: 'BDT 475'
    }]
  };
  return <section id="menu" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Menu</h2>
          <div className="w-24 h-1 bg-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Discover our delicious offerings</p>
        </div>
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg bg-gray-100 p-1">
            <button onClick={() => setActiveTab('food')} className={`px-4 py-2 rounded-lg ${activeTab === 'food' ? 'bg-yellow-600 text-white' : 'text-gray-700 hover:text-yellow-600'}`}>
              Food
            </button>
            <button onClick={() => setActiveTab('hotDrinks')} className={`px-4 py-2 rounded-lg ${activeTab === 'hotDrinks' ? 'bg-yellow-600 text-white' : 'text-gray-700 hover:text-yellow-600'}`}>
              Hot Drinks
            </button>
            <button onClick={() => setActiveTab('coldDrinks')} className={`px-4 py-2 rounded-lg ${activeTab === 'coldDrinks' ? 'bg-yellow-600 text-white' : 'text-gray-700 hover:text-yellow-600'}`}>
              Cold Drinks
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems[activeTab as keyof typeof menuItems].map((item, index) => <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {item.description}
                  </p>
                </div>
                <span className="text-yellow-600 font-bold">{item.price}</span>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
}