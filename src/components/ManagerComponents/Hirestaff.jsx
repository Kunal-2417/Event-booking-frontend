import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config"
const Hirestaff = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [assigning, setAssigning] = useState(null);
    const token = JSON.parse(localStorage.getItem("token"));
    const fetchUnassignedStaff = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/hire-staff/`, {
                // method:'GET',
                headers: { 'Content-Type': 'application/json', 'X-Auth-Token': token },

                credentials: 'include',
            });
            console.log(response.data.unassigned_staff)
            const data=response.data.unassigned_staff;
            setStaff(response.data.unassigned_staff); // Assuming the API returns { staff: [...] }
            setLoading(false);
        } catch (err) {
            console.error("Error fetching staff:", err);
            setError("Failed to load staff.");
            setLoading(false);
        }
    };
    const handleAssign = async (staffId) => {
        setAssigning(staffId);
        try {
            console.log(token)
            const response = await fetch(`${API_BASE_URL}/hire-staff/${staffId}/`, {
                method:'PATCH',
                headers: { 'Content-Type': 'application/json', 'X-Auth-Token': token },

                credentials: 'include',
            });

            if (response.status === 200) {
                alert("Staff assigned successfully!");
                fetchUnassignedStaff(); // Refresh staff list
            }
        } catch (err) {
            console.error("Error assigning staff:", err);
            alert("Failed to assign staff.");
        } finally {
            setAssigning(null);
        }
    };
    useEffect(() => {
        fetchUnassignedStaff();
    }, []);

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Unassigned Staff</h2>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && staff.length === 0 && <p>No unassigned staff available.</p>}

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

                        {/* Assign Button */}
                        <button
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 disabled:bg-gray-400"
                            onClick={() => handleAssign(member.staff_id)}
                            disabled={assigning === member.staff_id}
                        >
                            {assigning === member.staff_id ? "Hiring..." : "Hire"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hirestaff;
