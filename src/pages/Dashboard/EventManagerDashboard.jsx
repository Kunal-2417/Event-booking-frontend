import React, { useState } from "react";

import CreateStaff from "../../components/ManagerComponents/Createstaff";
import GetStaff from "../../components/ManagerComponents/Getstaff";
import HireStaff from "../../components/ManagerComponents/Hirestaff";
import GetAssignedTasks from "../../components/ManagerComponents/GetAssignedTasks";

const EventManagerDashboard = () => {
  const [activeSection, setActiveSection] = useState("getAssignedTasks"); // Default section

  const sections = [
    { title: "Create Staff", key: "createStaff", component: <CreateStaff /> },
    { title: "View My Staff", key: "getStaff", component: <GetStaff /> },
    { title: "Hire Staff", key: "hireStaff", component: <HireStaff /> },
    { title: "View My Events", key: "getAssignedTasks", component: <GetAssignedTasks /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Event Manager Dashboard</h1>

      {/* Navigation Menu */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sections.map((section) => (
          <div
            key={section.key}
            className={`p-4 text-center cursor-pointer rounded-lg shadow-md transition-all ${activeSection === section.key
                ? "bg-blue-500 text-white font-semibold"
                : "bg-white hover:bg-gray-200"
              }`}
            onClick={() => setActiveSection(section.key)}
          >
            {section.title}
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
        {sections.find((sec) => sec.key === activeSection)?.component}
      </div>
    </div>
  );
};

export default EventManagerDashboard;
