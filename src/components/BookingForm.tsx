import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { v4 as uuidv4 } from 'uuid';
import { X } from 'lucide-react';

interface BookingFormProps {
  event: {
    id: string;
    title: string;
    price: number;
    capacity: number;
  };
  onClose: () => void;
}

export function BookingForm({ event, onClose }: BookingFormProps) {
  const { addBooking } = useData();
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    numberOfTickets: 1
  });
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const totalAmount = event.price * formData.numberOfTickets;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBooking = {
      id: uuidv4(),
      eventId: event.id,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      numberOfTickets: formData.numberOfTickets,
      totalAmount,
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'pending' as const,
      active: true
    };

    addBooking(newBooking);
    setSubmissionStatus('success');

    // Reset form after 2 seconds and close modal
    setTimeout(() => {
      setFormData({
        customerName: '',
        customerEmail: '',
        numberOfTickets: 1
      });
      setSubmissionStatus('idle');
      onClose();
    }, 2000);
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

        {submissionStatus === 'success' ? (
          <div className="text-center py-8">
            <div className="text-green-600 text-xl mb-2">Booking Submitted!</div>
            <p className="text-gray-600">Your booking is pending confirmation.</p>
          </div>
        ) : (
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
              <label className="block text-sm font-medium text-gray-700">Number of Tickets</label>
              <input
                type="number"
                min="1"
                max={event.capacity}
                value={formData.numberOfTickets}
                onChange={(e) => setFormData({ ...formData, numberOfTickets: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Maximum {event.capacity} tickets available
              </p>
            </div>
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total Amount:</span>
                <span>BDT {totalAmount}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                BDT {event.price} × {formData.numberOfTickets} tickets
              </p>
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
        )}
      </div>
    </div>
  );
} 