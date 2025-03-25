import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
export function EventsSection() {
  const events = [{
    title: "Cafe Colombia's New Pizza Menu Launch",
    date: 'Feb 5 - Feb 6',
    time: '12PM - 12AM',
    location: 'Cafe Colombia',
    image: 'https://i.postimg.cc/DfXPBn9H/481217451-571890162548953-3729266041705724105-n.jpg',
    description: "Cafe Colombia is launching their new pizza menu and introducing a Spin & Win Game with amazing rewards! Don't miss out on the celebration!"
  }, {
    title: 'Buy 1, Get 1 Free Night!',
    date: 'Friday, April 12, 2025',
    time: '5:00 PM - 9:00 PM',
    location: 'Cafe Colombia',
    image: 'https://i.postimg.cc/8zJprXJR/481905821-17925107034039731-8496985760001267467-n.jpg',
    description: 'Enjoy local Colombian music while sipping your favorite coffee.'
  }, {
    title: 'Coffee & Music Night',
    date: 'Saturday, April 6, 2025',
    time: '6:00 PM - 10:00 PM',
    location: 'Café Colombia',
    image: 'https://i.pinimg.com/736x/c5/4f/4b/c54f4b8402a029807d884377c2ae02cd.jpg',
    description: 'Enjoy a night of rich Colombian coffee, delicious treats, and live acoustic music! Sip, savor, and relax in a cozy ambiance. Walk-ins welcome, reservations recommended.'
  }];
  return <section className="py-20 bg-amber-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Upcoming Events
          </h2>
          <div className="w-24 h-1 bg-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Join us for special events and workshops
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
}