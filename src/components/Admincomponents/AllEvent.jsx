import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config'
function AllEvent() {
  const [events, setEvents] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/searchevent/`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        console.log("API Response:", res.data);
        setEvents(res.data.events || []); // Ensure array format
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]); // Handle error case
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">All Events</h2>

      {events.length > 0 ? (
        events.map((event) => (
          <div key={event.id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row items-center mb-6 p-4 border border-gray-300">

            {/* Event Image */}
            <div className="md:w-1/3">
              <img src={event.image_url} alt={event.title} className="w-full h-48 object-cover rounded-lg shadow-md" />
            </div>

            {/* Event Details */}
            <div className="md:w-2/3 px-6 text-center md:text-left">
              <h3 className="text-2xl font-semibold text-gray-800">{event.title}</h3>
              <p className="text-gray-600 mt-2">{event.description}</p>

              {/* Event Meta Data */}
              <div className="flex flex-wrap mt-4 justify-center md:justify-start space-x-4">
                <span className="text-gray-700"><i className="fa fa-map-marker-alt"></i> {event.location}, {event.city}</span>
                <span className="text-gray-700"><i className="fa fa-clock"></i> {new Date(event.start_time).toLocaleString()}</span>
                <span className="text-gray-700"><i className="fa fa-users"></i> {event.available_seats} Seats</span>
              </div>

              {/* Ticket Price & CTA */}
              <div className="mt-4 flex justify-center md:justify-start items-center space-x-6">
                <span className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold">${event.price_per_seat} / Ticket</span>
                {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Buy Ticket
                </button> */}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-700 mt-10">No events found.</p>
      )}
    </div>
  );
}

export default AllEvent;
