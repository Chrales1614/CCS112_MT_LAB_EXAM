import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Import the styles

const Dashboard = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://127.0.0.1:8000/api/logout", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                onLogout();
                navigate("/");
            }
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <div className="dashboard-layout">
            {/* Header */}
            <header className="dashboard-header">
                <h1>Klick Inc.</h1>
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </header>

            {/* Sidebar and Main Content */}
            <div className="dashboard-body">
                {/* Sidebar */}
                <aside className="dashboard-sidebar">
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#profile">Profile</a></li>
                        <li><a href="#settings">Settings</a></li>
                    </ul>
                </aside>

            {/* Main Container */}
                <main className="dashboard-main">
                    <h2>Welcome to the Dashboard</h2>
                    <p>This is our main content area.</p>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
