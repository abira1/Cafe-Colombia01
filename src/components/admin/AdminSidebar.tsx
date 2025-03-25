import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Coffee, MessageSquare, Calendar, Tag, Image } from 'lucide-react';
export function AdminSidebar() {
  const location = useLocation();
  const menuItems = [{
    path: '/admin/dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard'
  }, {
    path: '/admin/menu',
    icon: Coffee,
    label: 'Menu'
  }, {
    path: '/admin/reviews',
    icon: MessageSquare,
    label: 'Reviews'
  }, {
    path: '/admin/events',
    icon: Calendar,
    label: 'Events'
  }, {
    path: '/admin/offers',
    icon: Tag,
    label: 'Offers'
  }, {
    path: '/admin/gallery',
    icon: Image,
    label: 'Gallery'
  }];
  return <aside className="w-64 bg-white shadow-md min-h-screen">
      <div className="p-6 flex flex-col items-center">
        {/* Logo Instead of Name */}
        <img src="https://i.postimg.cc/kgZ6ttTH/images-removebg-preview.png" alt="Café Colombia Logo" className="h-16 w-auto" />
        <p className="text-sm text-gray-600 mt-2">Cafe Colombia</p>
      </div>
      <nav className="mt-6">
        {menuItems.map(item => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return <Link key={item.path} to={item.path} className={`flex items-center px-6 py-3 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors ${isActive ? 'bg-yellow-50 text-yellow-600 border-r-4 border-yellow-600' : ''}`}>
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>;
      })}
      </nav>
    </aside>;
}