import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import AdminDashboard from '../AdminPage/AdminDashboard';
import CustomerDashboard from '../CustomerPage/CustomerDashboard';
import './Dashboard.css'; // Relative path to the Dashboard.css file



const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: "", role: "" });
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUsername = localStorage.getItem("username");
        const storedRole = localStorage.getItem("role");

        if (!token || !storedUsername || !storedRole) {
            navigate("/login");
            return;
        }

        setUser({ username: storedUsername, role: storedRole });

        if (storedRole === "customer") {
            setCartCount(3); // Sample cart count, replace with actual data fetching
        }
    }, [navigate]);

    return (
        <div className="dashboard-container">
            <Header cartCount={user.role === "customer" ? cartCount : null} />

            <main className="main-content">
                {user.role === "admin" ? (
                    <AdminDashboard />
                ) : user.role === "customer" ? (
                    <CustomerDashboard />
                ) : (
                    <p>Loading content...</p>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
