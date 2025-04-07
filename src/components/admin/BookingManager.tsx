import React from 'react';
import { Check, X, Calendar, Clock, User, Users, DollarSign } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface Booking {
  id: string;
  eventId: string;
  customerName: string;
  customerEmail: string;
  numberOfTickets: number;
  totalAmount: number;
  bookingDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export function BookingManager() {
  const { bookings, updateBookings, events } = useData();

  const getEventDetails = (eventId: string) => {
    return events.find(event => event.id === eventId);
  };

  const handleStatusUpdate = (bookingId: string, newStatus: 'confirmed' | 'cancelled') => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    updateBookings(updatedBookings);
  };

  // Group bookings by status
  const pendingBookings = bookings.filter(booking => booking.status === 'pending');
  const confirmedBookings = bookings.filter(booking => booking.status === 'confirmed');
  const cancelledBookings = bookings.filter(booking => booking.status === 'cancelled');

  // Combine bookings in order: pending first, then confirmed, then cancelled
  const sortedBookings = [...pendingBookings, ...confirmedBookings, ...cancelledBookings];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Booking Management</h2>
      </div>

      {/* Booking counts */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-yellow-800 font-semibold">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">{pendingBookings.length}</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-green-800 font-semibold">Confirmed</div>
          <div className="text-2xl font-bold text-green-600">{confirmedBookings.length}</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-red-800 font-semibold">Cancelled</div>
          <div className="text-2xl font-bold text-red-600">{cancelledBookings.length}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {bookings.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No bookings found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedBookings.map(booking => {
                  const event = getEventDetails(booking.eventId);
                  return (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {event?.title || 'Event not found'}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {event?.date}
                          <Clock className="w-4 h-4 ml-2" />
                          {event?.time}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div>
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span className="text-sm font-medium text-gray-900">
                                {booking.customerName}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500">{booking.customerEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-900">
                          <Users className="w-4 h-4" />
                          {booking.numberOfTickets} tickets
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <DollarSign className="w-4 h-4" />
                          {booking.totalAmount.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Booked on: {new Date(booking.bookingDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {booking.status === 'pending' && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                              className="p-1 hover:bg-green-100 rounded"
                              title="Confirm Booking"
                            >
                              <Check className="w-5 h-5 text-green-600" />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                              className="p-1 hover:bg-red-100 rounded"
                              title="Cancel Booking"
                            >
                              <X className="w-5 h-5 text-red-600" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 