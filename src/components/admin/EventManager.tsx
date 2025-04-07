import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Calendar, Clock, MapPin, Users, Ticket, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { v4 as uuidv4 } from 'uuid';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  capacity: number;
  price: number;
  active: boolean;
}

export function EventManager() {
  const { events, updateEvents } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [eventData, setEventData] = useState<Event>({
    id: '',
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image: '',
    capacity: 1,
    price: 0,
    active: true
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingEvent) {
      // Update existing event
      const updatedEvents = events.map(event =>
        event.id === editingEvent.id ? eventData : event
      );
      updateEvents(updatedEvents);
    } else {
      // Add new event
      const newEvent = {
        ...eventData,
        id: uuidv4()
      };
      updateEvents([...events, newEvent]);
    }
    
    setShowForm(false);
    setEditingEvent(null);
    setEventData({
      id: '',
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      image: '',
      capacity: 1,
      price: 0,
      active: true
    });
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setEventData(event);
    setShowForm(true);
  };

  const handleDelete = (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const updatedEvents = events.filter(event => event.id !== eventId);
      updateEvents(updatedEvents);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Event Management</h2>
        <button
          onClick={() => {
            setEditingEvent(null);
            setEventData({
              id: '',
              title: '',
              description: '',
              date: '',
              time: '',
              location: '',
              image: '',
              capacity: 1,
              price: 0,
              active: true
            });
            setShowForm(true);
          }}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
        >
          Add New Event
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingEvent ? 'Edit Event' : 'Add New Event'}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingEvent(null);
                  setEventData({
                    id: '',
                    title: '',
                    description: '',
                    date: '',
                    time: '',
                    location: '',
                    image: '',
                    capacity: 1,
                    price: 0,
                    active: true
                  });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={eventData.title}
                  onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={eventData.description}
                  onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={eventData.date}
                  onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  value={eventData.time}
                  onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={eventData.location}
                  onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="url"
                  value={eventData.image}
                  onChange={(e) => setEventData({ ...eventData, image: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Capacity</label>
                <input
                  type="number"
                  value={eventData.capacity}
                  onChange={(e) => setEventData({ ...eventData, capacity: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price (BDT)</label>
                <input
                  type="number"
                  value={eventData.price}
                  onChange={(e) => setEventData({ ...eventData, price: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  min="0"
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={eventData.active}
                  onChange={(e) => setEventData({ ...eventData, active: e.target.checked })}
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">Active</label>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingEvent(null);
                    setEventData({
                      id: '',
                      title: '',
                      description: '',
                      date: '',
                      time: '',
                      location: '',
                      image: '',
                      capacity: 1,
                      price: 0,
                      active: true
                    });
                  }}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        {events.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No events found.</div>
        ) : (
          events.map(event => (
            <div key={event.id} className="border-b last:border-b-0 p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{event.title}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      event.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {event.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>{event.description}</p>
                    <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                    <p>Time: {event.time}</p>
                    <p>Location: {event.location}</p>
                    <p>Capacity: {event.capacity} people</p>
                    <p>Price: BDT {event.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Edit"
                  >
                    <Pencil className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="p-1 hover:bg-red-100 rounded"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}