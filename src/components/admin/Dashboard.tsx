import React, { useState, useEffect } from 'react';
import { Coffee, Users, Calendar, Star, TrendingUp, ShoppingCart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
export function Dashboard() {
  const [menuItems, setMenuItems] = useState(24);
  const [visitors, setVisitors] = useState(180);
  const [sales, setSales] = useState(52);
  const [reviews, setReviews] = useState(128);
  useEffect(() => {
    // Simulating live data updates
    const interval = setInterval(() => {
      setVisitors(prev => prev + Math.floor(Math.random() * 10 - 5));
      setSales(prev => prev + Math.floor(Math.random() * 5));
      setReviews(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const stats = [{
    label: 'Total Menu Items',
    value: menuItems,
    icon: Coffee,
    change: '+2 this week'
  }, {
    label: 'Active Events',
    value: '3',
    icon: Calendar,
    change: '1 upcoming'
  }, {
    label: 'Customer Reviews',
    value: reviews,
    icon: Star,
    change: '+12 this month'
  }, {
    label: 'Daily Visitors',
    value: visitors,
    icon: Users,
    change: '+5% vs last week'
  }, {
    label: 'Total Sales',
    value: `${sales} orders`,
    icon: ShoppingCart,
    change: '+8% growth'
  }];
  const visitorData = [{
    day: 'Mon',
    visitors: 150
  }, {
    day: 'Tue',
    visitors: 180
  }, {
    day: 'Wed',
    visitors: 200
  }, {
    day: 'Thu',
    visitors: 175
  }, {
    day: 'Fri',
    visitors: 190
  }, {
    day: 'Sat',
    visitors: 220
  }, {
    day: 'Sun',
    visitors: 240
  }];
  return <div>
      <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        {stats.map((stat, index) => {
        const Icon = stat.icon;
        return <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Icon className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-sm text-gray-500">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>;
      })}
      </div>

      {/* Performance Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitors Trend Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Visitor Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={visitorData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="visitors" stroke="#F59E0B" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <ul className="space-y-3">
            <li className="flex justify-between text-gray-700">
              <span>Latte</span>
              <span className="text-green-600">BDT 250</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span>Cappuccino</span>
              <span className="text-green-600">BDT 280</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span>Cold Brew</span>
              <span className="text-green-600">BDT 300</span>
            </li>
            <li className="flex justify-between text-gray-700">
              <span>Espresso</span>
              <span className="text-green-600">BDT 200</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Customer Reviews and Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Recent Reviews */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>
          <ul className="space-y-3">
            <li className="border-b pb-2">
              <p className="text-gray-700">
                <strong>John D.</strong>: "Loved the cappuccino! Perfect blend."
              </p>
              <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
            </li>
            <li className="border-b pb-2">
              <p className="text-gray-700">
                <strong>Emma R.</strong>: "Great ambiance and amazing coffee."
              </p>
              <span className="text-yellow-500">⭐⭐⭐⭐</span>
            </li>
            <li>
              <p className="text-gray-700">
                <strong>Michael S.</strong>: "Espresso could be a little stronger."
              </p>
              <span className="text-yellow-500">⭐⭐⭐⭐</span>
            </li>
          </ul>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
          <ul className="space-y-3">
            <li className="border-b pb-2">
              <p className="text-gray-700">
                <strong>Live Jazz Night</strong> - March 25, 7:00 PM
              </p>
            </li>
            <li className="border-b pb-2">
              <p className="text-gray-700">
                <strong>Barista Workshop</strong> - March 28, 3:00 PM
              </p>
            </li>
            <li>
              <p className="text-gray-700">
                <strong>New Summer Menu Launch</strong> - April 2, 12:00 PM
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>;
}