import API_BASE_URL from '../../config';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';

function AssignEvent() {
    const [events, setEvents] = useState([]);
    const [managers, setManagers] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const { user } = useAuth();
    const [managerEvents, setManagerEvents] = useState([]);
    const [selectedManager, setSelectedManager] = useState(false);
    const token = JSON.parse(localStorage.getItem("token"));
    useEffect(() => {
        const fetchUnassignedEvents = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/searchevent/?managerstatus=unassigned`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });
                const data = res.data;
                console.log("Fetched unassigned events:", data.events);
                setEvents(data.events);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchUnassignedEvents();
    }, []);

    
    const fetchManagers = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/admin/em/`, {
                headers: { 'Content-Type': 'application/json', 'X-Auth-Token': token },
                credentials: 'include',
            });
        const data = await res.data;
        console.log(data)
            setManagers(data.event_managers);
        } catch (error) {
            console.error("Error fetching managers:", error);
        }
    };

    const fetchManagerEvents = async (managerId) => {
        try {
            const res = await axios.get(`${API_BASE_URL}/geteventmanagerevents/${managerId}/`, {
                // method: 'GET',
                headers: { 'Content-Type': 'application/json', 'X-Auth-Token': token },
                credentials: 'include',
            });
            const data=res.data;
            console.log("Fetched manager's events:", data.events);
            setManagerEvents(res.data.events);
            setSelectedManager(true);
        } catch (error) {
            console.error("Error fetching manager's events:", error);
        }
    };
    const handleAssignManagerClick = async (managerId) => {
        console.log("Assigning manager with ID:", managerId, "to event:", selectedEvent.id);

        try {
            const res = await fetch(`${API_BASE_URL}/assigneventtomanager/${selectedEvent.id}/`, {
                method: 'POST', // ✅ Correct method case
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // ✅ Ensure credentials are included properly
                body: JSON.stringify({ manager_id: Number(managerId) }) // ✅ Correct request body placement
            });

            if (!res.ok) {
                throw new Error("Failed to assign manager");
            }

            const data = await res.json(); // ✅ Correct response handling
            console.log("Manager assigned successfully:", data);
            alert("Manager assigned successfully!");

            // ✅ Reset states
            setShowPopup(false);
            setSelectedEvent(null);
            setSelectedManager(null);
            setManagerEvents([]);
            setEvents((prevEvents) => prevEvents.filter((event) => event.id !== selectedEvent.id));

        } catch (error) {
            console.error("Error assigning manager:", error);
            alert("Error assigning manager. Please try again.");
        }
    };


    const handleAssignClick = (event) => {

        setSelectedEvent(event);
        console.log("Selected event:", event);
        fetchManagers();
        setShowPopup(true);
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Assign Event</h2>
            {events.length > 0 ? (
                events.map((event) => (
                    <div key={event.id} className="bg-white rounded-lg shadow-lg p-6 mb-6 flex flex-col md:flex-row items-center">
                        {/* Event Image with Price Tag */}
                        <div className="md:w-1/3 relative mx-4">
                            <img src={event.image_url} alt={event.title} className="rounded-lg shadow-md w-full h-48 object-cover" />
                            <div className="absolute top-4 left-4 bg-gray-700 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                                ${event.price_per_seat} / Ticket
                            </div>
                        </div>

                        {/* Event Details */}
                        <div className="md:w-1/3 text-center md:text-left">
                            <h4 className="text-xl font-bold text-gray-800">{event.title}</h4>
                            <p className="text-gray-600 mt-2">{event.description}</p>
                        </div>

                        {/* Event Info & Assign Button */}
                        <div className="md:w-1/3 text-center md:text-right">
                            <ul className="space-y-2">
                                <li className="flex items-center justify-center md:justify-end space-x-2">
                                    <i className="fa fa-clock-o text-gray-600"></i>
                                    <h4 className="text-gray-700">Event Id: {event.id}</h4>
                                </li>
                                <li className="flex items-center justify-center md:justify-end space-x-2">
                                    <i className="fa fa-clock-o text-gray-600"></i>
                                    <h6 className="text-gray-700">{new Date(event.start_time).toLocaleString()}</h6>
                                </li>
                                <li className="flex items-center justify-center md:justify-end space-x-2">
                                    <i className="fa fa-map-marker text-gray-600"></i>
                                    <span className="text-gray-700">{event.location}, {event.city}</span>
                                </li>
                                <li className="flex items-center justify-center md:justify-end space-x-2">
                                    <i className="fa fa-map-marker text-gray-600"></i>
                                    <span className="text-gray-700">Event_manager :Unassigned</span>
                                </li>
                                <li className="flex items-center justify-center md:justify-end space-x-2">
                                    <i className="fa fa-users text-gray-600"></i>
                                    <span className="text-gray-700">{event.available_seats} Seats Available</span>
                                </li>
                                <li className="mt-4">
                                    {/* {event.event_manager === null && ( */}
                                        <button
                                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                                            onClick={() => handleAssignClick(event)}
                                        >
                                            Assign Event
                                        </button>
                                    {/* // )} */}
                                </li>
                            </ul>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center text-gray-700 mt-10">No events found.</div>
            )}

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-auto">
                    <div className="bg-white p-6 rounded-lg w-[40rem] max-h-[80vh] overflow-y-auto relative">
                        <button className="absolute top-2 right-2 bg-red-500 text-white text-xl font-bold py-2 px-4 rounded hover:bg-red-700" onClick={() => setShowPopup(false)}>
                            &times;
                        </button>
                        <h3 className="text-xl font-semibold mb-4">Select a Manager for {selectedEvent?.title}</h3>
                        <ul>
                            {managers.map((manager) => (
                                <li key={manager.id} className="p-3 bg-gray-200 rounded mb-2 flex justify-between items-center">
                                    <div>
                                        <h4 className="text-lg font-semibold">{manager.display_name}</h4>
                                        <p className="text-sm text-gray-600">Id: {manager.event_manager_id}</p>
                                        <p className="text-sm text-gray-600">Email: {manager.email}</p>
                                        <p className="text-sm text-gray-600">Phone: {manager.phone_number}</p>
                                        <p className="text-sm text-gray-600">Location: {manager.location}</p>
                                    </div>
                                    <div className="space-x-2">
                                        <button className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700" onClick={() => fetchManagerEvents(manager.event_manager_id)}>View</button>
                                        <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700" onClick={() => handleAssignManagerClick(manager.event_manager_id)}>Assign</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {selectedManager && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-auto">
                                <div className="bg-white p-6 rounded-lg w-[30rem] max-h-[80vh] overflow-y-auto relative">
                                    <button className="absolute top-2 right-2 bg-red-500 text-white text-xl font-bold py-2 px-4 rounded hover:bg-red-700" onClick={() => setSelectedManager(false)}>
                                        &times;
                                    </button>
                                    <h4 className="text-lg font-semibold mb-2">Events Managed by Selected Manager:</h4>
                                    {managerEvents.length > 0 ? (
                                        <ul className="list-disc pl-5">
                                            {managerEvents.map((event) => (
                                                
                                                <li key={event.id} className="text-gray-700">Event Id:{event.event_id} & Event Title: {event.title}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-600">No events assigned.</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AssignEvent;

