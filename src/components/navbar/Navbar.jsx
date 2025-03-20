import { React, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
// import axios from "axios";
// import { useAuth } from "../../context/AuthProvider";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import "./Navbar.css";

export default function Navbar() {
    // const [user, setUser] = useState(null);
    const { user } = useAuth();
    const { logout } = useAuth();

    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;


    const handleLogout = () => {
        logout();
        localStorage.setItem("isLoggedIn", JSON.stringify(false)); // Set isLoggedIn to false
        // setUser(null);
    };

    useEffect(() => {
    }, [isLoggedIn]);

    return (
        <header className="header-area header-sticky">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <nav className="main-nav">
                            {/* Logo */}
                            <Link to="/" className="logo">
                                Q-<em>Events</em>
                            </Link>

                            {/* Navigation Links */}
                            <ul className="nav" style={{ marginLeft: "400px" }}>
                                <li>
                                    <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/events" className={({ isActive }) => (isActive ? "active" : "")}>
                                        Events
                                    </NavLink>
                                </li>

                                {!isLoggedIn ? (
                                    <>
                                        <li>
                                            <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                                                Login
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/signup" className={({ isActive }) => (isActive ? "active" : "")}>
                                                Signup
                                            </NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <li>
                                            <NavLink to="/login" onClick={handleLogout}  className={({ isActive }) => (isActive ? "active" : "")}>
                                        {/* <button onClick={handleLogout} > */}
                                            Logout
                                        {/* </button> */}
                                    </NavLink>
                                    </li>
                                )}

                                <li className="relative">
                                    {!user && (
                                        <span
                                            className="absolute -top-1 -right-0.5 bg-gray-500 text-white p-0.5 rounded-full"
                                            title="Please login first"
                                        >
                                            <LockClosedIcon className="h-4 w-4" />
                                        </span>

                                    )}
                                    <NavLink
                                        to="/dashboard"  // Prevents navigation as it will be handled dynamically based on role
                                        className={({ isActive }) =>
                                            window.location.pathname.includes("dashboard") ? "active" : ""
                                        }>
                                        Dashboard
                                    </NavLink>
                                </li>
                            </ul>

                            {/* Mobile Menu Trigger */}
                            <a className="menu-trigger">
                                <span>Menu</span>
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
