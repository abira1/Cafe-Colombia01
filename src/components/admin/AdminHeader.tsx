import React, { useState } from 'react';
import { LogOut, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
export function AdminHeader() {
  const {
    logout
  } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = () => {
    logout();
    navigate('/admin');
  };
  return <header className="bg-white shadow-sm">
      <div className="px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
        
        {/* Admin Dropdown */}
        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
            <User className="w-5 h-5" />
            <span>Admin</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {menuOpen && <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md">
              <button onClick={() => navigate('/admin/settings')} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                Change Password
              </button>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">
                Logout
              </button>
            </div>}
        </div>
      </div>
    </header>;
}