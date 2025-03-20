import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config"
const Getstaff = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const token = JSON.parse(localStorage.getItem("token"));

    const fetchStaff = async () => {
        try {
            // const token = localStorage.getItem("token"); // Assuming token is stored
            const response = await axios.get(`${API_BASE_URL}/mystaff/`, {
                // method:'GET',
                headers: { 'Content-Type': 'application/json', 'X-Auth-Token': token },

                credentials: 'include',
            });

            setStaff(response.data.staff); // Assuming API returns { staff: [...] }
            console.log(response.data)
            setLoading(false);
        } catch (err) {
            console.error("Error fetching staff:", err);
            setError("Failed to load staff.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Staff List</h2>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && staff.length === 0 && <p>No staff members found.</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {staff.map((member) => (
                    <div key={member.staff_id} className="p-4 bg-gray-100 rounded-md shadow-sm">
                        <p><strong>ID:</strong> {member.staff_id}</p>
                        <p><strong>Name:</strong> {member.display_name}</p>
                        <p><strong>Email:</strong> {member.email}</p>
                        <p><strong>Phone:</strong> {member.phone_number}</p>
                        <p><strong>Location:</strong> {member.location}</p>
                        <p><strong>Available:</strong> {member.is_available ? "✅ Yes" : "❌ No"}</p>
                        <p><strong>Created At:</strong> {new Date(member.created_at).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Getstaff;
