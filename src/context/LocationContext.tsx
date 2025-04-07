import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocationService, Location } from '../services/LocationService';
import toast from 'react-hot-toast';

interface LocationContextType {
  location: Location | null;
  isLoading: boolean;
  error: string | null;
  refreshLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType>({
  location: null,
  isLoading: false,
  error: null,
  refreshLocation: async () => {},
});

export const useLocation = () => useContext(LocationContext);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshLocation = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const locationService = LocationService.getInstance();
      const newLocation = await locationService.detectLocation();
      setLocation(newLocation);
      
      if (!newLocation.isInDeliveryArea) {
        toast('We currently deliver only in Dhaka. You can still browse our menu.');
      }
    } catch (err) {
      setError('Failed to detect location');
      console.error('Location detection error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshLocation();
    
    // Set up location change listener
    const locationService = LocationService.getInstance();
    const handleLocationChange = (newLocation: Location) => {
      setLocation(newLocation);
    };
    
    locationService.addLocationListener(handleLocationChange);
    
    return () => {
      locationService.removeLocationListener(handleLocationChange);
    };
  }, []);

  return (
    <LocationContext.Provider value={{ location, isLoading, error, refreshLocation }}>
      {children}
    </LocationContext.Provider>
  );
}; 