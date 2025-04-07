import React from 'react';
import { Check, X, Calendar, Clock, User, Users, Phone, Table } from 'lucide-react';
import { useData } from '../../context/DataContext';

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

export function ReservationManager() {
  const { reservations, updateReservations } = useData();

  const handleStatusUpdate = (reservationId: string, newStatus: 'confirmed' | 'cancelled') => {
    const updatedReservations = reservations.map(reservation =>
      reservation.id === reservationId ? { ...reservation, status: newStatus } : reservation
    );
    updateReservations(updatedReservations);
  };

  // Group reservations by status
  const pendingReservations = reservations.filter(reservation => reservation.status === 'pending');
  const confirmedReservations = reservations.filter(reservation => reservation.status === 'confirmed');
  const cancelledReservations = reservations.filter(reservation => reservation.status === 'cancelled');

  // Combine reservations in order: pending first, then confirmed, then cancelled
  const sortedReservations = [...pendingReservations, ...confirmedReservations, ...cancelledReservations];

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
        <h2 className="text-2xl font-semibold">Table Reservation Management</h2>
      </div>

      {/* Reservation counts */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-yellow-800 font-semibold">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">{pendingReservations.length}</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-green-800 font-semibold">Confirmed</div>
          <div className="text-2xl font-bold text-green-600">{confirmedReservations.length}</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-red-800 font-semibold">Cancelled</div>
          <div className="text-2xl font-bold text-red-600">{cancelledReservations.length}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {reservations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No reservations found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reservation Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Table Info
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
                {sortedReservations.map(reservation => (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span className="text-sm font-medium text-gray-900">
                              {reservation.customerName}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Phone className="w-4 h-4" />
                            {reservation.customerPhone}
                          </div>
                          <div className="text-sm text-gray-500">{reservation.customerEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-900">
                        <Calendar className="w-4 h-4" />
                        {reservation.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {reservation.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        {reservation.numberOfGuests} guests
                      </div>
                      {reservation.specialRequests && (
                        <div className="mt-2 text-sm text-gray-500">
                          Special requests: {reservation.specialRequests}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-900">
                        <Table className="w-4 h-4" />
                        Table {reservation.tableNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(reservation.status)}`}>
                        {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {reservation.status === 'pending' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleStatusUpdate(reservation.id, 'confirmed')}
                            className="p-1 hover:bg-green-100 rounded"
                            title="Confirm Reservation"
                          >
                            <Check className="w-5 h-5 text-green-600" />
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(reservation.id, 'cancelled')}
                            className="p-1 hover:bg-red-100 rounded"
                            title="Cancel Reservation"
                          >
                            <X className="w-5 h-5 text-red-600" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 