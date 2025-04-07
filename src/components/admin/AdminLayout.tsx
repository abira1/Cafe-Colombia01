import React from 'react';
import { Outlet, Routes, Route } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { BookingManager } from './BookingManager';
import { ReservationManager } from './ReservationManager';
import { Dashboard } from './Dashboard';
import { MenuManager } from './MenuManager';
import { EventManager } from './EventManager';
import { GalleryManager } from './GalleryManager';
import { OfferManager } from './OfferManager';
import { ReviewManager } from './ReviewManager';
import { Settings } from './Settings';
import { OrderManager } from './OrderManager';
import { LayoutDashboard, Coffee, MessageSquare, Calendar, Tag, Image, Ticket, Table, Settings as SettingsIcon, ShoppingBag } from 'lucide-react';

export const adminRoutes = [
  {
    path: '/admin/dashboard',
    element: <Dashboard />,
    icon: <LayoutDashboard className="w-5 h-5" />,
    label: 'Dashboard'
  },
  {
    path: '/admin/menu',
    element: <MenuManager />,
    icon: <Coffee className="w-5 h-5" />,
    label: 'Menu'
  },
  {
    path: '/admin/events',
    element: <EventManager />,
    icon: <Calendar className="w-5 h-5" />,
    label: 'Events'
  },
  {
    path: '/admin/gallery',
    element: <GalleryManager />,
    icon: <Image className="w-5 h-5" />,
    label: 'Gallery'
  },
  {
    path: '/admin/offers',
    element: <OfferManager />,
    icon: <Tag className="w-5 h-5" />,
    label: 'Offers'
  },
  {
    path: '/admin/reviews',
    element: <ReviewManager />,
    icon: <MessageSquare className="w-5 h-5" />,
    label: 'Reviews'
  },
  {
    path: '/admin/bookings',
    element: <BookingManager />,
    icon: <Ticket className="w-5 h-5" />,
    label: 'Event Bookings'
  },
  {
    path: '/admin/reservations',
    element: <ReservationManager />,
    icon: <Table className="w-5 h-5" />,
    label: 'Table Reservations'
  },
  {
    path: '/admin/orders',
    element: <OrderManager />,
    icon: <ShoppingBag className="w-5 h-5" />,
    label: 'Orders'
  },
  {
    path: '/admin/settings',
    element: <Settings />,
    icon: <SettingsIcon className="w-5 h-5" />,
    label: 'Settings'
  }
];

export function AdminLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-6">
          <Routes>
            {adminRoutes.map((route, index) => (
              <Route key={index} path={route.path.replace('/admin/', '')} element={route.element} />
            ))}
          </Routes>
        </main>
      </div>
    </div>
  );
}