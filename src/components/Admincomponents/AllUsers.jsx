import React, { useEffect, useState } from "react";
import axios from "axios";

function AllUsers() {
  const [users, setUsers] = useState({ staff: [], client: [], event_manager: [] });
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const fetchUsersByRole = async (role) => {
      try {
        const res = await axios.get(`http://localhost:8000/auth/usersbyrole/?role=${role}`, {
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          credentials: 'include',
        });
        return res.data.users || []; // Ensure empty array if no users
      } catch (error) {
        console.error(`Error fetching ${role}:`, error);
        return [];
      }
    };

    const fetchAllUsers = async () => {
      const [staff, client, event_manager] = await Promise.all([
        fetchUsersByRole("staff"),
        fetchUsersByRole("client"),
        fetchUsersByRole("event_manager"),
      ]);
      setUsers({ staff, client, event_manager });
    };

    fetchAllUsers();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">All Users</h2>

      {Object.entries(users).map(([role, userList]) => (
        <div key={role} className="mb-10">
          <h3 className="text-2xl font-semibold capitalize border-b-2 border-gray-300 pb-2 mb-4">{role.replace("_", " ")}s</h3>

          {userList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userList.map((user) => (
                <div key={user.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
                  <h4 className="text-lg font-bold">{user.name}</h4>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500 mt-1">Role: {role.replace("_", " ")}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No {role.replace("_", " ")}s found.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default AllUsers;
