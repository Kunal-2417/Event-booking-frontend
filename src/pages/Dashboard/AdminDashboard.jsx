import React, { useState } from "react";
import CreateUser from "../../components/Admincomponents/CreateUser";

import CreateEvent from "../../components/Admincomponents/CreateEvent";
import AssignEvent from "../../components/Admincomponents/AssignEvent";
import AllEvent from "../../components/Admincomponents/AllEvent";
import AllBookings from "../../components/Admincomponents/AllBookings";
import AllUsers from "../../components/Admincomponents/AllUsers";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    { title: "Create User", key: "createUser", component: <CreateUser /> },
    { title: "Create Event", key: "createEvent", component: <CreateEvent /> },
    { title: "Assign Event to Manager", key: "assignEvent", component: <AssignEvent /> },
    { title: "All Event", key: "allEvent", component: <AllEvent /> },
    { title: "All Bookings", key: "allBookings", component: <AllBookings /> },
    { title: "All Users", key: "allUsers", component: <AllUsers /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

      {/* Menu */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sections.map((section) => (
          <div
            key={section.key}
            className={`bg-white p-4 shadow-lg rounded-lg text-center cursor-pointer hover:bg-gray-200 ${activeSection === section.key ? "bg-gray-300" : ""
              }`}
            onClick={() => setActiveSection(section.key)}
          >
            <h2 className="text-lg font-semibold">{section.title}</h2>
          </div>
        ))}
      </div>

      {/* Section Content */}
      <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
        {sections.find((sec) => sec.key === activeSection)?.component || (
          <p className="text-gray-500 text-center">Select a section to view details.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
