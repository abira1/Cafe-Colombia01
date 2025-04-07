import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Calendar, Clock, MapPin, Users, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface InterestFormData {
  name: string;
  email: string;
  phone: string;
}

export function EventsSection() {
  const { events, isLoading, error, addBooking } = useData();
  const [selectedEvent, setSelectedEvent] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [formData, setFormData] = useState<InterestFormData>({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedEvent) {
      const newBooking = {
        id: uuidv4(),
        eventId: selectedEvent.id,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        numberOfTickets: 1,
        totalAmount: 0,
        bookingDate: new Date().toISOString().split('T')[0],
        status: 'pending' as const,
        active: true
      };

      addBooking(newBooking);
      alert('Thank you for your interest! We will contact you shortly.');
      setSelectedEvent(null);
      setFormData({ name: '', email: '', phone: '' });
    }
  };

  if (isLoading) {
    return (
      <section id="events" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">Loading events...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="events" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600">Error loading events: {error}</div>
        </div>
      </section>
    );
  }

  const activeEvents = events.filter(event => event.active);
  const sortedEvents = [...activeEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (activeEvents.length === 0) {
    return (
      <section id="events" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">No upcoming events at the moment.</div>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedEvents.map(event => (
            <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Capacity: {event.capacity} people</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEvent({
                    id: event.id,
                    title: event.title
                  })}
                  className="mt-6 w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Interested
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interest Form Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Interested in: {selectedEvent.title}</h3>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}