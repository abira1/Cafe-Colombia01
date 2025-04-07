import React, { useState } from 'react';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';
import { 
  Shield, 
  Bell, 
  User, 
  Database, 
  Download,
  Trash2,
  Save,
  Key,
  Mail,
  BellRing,
  ShoppingCart,
  Star,
  Settings as SettingsIcon,
  ChevronRight,
  Calendar,
  Table
} from 'lucide-react';

export function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const { addNotification } = useNotification();
  const { updatePassword } = useAuth();
  const { 
    profile, 
    notifications, 
    updateProfile, 
    updateNotificationSettings,
    exportAllData,
    exportReservations,
    exportEventData,
    cleanupData
  } = useSettings();

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [profileData, setProfileData] = useState(profile);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      addNotification({
        type: 'error',
        message: 'New passwords do not match',
        duration: 3000
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      addNotification({
        type: 'error',
        message: 'Password must be at least 6 characters long',
        duration: 3000
      });
      return;
    }

    try {
      await updatePassword(passwordData.currentPassword, passwordData.newPassword);
      addNotification({
        type: 'success',
        message: 'Password updated successfully',
        duration: 3000
      });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Failed to update password. Please check your current password.',
        duration: 3000
      });
    }
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileData);
    addNotification({
      type: 'success',
      message: 'Profile updated successfully',
      duration: 3000
    });
  };

  const handleNotificationSettingsChange = (setting: keyof typeof notifications) => {
    const newSettings = {
      ...notifications,
      [setting]: !notifications[setting]
    };
    updateNotificationSettings(newSettings);
    addNotification({
      type: 'success',
      message: 'Notification settings updated',
      duration: 3000
    });
  };

  const handleDataCleanup = () => {
    if (window.confirm('Are you sure you want to clean up data? This action cannot be undone.')) {
      cleanupData();
      addNotification({
        type: 'success',
        message: 'Data cleaned up successfully',
        duration: 3000
      });
    }
  };

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'data', label: 'Data', icon: Database }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center mb-8">
        <SettingsIcon className="w-8 h-8 text-yellow-600 mr-3" />
        <div>
          <h2 className="text-2xl font-semibold">Settings</h2>
          <p className="text-gray-500">Manage your account settings and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-4">
            <nav className="space-y-1">
              {settingsTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-yellow-50 text-yellow-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className="w-5 h-5 mr-3" />
                      <span>{tab.label}</span>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${
                      activeTab === tab.id ? 'rotate-90' : ''
                    }`} />
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Profile Information</h3>
                      <p className="text-gray-500">Update your personal information</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </button>
                  </div>
                </form>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                      <Key className="w-10 h-10 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Security Settings</h3>
                      <p className="text-gray-500">Manage your password and security preferences</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Update Password
                    </button>
                  </div>
                </form>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                      <Bell className="w-10 h-10 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Notification Preferences</h3>
                      <p className="text-gray-500">Manage how you receive notifications</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <h3 className="font-medium">Email Notifications</h3>
                          <p className="text-sm text-gray-500">Receive notifications via email</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.emailNotifications}
                          onChange={() => handleNotificationSettingsChange('emailNotifications')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <BellRing className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <h3 className="font-medium">Push Notifications</h3>
                          <p className="text-sm text-gray-500">Receive push notifications</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.pushNotifications}
                          onChange={() => handleNotificationSettingsChange('pushNotifications')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <ShoppingCart className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <h3 className="font-medium">Order Updates</h3>
                          <p className="text-sm text-gray-500">Get notified about order updates</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.orderUpdates}
                          onChange={() => handleNotificationSettingsChange('orderUpdates')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <h3 className="font-medium">Review Notifications</h3>
                          <p className="text-sm text-gray-500">Get notified about new reviews</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.reviewNotifications}
                          onChange={() => handleNotificationSettingsChange('reviewNotifications')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Data Tab */}
              {activeTab === 'data' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                      <Database className="w-10 h-10 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Data Management</h3>
                      <p className="text-gray-500">Export and manage your data</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 bg-gray-50 rounded-lg">
                      <div className="flex items-center mb-4">
                        <Download className="w-6 h-6 text-yellow-600 mr-2" />
                        <h3 className="font-medium">Export All Data</h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        Export all your data including settings, reservations, and events.
                      </p>
                      <button 
                        onClick={exportAllData}
                        className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export All
                      </button>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-lg">
                      <div className="flex items-center mb-4">
                        <Table className="w-6 h-6 text-yellow-600 mr-2" />
                        <h3 className="font-medium">Export Reservations</h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        Export all table reservations data.
                      </p>
                      <button 
                        onClick={exportReservations}
                        className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export Reservations
                      </button>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-lg">
                      <div className="flex items-center mb-4">
                        <Calendar className="w-6 h-6 text-yellow-600 mr-2" />
                        <h3 className="font-medium">Export Events</h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        Export all events and event bookings data.
                      </p>
                      <button 
                        onClick={exportEventData}
                        className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export Events
                      </button>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-lg">
                      <div className="flex items-center mb-4">
                        <Trash2 className="w-6 h-6 text-red-600 mr-2" />
                        <h3 className="font-medium">Clean Up Data</h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        Clean up old or unused data to optimize performance.
                      </p>
                      <button 
                        onClick={handleDataCleanup}
                        className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clean Up
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 