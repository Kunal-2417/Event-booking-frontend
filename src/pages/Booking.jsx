import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Preloader from '../components/Preloader';
import API_BASE_URL from '../config';
const Booking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    // console.log("kunal",user.token)
    const [eventdata, setEventdata] = useState(null);
    const [numTickets, setNumTickets] = useState(1);
    const token = JSON.parse(localStorage.getItem("token"));
    console.log("kunal-1", token)

    const handleBooking = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/book/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                credentials: 'include',
                body: JSON.stringify({
                    event_id: id,
                    number_of_tickets: numTickets
                })
            });

            const data = await res.json();
            console.log("✅ Booking response:", data);
            if(data.error){

                alert("Booking failed. You have already booked another event Music Conce…04 - 15 21:00:00 +00:00 that overlaps with this one.");
            }
            if (data.booking.booking_id) {
                navigate(`/payment/${data.booking.booking_id}`);
            } else {
                console.error("❌ Booking failed:", data);
            }

        } catch (error) {
            // alert(error)
            console.error("❌ Error processing booking:", error);
        }
    };

    const fetchEvents = async () => {
        try {
            // console.log("kunal",user.token)
            const res = await fetch(`${API_BASE_URL}/eventdetails/${id}/`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                credentials: 'include',
            });
            const data = await res.json();
            console.log("✅ Event fetched:", data.event);
            setEventdata(data.event);
        } catch (error) {
            console.error("❌ Error fetching event:", error);
            setEventdata(null);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    if (!eventdata) return <Preloader />;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl flex">
                {/* Left Side - Event Image */}
                <div className="w-1/2 relative">
                    <img src={eventdata.image_url} alt={eventdata.title} className="w-full h-full rounded" />
                    <div className="absolute top-2 left-2 bg-gray-800 text-white px-4 py-2 rounded">
                        ₹{eventdata.price_per_seat} per ticket
                    </div>
                </div>

                {/* Right Side - Event Details */}
                <div className="w-1/2 p-6">
                    <h2 className="text-2xl font-bold">{eventdata.title}</h2>
                    <p className="text-gray-600 mt-2">{eventdata.description}</p>
                    <p className="mt-2"><strong>Location:</strong> {eventdata.location}</p>
                    <p className="mt-1"><strong>Seats Available:</strong> {eventdata.available_seats}</p>

                    {/* Ticket Counter */}
                    <div className="flex items-center mt-4">
                        <button
                            className="px-3 py-1 bg-gray-600 text-white rounded-l"
                            onClick={() => setNumTickets(Math.max(1, numTickets - 1))}
                        > - </button>
                        <span className="px-4">{numTickets}</span>
                        <button
                            className="px-3 py-1 bg-gray-600 text-white rounded-r"
                            onClick={() => setNumTickets(Math.min(eventdata.available_seats, numTickets + 1))}
                        > + </button>
                    </div>

                    {/* Total Price */}
                    <p className="mt-4 text-lg font-semibold">Total: ₹{(numTickets * eventdata.price_per_seat).toFixed(2)}</p>

                    {/* Book Button */}
                    <button onClick={handleBooking}className="mt-4 w-full bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Booking;
