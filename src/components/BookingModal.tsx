import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { v4 as uuidv4 } from 'uuid';

interface BookingModalProps {
  event: {
    id: string;
    title: string;
    price: number;
    capacity: number;
  };
  onClose: () => void;
}

export function BookingModal({ event, onClose }: BookingModalProps) {
  const { addBooking } = useData();
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    numberOfTickets: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalAmount = formData.numberOfTickets * event.price;
    
    addBooking({
      id: uuidv4(),
      eventId: event.id,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      numberOfTickets: formData.numberOfTickets,
      totalAmount,
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      active: true
    });

    alert('Booking submitted successfully! We will contact you shortly to confirm.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Book Event: {event.title}</h3>
          <button
            onClick={onClose}
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
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.customerEmail}
              onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={formData.customerPhone}
              onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Tickets</label>
            <input
              type="number"
              value={formData.numberOfTickets}
              onChange={(e) => setFormData({ ...formData, numberOfTickets: Math.min(Math.max(1, parseInt(e.target.value)), event.capacity) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              required
              min="1"
              max={event.capacity}
            />
          </div>
          <div className="text-right text-sm text-gray-600">
            Total Amount: BDT {formData.numberOfTickets * event.price}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 