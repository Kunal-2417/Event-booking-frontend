import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Preloader from '../../components/Preloader';
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';
import './Events.css';
import API_BASE_URL from '../../config';
function Events() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3;
  const navigate = useNavigate();
  const [eventdata, setEventdata] = useState([]);


  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/getalleventsclient/`, {
        withCredentials: true,
      });
      console.log("✅ Events fetched:", res.data.events);
      setEventdata(Array.isArray(res.data.events) ? res.data.events : []);
    } catch (error) {
      setEventdata([]);
      console.log("❌ Session expired or user not logged in:", error.response?.status);
    }
  };

  const handleSearch = async () => {
    console.log("🔍 Searching for events with term:", searchTerm);
    try {
      const res = await axios.get(`${API_BASE_URL}/searchevent?title=${searchTerm}`, {
        withCredentials: true,
      });
      setEventdata(Array.isArray(res.data.events) ? res.data.events : []);
      console.log("✅ Search results:", res.data.events);
      setCurrentPage(1);
    } catch (error) {
      console.log("❌ Error searching events:", error);
    }
  };

  const handlebookTicket = (eventId) => {
    if (!user) {
      alert("Please login to book a ticket!");
    } else {
      navigate(`/booking/${eventId}`);
    }
  };

  // const filteredEvents = eventdata.filter(event =>
  //   event.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = eventdata.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Preloader />
      <div className="page-heading-shows-events">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Our Events</h2>
              <span>Check out all events happening soon.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row mb-4">
          <div className="col-lg-12 text-center">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search events..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-button" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="container mx-auto p-6">
            {currentEvents.length > 0 ? (
              currentEvents.map((event, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 mb-6 flex flex-col md:flex-row items-center">

                  {/* Center Section - Event Image with Price Tag */}
                  <div className="md:w-1/3 relative mx-4">
                    <img src={event.image_url} alt={event.title} className="rounded-lg shadow-md w-full h-48 object-cover" />
                    <div className="absolute top-4 left-4 bg-gray-700 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                      ${event.price_per_seat} / Ticket
                    </div>
                  </div>

                  {/* Left Section - Event Details */}
                  <div className="md:w-1/3 text-center md:text-left">
                    <h4 className="text-xl font-bold text-gray-800">{event.title}</h4>
                    <p className="text-gray-600 mt-2">{event.description}</p>
                    {/* <button className="mt-4 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition">
                      Discover More
                    </button> */}
                  </div>
                  {/* Right Section - Event Info & Booking */}
                  <div className="md:w-1/3 text-center md:text-right">
                    <ul className="space-y-2">
                      <li className="flex items-center justify-center md:justify-end space-x-2">
                        <i className="fa fa-clock-o text-gray-600"></i>
                        <h6 className="text-gray-700">{new Date(event.start_time).toLocaleString()}</h6>
                      </li>
                      <li className="flex items-center justify-center md:justify-end space-x-2">
                        <i className="fa fa-map-marker text-gray-600"></i>
                        <span className="text-gray-700">{event.location}</span>
                      </li>
                      <li className="flex items-center justify-center md:justify-end space-x-2">
                        <i className="fa fa-users text-gray-600"></i>
                        <span className="text-gray-700">{event.available_seats} Seats Available</span>
                      </li>
                      <li className="mt-4">
                        <button
                          onClick={() => handlebookTicket(event.id)}
                          className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-900 transition"
                        >
                          Book Ticket
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-700 mt-10">No events found.</div>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <ul>
            <li>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="prev-next"
              >
                Prev
              </button>
            </li>

            {Array.from({ length: Math.ceil(eventdata.length / eventsPerPage) }, (_, i) => (
              <li key={i} className={currentPage === i + 1 ? "active" : ""}>
                <a href="#" onClick={(e) => { e.preventDefault(); paginate(i + 1); }}>
                  {i + 1}
                </a>
              </li>
            ))}

            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(eventdata.length / eventsPerPage)}
                className="prev-next"
              >
                Next
              </button>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Events;
