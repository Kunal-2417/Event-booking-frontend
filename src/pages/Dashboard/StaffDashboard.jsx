import React from 'react';
import { useAuth } from "../../context/AuthProvider";

function StaffDashboard() {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div style={{
      backgroundColor: "#007bff",
      color: "white",
      padding: "10px",
      textAlign: "center",
      fontSize: "18px",
      fontWeight: "bold",
      borderRadius: "5px",
      margin: "20px"
    }}>
      {user.email} | {user.role}
    </div>
  );
}

export default StaffDashboard;
