import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { adminRoutes } from './AdminLayout';

export function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen">
      <div className="p-6 flex flex-col items-center">
        <img 
          src="https://i.postimg.cc/kgZ6ttTH/images-removebg-preview.png" 
          alt="Café Colombia Logo" 
          className="h-16 w-auto" 
        />
        <p className="text-sm text-gray-600 mt-2">Cafe Colombia</p>
      </div>
      <nav className="mt-6">
        {adminRoutes.map((route, index) => {
          const isActive = location.pathname === route.path;
          return (
            <Link
              key={index}
              to={route.path}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors ${
                isActive ? 'bg-yellow-50 text-yellow-600 border-r-4 border-yellow-600' : ''
              }`}
            >
              {route.icon}
              <span className="ml-3">{route.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}