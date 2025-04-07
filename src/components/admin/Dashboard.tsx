import React from 'react';
import { Coffee, Users, Calendar, Star, TrendingUp, ShoppingCart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useData } from '../../context/DataContext';

export function Dashboard() {
  const { menu, events, reviews, isLoading, error } = useData();

  if (isLoading) {
    return <div className="text-center">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  const stats = [
    {
      label: 'Total Menu Items',
      value: menu.length,
      icon: Coffee,
      change: `${menu.length} items available`
    },
    {
      label: 'Active Events',
      value: events.length,
      icon: Calendar,
      change: `${events.length} upcoming events`
    },
    {
      label: 'Customer Reviews',
      value: reviews.length,
      icon: Star,
      change: `${reviews.length} total reviews`
    },
    {
      label: 'Average Rating',
      value: reviews.length > 0 
        ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
        : '0.0',
      icon: Star,
      change: 'Based on all reviews'
    }
  ];

  const visitorData = [
    { day: 'Mon', visitors: 150 },
    { day: 'Tue', visitors: 180 },
    { day: 'Wed', visitors: 220 },
    { day: 'Thu', visitors: 200 },
    { day: 'Fri', visitors: 250 },
    { day: 'Sat', visitors: 300 },
    { day: 'Sun', visitors: 280 }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Icon className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visitor Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Weekly Visitors</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#EAB308"
                strokeWidth={2}
                dot={{ fill: '#EAB308', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Recent Reviews</h2>
        <div className="space-y-4">
          {reviews.slice(0, 5).map((review) => (
            <div key={review.id} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 font-semibold">
                    {review.name.charAt(0)}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{review.name}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mt-1">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-1">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}