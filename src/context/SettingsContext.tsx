import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as XLSX from 'xlsx';

interface ProfileSettings {
  name: string;
  email: string;
  phone: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  orderUpdates: boolean;
  reviewNotifications: boolean;
}

interface SettingsContextType {
  profile: ProfileSettings;
  notifications: NotificationSettings;
  updateProfile: (profile: ProfileSettings) => void;
  updateNotificationSettings: (settings: NotificationSettings) => void;
  exportAllData: () => void;
  exportReservations: () => void;
  exportEventData: () => void;
  cleanupData: () => void;
}

const defaultProfile: ProfileSettings = {
  name: 'Admin',
  email: 'admin@cafecolombia.com',
  phone: '+1234567890'
};

const defaultNotificationSettings: NotificationSettings = {
  emailNotifications: true,
  pushNotifications: true,
  orderUpdates: true,
  reviewNotifications: true
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileSettings>(() => {
    const savedProfile = localStorage.getItem('adminProfile');
    return savedProfile ? JSON.parse(savedProfile) : defaultProfile;
  });

  const [notifications, setNotifications] = useState<NotificationSettings>(() => {
    const savedNotifications = localStorage.getItem('notificationSettings');
    return savedNotifications ? JSON.parse(savedNotifications) : defaultNotificationSettings;
  });

  useEffect(() => {
    localStorage.setItem('adminProfile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('notificationSettings', JSON.stringify(notifications));
  }, [notifications]);

  const updateProfile = (newProfile: ProfileSettings) => {
    setProfile(newProfile);
  };

  const updateNotificationSettings = (newSettings: NotificationSettings) => {
    setNotifications(newSettings);
  };

  const exportToExcel = (data: any[], sheetName: string, fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const formatReservationData = (reservations: any[]) => {
    return reservations.map(reservation => ({
      'Reservation ID': reservation.id,
      'Customer Name': reservation.customerName,
      'Date': new Date(reservation.date).toLocaleDateString(),
      'Time': reservation.time,
      'Number of People': reservation.numberOfPeople,
      'Status': reservation.status,
      'Contact Number': reservation.contactNumber,
      'Special Requests': reservation.specialRequests || '-'
    }));
  };

  const formatEventData = (events: any[], bookings: any[]) => {
    const formattedEvents = events.map(event => ({
      'Event ID': event.id,
      'Event Name': event.name,
      'Date': new Date(event.date).toLocaleDateString(),
      'Time': event.time,
      'Capacity': event.capacity,
      'Price': event.price,
      'Description': event.description,
      'Status': event.status
    }));

    const formattedBookings = bookings.map(booking => ({
      'Booking ID': booking.id,
      'Event ID': booking.eventId,
      'Customer Name': booking.customerName,
      'Number of Tickets': booking.numberOfTickets,
      'Total Amount': booking.totalAmount,
      'Status': booking.status,
      'Contact Number': booking.contactNumber
    }));

    return {
      events: formattedEvents,
      bookings: formattedBookings
    };
  };

  const exportAllData = () => {
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const eventBookings = JSON.parse(localStorage.getItem('eventBookings') || '[]');

    const formattedReservations = formatReservationData(reservations);
    const { events: formattedEvents, bookings: formattedBookings } = formatEventData(events, eventBookings);

    const wb = XLSX.utils.book_new();

    // Add Profile sheet
    const profileSheet = XLSX.utils.json_to_sheet([{
      'Name': profile.name,
      'Email': profile.email,
      'Phone': profile.phone
    }]);
    XLSX.utils.book_append_sheet(wb, profileSheet, 'Profile');

    // Add Notifications sheet
    const notificationsSheet = XLSX.utils.json_to_sheet([{
      'Email Notifications': notifications.emailNotifications ? 'Enabled' : 'Disabled',
      'Push Notifications': notifications.pushNotifications ? 'Enabled' : 'Disabled',
      'Order Updates': notifications.orderUpdates ? 'Enabled' : 'Disabled',
      'Review Notifications': notifications.reviewNotifications ? 'Enabled' : 'Disabled'
    }]);
    XLSX.utils.book_append_sheet(wb, notificationsSheet, 'Notifications');

    // Add Reservations sheet
    const reservationsSheet = XLSX.utils.json_to_sheet(formattedReservations);
    XLSX.utils.book_append_sheet(wb, reservationsSheet, 'Reservations');

    // Add Events sheet
    const eventsSheet = XLSX.utils.json_to_sheet(formattedEvents);
    XLSX.utils.book_append_sheet(wb, eventsSheet, 'Events');

    // Add Event Bookings sheet
    const bookingsSheet = XLSX.utils.json_to_sheet(formattedBookings);
    XLSX.utils.book_append_sheet(wb, bookingsSheet, 'Event Bookings');

    // Save the workbook
    XLSX.writeFile(wb, `cafe-colombia-all-data-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const exportReservations = () => {
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    const formattedReservations = formatReservationData(reservations);
    exportToExcel(formattedReservations, 'Reservations', 'cafe-colombia-reservations');
  };

  const exportEventData = () => {
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const eventBookings = JSON.parse(localStorage.getItem('eventBookings') || '[]');
    const { events: formattedEvents, bookings: formattedBookings } = formatEventData(events, eventBookings);

    const wb = XLSX.utils.book_new();
    
    // Add Events sheet
    const eventsSheet = XLSX.utils.json_to_sheet(formattedEvents);
    XLSX.utils.book_append_sheet(wb, eventsSheet, 'Events');

    // Add Event Bookings sheet
    const bookingsSheet = XLSX.utils.json_to_sheet(formattedBookings);
    XLSX.utils.book_append_sheet(wb, bookingsSheet, 'Event Bookings');

    // Save the workbook
    XLSX.writeFile(wb, `cafe-colombia-events-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const cleanupData = () => {
    const keysToKeep = ['adminProfile', 'notificationSettings', 'isAuthenticated'];
    Object.keys(localStorage).forEach(key => {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        profile,
        notifications,
        updateProfile,
        updateNotificationSettings,
        exportAllData,
        exportReservations,
        exportEventData,
        cleanupData
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
} 