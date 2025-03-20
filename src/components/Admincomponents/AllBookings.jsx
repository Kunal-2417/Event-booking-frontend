import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config"
function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/clients/bookings/`, {
          headers: { "Content-Type": "application/json", "X-Auth-Token": token },
          withCredentials: true,
        });

        console.log("Booking API Response:", res.data);

        // Filter out clients with zero bookings
        const filteredClients = (res.data.clients_bookings || []).filter(client => client.bookings?.length > 0);
        setBookings(filteredClients);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Booking History</h2>

      {bookings.length > 0 ? (
        bookings.map((client) => (
          <div key={client.client_id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 mb-6">
            <h3 className="text-2xl font-bold text-gray-800">{client.client_name}</h3>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {client.bookings.map((booking) => (
                <div key={booking.booking_id} className="bg-gray-100 shadow-md rounded-lg p-4 border border-gray-200">
                  <h4 className="text-lg font-semibold">{booking.event_title}</h4>
                  <p className="text-gray-700"><strong>Tickets:</strong> {booking.number_of_tickets}</p>
                  <p className="text-gray-700"><strong>Amount Paid:</strong> ${booking.booking_amount}</p>
                  <p className="text-sm text-gray-500 mt-1"><strong>Payment Status:</strong> {booking.payment_status}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-700 mt-10">No clients with bookings found.</p>
      )}
    </div>
  );
}

export default AllBookings;
