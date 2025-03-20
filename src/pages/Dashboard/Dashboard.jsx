import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Preloader from "../../components/Preloader";

function Dashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const delayNavigation = async () => {
            if (!user) {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 3 seconds
            }

            switch (user?.role) {
                case "admin":
                    navigate("/admin/dashboard");
                    break;
                case "event_manager":
                    navigate("/event-manager/dashboard");
                    break;
                case "staff":
                    navigate("/staff/dashboard");
                    break;
                case "client":
                    navigate("/client/dashboard");
                    break;
                default:
                    console.error("Invalid role");
                    break;
            }
        };

        delayNavigation();
    }, [user, navigate]);

    return(
        
        <div>

            <Preloader />
            {!user && (
                <div className="flex items-center justify-center h-screen">
                    <h1 className="text-3xl font-bold">Please login first</h1>
                </div>
            )}
            </div>
    );
    
}

export default Dashboard;
