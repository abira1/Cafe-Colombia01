const API_BASE_URL = '/api';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  image?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  description?: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  validUntil: string;
  image?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

class ApiService {
  private async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('authToken');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Menu operations
  async getMenu(): Promise<MenuItem[]> {
    return this.fetchWithAuth('/menu');
  }

  async updateMenu(menu: MenuItem[]): Promise<MenuItem[]> {
    return this.fetchWithAuth('/menu', {
      method: 'PUT',
      body: JSON.stringify(menu),
    });
  }

  // Events operations
  async getEvents(): Promise<Event[]> {
    return this.fetchWithAuth('/events');
  }

  async updateEvents(events: Event[]): Promise<Event[]> {
    return this.fetchWithAuth('/events', {
      method: 'PUT',
      body: JSON.stringify(events),
    });
  }

  // Gallery operations
  async getGallery(): Promise<GalleryItem[]> {
    return this.fetchWithAuth('/gallery');
  }

  async updateGallery(gallery: GalleryItem[]): Promise<GalleryItem[]> {
    return this.fetchWithAuth('/gallery', {
      method: 'PUT',
      body: JSON.stringify(gallery),
    });
  }

  // Offers operations
  async getOffers(): Promise<Offer[]> {
    return this.fetchWithAuth('/offers');
  }

  async updateOffers(offers: Offer[]): Promise<Offer[]> {
    return this.fetchWithAuth('/offers', {
      method: 'PUT',
      body: JSON.stringify(offers),
    });
  }

  // Reviews operations
  async getReviews(): Promise<Review[]> {
    return this.fetchWithAuth('/reviews');
  }

  async updateReviews(reviews: Review[]): Promise<Review[]> {
    return this.fetchWithAuth('/reviews', {
      method: 'PUT',
      body: JSON.stringify(reviews),
    });
  }

  // Authentication
  async login(email: string, password: string): Promise<{ token: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    localStorage.setItem('authToken', data.token);
    return data;
  }

  async logout(): Promise<void> {
    localStorage.removeItem('authToken');
  }
}

export const api = new ApiService(); 