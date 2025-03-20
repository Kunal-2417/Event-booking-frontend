import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";
import API_BASE_URL from "../../config";
function ClientDashboard() {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (user && user.uid) {
      const fetchBookings = async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/event/history/`, {
            headers: { "Content-Type": "application/json", "X-Auth-Token": token },
          });

          setBookings(res.data.bookings || []);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      };

      fetchBookings();
    }
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Client Dashboard</h2>

      {/* User Details */}
      {user ? (
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 mb-6">
          <h3 className="text-xl font-bold">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-500 mt-1">Role: {user.role}</p>
        </div>
      ) : (
        <p className="text-gray-500">Loading user details...</p>
      )}

      {/* Booking History */}
      <h3 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-4">Booking History</h3>
      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking.booking_id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
              <h4 className="text-lg font-bold">{booking.event.title}</h4>
              <p className="text-gray-600"><strong>Location:</strong> {booking.event.location}, {booking.event.city}</p>
              <p className="text-gray-600"><strong>Date:</strong> {new Date(booking.booking_date).toLocaleDateString()}</p>
              <p className="text-gray-600"><strong>Tickets:</strong> {booking.number_of_tickets}</p>
              <p className="text-gray-600"><strong>Amount Paid:</strong> ${booking.amount_paid}</p>
              <p className="text-sm text-gray-500 mt-1"><strong>Payment Status:</strong> {booking.payment_status}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No bookings found.</p>
      )}
    </div>
  );
}

export default ClientDashboard;
