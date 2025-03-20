import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // <-- Track loading status!
    const navigate = useNavigate();

    // Validate session on page load or refresh
    const validateSession = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/user/`, {
                withCredentials: true,
            });
            localStorage.setItem("token", JSON.stringify(res.data.user.id_token));
            console.log("✅ Session valid:", res.data.user);

            setUser(res.data.user);
        } catch (err) {
            console.log("❌ Session expired or user not logged in:", err.response?.status);
            setUser(null);
            // No navigation here! Let ProtectedRoute handle it.
        } finally {
            setLoading(false); // <-- Done validating session
        }
    };

    const login = async (idToken) => {
        try {
            const res = await axios.post(
                `${API_BASE_URL}/login/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                    withCredentials: true,
                }
            );
            setUser(res.data.user);
            localStorage.setItem("isLoggedIn", JSON.stringify(true));
            console.log("✅ Login success:", res.data.user);
            // navigate("/dashboard");
        } catch (err) {
            console.error("❌ Login failed:", err);
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${API_BASE_URL}/logout/`, {}, { withCredentials: true });
            setUser(null);
            localStorage.setItem("isLoggedIn", JSON.stringify(false));
            localStorage.removeItem("token");
            navigate("/");
            console.log("✅ Logout successful");
        } catch (err) {
            console.error("❌ Logout failed:", err);
        }
    };

    useEffect(() => {
        validateSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, setUser, validateSession, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
