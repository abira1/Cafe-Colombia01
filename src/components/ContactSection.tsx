import { useState } from 'react';
import { MapPinIcon, PhoneIcon, ClockIcon } from 'lucide-react';

export function ContactSection() {
  const [booking, setBooking] = useState({
    date: '',
    time: '',
    guests: 1,
    name: '',
    phone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reservation Data:', booking);
    alert('Your reservation has been submitted!');
  };

  return (
    <section id="contact" className="py-20 bg-amber-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Visit Us</h2>
        <div className="w-24 h-1 bg-yellow-600 mx-auto mb-10"></div>

        {/* Reservation Form */}
        <div className="lg:w-1/2 mx-auto bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-6">Reserve Your Table</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Full Name" value={booking.name} onChange={handleInputChange} className="w-full p-3 border rounded-lg" required />
            <input type="tel" name="phone" placeholder="Phone Number" value={booking.phone} onChange={handleInputChange} className="w-full p-3 border rounded-lg" required />
            <div className="grid grid-cols-2 gap-4">
              <input type="date" name="date" value={booking.date} onChange={handleInputChange} className="w-full p-3 border rounded-lg" required />
              <select name="time" value={booking.time} onChange={handleInputChange} className="w-full p-3 border rounded-lg">
                <option value="">Select Time</option>
                {[...Array(25)].map((_, i) => {
                  const hour = 10 + Math.floor(i / 2);
                  const minutes = i % 2 === 0 ? '00' : '30';
                  const period = hour < 12 ? 'AM' : 'PM';
                  const displayHour = hour > 12 ? hour - 12 : hour;
                  return <option key={i} value={`${displayHour}:${minutes} ${period}`}>{`${displayHour}:${minutes} ${period}`}</option>;
                })}
              </select>
            </div>
            <select name="guests" value={booking.guests} onChange={handleInputChange} className="w-full p-3 border rounded-lg">
              {[...Array(20)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1} Guest{i + 1 > 1 ? 's' : ''}</option>
              ))}
            </select>
            <button type="submit" className="w-full bg-yellow-600 text-white p-3 rounded-lg font-semibold hover:bg-yellow-700 transition">Reserve Now</button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="mt-12 flex justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
            <h3 className="text-2xl font-semibold mb-6 text-center">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPinIcon className="text-yellow-600" size={22} />
                <p className="text-gray-600 text-left">
                  3rd floor, Suvastu Space Rahman Galleria, 46 Gulshan Ave, Dhaka 1212
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="text-yellow-600" size={22} />
                <p className="text-gray-600 text-left">01971-588060</p>
              </div>
              <div className="flex items-center space-x-3">
                <ClockIcon className="text-yellow-600" size={22} />
                <p className="text-gray-600 text-left">
                  Open: Closes 3 AM | Takeout: Ends 2 AM
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
