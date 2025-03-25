import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Star, ThumbsUp, Flag, Check, MessageSquare } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
}
export function EventManager() {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    description: ''
  });
  const addEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.description) return;
    setEvents([...events, {
      id: uuidv4(),
      ...newEvent
    }]);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      description: ''
    });
  };
  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };
  return <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Event Management</h2>

      {/* Event Management */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Event Management</h3>
        <div className="flex gap-4 mb-4">
          <input type="text" placeholder="Event Title" className="border rounded px-3 py-2" value={newEvent.title} onChange={e => setNewEvent({
          ...newEvent,
          title: e.target.value
        })} />
          <input type="date" className="border rounded px-3 py-2" value={newEvent.date} onChange={e => setNewEvent({
          ...newEvent,
          date: e.target.value
        })} />
          <input type="time" className="border rounded px-3 py-2" value={newEvent.time} onChange={e => setNewEvent({
          ...newEvent,
          time: e.target.value
        })} />
          <input type="text" placeholder="Event Description" className="border rounded px-3 py-2" value={newEvent.description} onChange={e => setNewEvent({
          ...newEvent,
          description: e.target.value
        })} />
          <button onClick={addEvent} className="bg-green-600 text-white px-4 py-2 rounded">
            Add Event
          </button>
        </div>
        <ul>
          {events.map(event => <li key={event.id} className="border-b p-3 flex justify-between items-center">
              <div>
                <h4 className="font-semibold">{event.title}</h4>
                <p>
                  {event.date} at {event.time}
                </p>
                <p className="text-sm text-gray-600">{event.description}</p>
              </div>
              <button onClick={() => deleteEvent(event.id)} className="text-red-600">
                Delete
              </button>
            </li>)}
        </ul>
      </div>
    </div>;
}