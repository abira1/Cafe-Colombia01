import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { LoginPage } from './components/admin/LoginPage';
import { Website } from './components/Website';
import { AdminLayout } from './components/admin/AdminLayout';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { NotificationContainer } from './components/admin/NotificationContainer';
import { SettingsProvider } from './context/SettingsContext';
import { DataProvider } from './context/DataContext';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider } from './context/AuthContext';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';

export function App() {
  return (
    <AuthProvider>
      <Router>
        <SettingsProvider>
          <DataProvider>
            <NotificationProvider>
              <CartProvider>
                <Toaster position="top-right" />
                <NotificationContainer />
                <Routes>
                  {/* Website Routes */}
                  <Route path="/" element={<Website />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />

                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<LoginPage />} />
                  <Route
                    path="/admin/*"
                    element={
                      <ProtectedRoute>
                        <AdminLayout />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </CartProvider>
            </NotificationProvider>
          </DataProvider>
        </SettingsProvider>
      </Router>
    </AuthProvider>
  );
}