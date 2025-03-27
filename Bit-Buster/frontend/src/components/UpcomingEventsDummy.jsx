import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router

function UpcomingEventsDummy() {
  const dummyEvents = [
    {
      id: 1,
      imageUrl: 'https://via.placeholder.com/400x200?text=Event+1', // Replace with actual image URLs
      startDate: '2025-01-14',
      endDate: '2025-03-25',
      title: 'Discover Why Event Professionals Love Cvent: Join our six-part Demo Series',
      location: 'Virtual',
    },
    {
      id: 2,
      imageUrl: 'https://via.placeholder.com/400x200?text=Event+2',
      startDate: '2025-03-20',
      endDate: '2025-04-10',
      title: 'Event- und Technologie-Trends 2025: Innovation in der Praxis',
      location: 'München & Frankfurt',
    },
    {
      id: 3,
      imageUrl: 'https://via.placeholder.com/400x200?text=Event+3',
      startDate: '2025-03-25',
      endDate: '2025-03-27',
      title: 'Regional Training Workshop - San Francisco, CA',
      location: 'San Francisco, CA',
    },
    // Add more dummy events as needed
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Upcoming Events</h2>
        <Link to="/events" className="text-blue-600 hover:underline">
          View all Upcoming Events →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyEvents.map((event) => (
          <div key={event.id} className="border rounded-lg overflow-hidden shadow-md">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-gray-600">
                {new Date(event.startDate).toLocaleDateString()} -{' '}
                {new Date(event.endDate).toLocaleDateString()}
              </p>
              <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-700 mb-4">{event.location}</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                Register
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingEventsDummy;