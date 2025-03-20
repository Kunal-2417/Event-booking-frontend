import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import EventManagerDashboard from "./pages/Dashboard/EventManagerDashboard";
import StaffDashboard from "./pages/Dashboard/StaffDashboard";
import ClientDashboard from "./pages/Dashboard/ClientDashboard";
import ProtectedRoute from "./components/protectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home";
import {AuthProvider} from "./context/AuthProvider"
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Events from "./pages/Events/Events";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
          <Route path="/events" element={<Events />} />

          <Route path="/booking/:id" element={
            <ProtectedRoute allowedRoles={["client"]}>
            <Booking />
            </ProtectedRoute>
            } />
          <Route path="/payment/:id" element={
            <ProtectedRoute allowedRoles={["client"]}>
            <Payment />
            </ProtectedRoute>
            } />
          <Route
            path="/dashboard"
            element={
                <Dashboard />
              // <ProtectedRoute allowedRoles={["admin"]}>
              // </ProtectedRoute>
            }
          />
        <Route
                    path="/admin/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={["admin"]}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
        
                  <Route
                    path="/event-manager/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={["event_manager"]}>
                        <EventManagerDashboard />
                      </ProtectedRoute>
                    }
                  />
        
                  <Route
                    path="/staff/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={["staff"]}>
                        <StaffDashboard />
                      </ProtectedRoute>
                    }
                  />
        
                  <Route
                    path="/client/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={["client"]}>
                        <ClientDashboard />
                      </ProtectedRoute>
                    }
                  />
      </Routes>
      <Footer/>
      </AuthProvider>
    </Router>
  );
}

export default App;
