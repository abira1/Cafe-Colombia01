import React, { createContext, useContext, useState, useEffect } from 'react';

interface Booking {
  id: string;
  eventId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  numberOfTickets: number;
  totalAmount: number;
  bookingDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  active: boolean;
}

interface Reservation {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  numberOfGuests: number;
  tableNumber: string;
  specialRequests: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  active: boolean;
}

interface DataContextType {
  menu: any[];
  events: any[];
  gallery: any[];
  offers: any[];
  reviews: any[];
  bookings: Booking[];
  reservations: Reservation[];
  updateMenu: (newMenu: any[]) => void;
  updateEvents: (newEvents: any[]) => void;
  updateGallery: (newGallery: any[]) => void;
  updateOffers: (newOffers: any[]) => void;
  updateReviews: (newReviews: any[]) => void;
  updateBookings: (bookings: Booking[]) => void;
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (bookingId: string, status: 'pending' | 'confirmed' | 'cancelled') => void;
  updateReservations: (reservations: Reservation[]) => void;
  addReservation: (reservation: Reservation) => void;
  updateReservationStatus: (reservationId: string, status: 'pending' | 'confirmed' | 'cancelled') => void;
  isLoading: boolean;
  error: string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Sample data for development
const sampleData = {
  menu: [
    {
      id: '1',
      name: 'Colombian Black',
      description: 'Our signature black coffee from Huila region',
      price: 350,
      category: 'hot drinks',
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e'
    },
    {
      id: '2',
      name: 'Iced Latte',
      description: 'Refreshing cold espresso with milk and ice',
      price: 400,
      category: 'cold drinks',
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348'
    },
    {
      id: '3',
      name: 'Chicken Sandwich',
      description: 'Grilled chicken breast with fresh vegetables and special sauce',
      price: 450,
      category: 'food',
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af'
    },
    {
      id: '4',
      name: 'Pasta Alfredo',
      description: 'Creamy pasta with parmesan cheese and garlic',
      price: 550,
      category: 'food',
      image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856'
    },
    {
      id: '5',
      name: 'Espresso',
      description: 'Strong and rich Italian-style espresso',
      price: 300,
      category: 'hot drinks',
      image: 'https://images.unsplash.com/photo-1510590339092-1b1de537e58d'
    },
    {
      id: '6',
      name: 'Fruit Smoothie',
      description: 'Blend of seasonal fruits with yogurt',
      price: 450,
      category: 'cold drinks',
      image: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82'
    }
  ],
  events: [
    {
      id: '1',
      title: 'Coffee Tasting Event',
      description: 'Join us for a special coffee tasting event',
      date: '2024-04-15',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085'
    }
  ],
  gallery: [
    {
      id: '1',
      title: 'Our Cafe Interior',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
      description: 'The cozy atmosphere of our cafe'
    }
  ],
  offers: [
    {
      id: '1',
      title: 'Happy Hour',
      description: '50% off on all drinks from 3 PM to 6 PM',
      discount: 50,
      validUntil: '2024-04-30',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd'
    }
  ],
  reviews: [
    {
      id: '1',
      name: 'John Doe',
      rating: 5,
      comment: 'Best coffee in town!',
      date: '2024-03-15'
    }
  ]
};

// Load data from localStorage or use sample data
const loadData = () => {
  try {
    const savedData = localStorage.getItem('cafeData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      return {
        ...sampleData,
        ...parsedData,
        bookings: (parsedData.bookings || []).filter((booking: Booking) => booking.status !== 'cancelled'),
        reservations: (parsedData.reservations || []).filter((reservation: Reservation) => reservation.status !== 'cancelled')
      };
    }
    return {
      ...sampleData,
      bookings: [],
      reservations: []
    };
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
    return {
      ...sampleData,
      bookings: [],
      reservations: []
    };
  }
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menu, setMenu] = useState<any[]>(loadData().menu);
  const [events, setEvents] = useState<any[]>(loadData().events);
  const [gallery, setGallery] = useState<any[]>(loadData().gallery);
  const [offers, setOffers] = useState<any[]>(loadData().offers);
  const [reviews, setReviews] = useState<any[]>(loadData().reviews);
  const [bookings, setBookings] = useState<Booking[]>(loadData().bookings);
  const [reservations, setReservations] = useState<Reservation[]>(loadData().reservations);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    const dataToSave = {
      menu,
      events,
      gallery,
      offers,
      reviews,
      bookings: bookings.filter(booking => booking.status !== 'cancelled'),
      reservations: reservations.filter(reservation => reservation.status !== 'cancelled')
    };
    localStorage.setItem('cafeData', JSON.stringify(dataToSave));
  }, [menu, events, gallery, offers, reviews, bookings, reservations]);

  const updateMenu = (newMenu: any[]) => {
    setMenu(newMenu);
  };

  const updateEvents = (newEvents: any[]) => {
    setEvents(newEvents);
  };

  const updateGallery = (newGallery: any[]) => {
    setGallery(newGallery);
  };

  const updateOffers = (newOffers: any[]) => {
    setOffers(newOffers);
  };

  const updateReviews = (newReviews: any[]) => {
    setReviews(newReviews);
  };

  const updateBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
  };

  const addBooking = (booking: Booking) => {
    setBookings(prev => [...prev, booking]);
  };

  const updateBookingStatus = (bookingId: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === bookingId ? { ...booking, status } : booking
      )
    );
  };

  const updateReservations = (newReservations: Reservation[]) => {
    setReservations(newReservations);
  };

  const addReservation = (reservation: Reservation) => {
    setReservations(prev => [...prev, reservation]);
  };

  const updateReservationStatus = (reservationId: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    setReservations(prev =>
      prev.map(reservation =>
        reservation.id === reservationId ? { ...reservation, status } : reservation
      )
    );
  };

  return (
    <DataContext.Provider
      value={{
        menu,
        events,
        gallery,
        offers,
        reviews,
        bookings,
        reservations,
        updateMenu,
        updateEvents,
        updateGallery,
        updateOffers,
        updateReviews,
        updateBookings,
        addBooking,
        updateBookingStatus,
        updateReservations,
        addReservation,
        updateReservationStatus,
        isLoading,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}; 