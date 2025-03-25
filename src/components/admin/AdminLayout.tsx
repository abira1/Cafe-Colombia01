import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { Dashboard } from './Dashboard';
import { MenuManager } from './MenuManager';
import { ReviewManager } from './ReviewManager';
import { EventManager } from './EventManager';
import { OfferManager } from './OfferManager';
import { GalleryManager } from './GalleryManager';
import { LoginPage } from './LoginPage';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuth } from '../../context/AuthContext';
export function AdminLayout() {
  const {
    isAuthenticated
  } = useAuth();
  if (!isAuthenticated) {
    return <LoginPage />;
  }
  return <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/dashboard" element={<ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>} />
            <Route path="/menu" element={<ProtectedRoute>
                  <MenuManager />
                </ProtectedRoute>} />
            <Route path="/reviews" element={<ProtectedRoute>
                  <ReviewManager />
                </ProtectedRoute>} />
            <Route path="/events" element={<ProtectedRoute>
                  <EventManager />
                </ProtectedRoute>} />
            <Route path="/offers" element={<ProtectedRoute>
                  <OfferManager />
                </ProtectedRoute>} />
            <Route path="/gallery" element={<ProtectedRoute>
                  <GalleryManager />
                </ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </div>;
}