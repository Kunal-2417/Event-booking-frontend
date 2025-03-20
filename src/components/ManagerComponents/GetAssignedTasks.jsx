import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config";
const GetAssignedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));

  const fetchAssignedTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getmyevents/`
        , {
        headers: { "Content-Type": "application/json", "X-Auth-Token": token },
        credentials: "include",
      });

      setTasks(response.data.events); // Default to empty array if no tasks
      setLoading(false);
      console.log(response.data)

    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to load assigned tasks.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedTasks();
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Assigned Tasks</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && tasks.length === 0 && <p>No assigned tasks available.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 bg-gray-100 rounded-md shadow-sm">
            <p><strong>Event ID:</strong> {task.event_id}</p>
            <p><strong>Event:</strong> {task.title}</p>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Location:</strong> {task.location}</p>
            <p><strong>Date:</strong> {new Date(task.end_time).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetAssignedTasks;
