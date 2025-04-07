import { toast } from 'react-hot-toast';

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  isInDeliveryArea: boolean;
}

export class LocationService {
  private static instance: LocationService;
  private listeners: ((location: Location) => void)[] = [];

  // Café location (example coordinates for Dhaka)
  private readonly CAFE_LOCATION = {
    latitude: 23.8103,
    longitude: 90.4125,
    city: 'Dhaka'
  };

  // Dhaka boundaries (approximate)
  private readonly DHAKA_BOUNDARIES = {
    north: 23.9,
    south: 23.7,
    east: 90.5,
    west: 90.3
  };

  private constructor() {}

  public static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  public async detectLocation(): Promise<Location> {
    try {
      const position = await this.getCurrentPosition();
      const { latitude, longitude } = position.coords;
      
      // Check if within Dhaka boundaries
      const isInDeliveryArea = this.isWithinDhaka(latitude, longitude);
      
      // Get address from coordinates (in a real app, use a geocoding service)
      const address = await this.getAddressFromCoordinates(latitude, longitude);
      
      const location: Location = {
        latitude,
        longitude,
        address,
        city: 'Dhaka',
        isInDeliveryArea
      };

      // Notify listeners
      this.notifyListeners(location);
      
      return location;
    } catch (error) {
      console.error('Error detecting location:', error);
      toast.error('Unable to detect your location. Please enable location services.');
      
      // Return default location (outside delivery area)
      return {
        latitude: 0,
        longitude: 0,
        address: 'Location not available',
        city: 'Unknown',
        isInDeliveryArea: false
      };
    }
  }

  public isWithinDhaka(latitude: number, longitude: number): boolean {
    return (
      latitude >= this.DHAKA_BOUNDARIES.south &&
      latitude <= this.DHAKA_BOUNDARIES.north &&
      longitude >= this.DHAKA_BOUNDARIES.west &&
      longitude <= this.DHAKA_BOUNDARIES.east
    );
  }

  public calculateDeliveryTime(): number {
    // In a real app, this would calculate based on distance and traffic
    // For now, return a random time between 30-60 minutes
    return Math.floor(Math.random() * 30) + 30;
  }

  public addLocationListener(listener: (location: Location) => void): void {
    this.listeners.push(listener);
  }

  public removeLocationListener(listener: (location: Location) => void): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  private notifyListeners(location: Location): void {
    this.listeners.forEach(listener => listener(location));
  }

  private getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    });
  }

  private async getAddressFromCoordinates(latitude: number, longitude: number): Promise<string> {
    // In a real app, use a geocoding service like Google Maps Geocoding API
    // For now, return a placeholder address
    return `Location in Dhaka (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
  }
} 