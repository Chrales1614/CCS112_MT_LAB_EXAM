import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login", formData);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.user.name);
            localStorage.setItem("role", response.data.user.role);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f4f1ea", fontFamily: "'Playfair Display', serif" }}>
            <div className="card p-5 shadow-lg" style={{ maxWidth: "420px", backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #d3b17d", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
                <h2 className="text-center mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: "bold", color: "#8b6f47" }}>Luxury Watch Login</h2>
                {error && <p className="alert alert-danger">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                            className="form-control" 
                            style={{ backgroundColor: "#faf8f5", border: "1px solid #d3b17d", color: "#4a3b2f", padding: "10px", borderRadius: "8px" }}
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                            className="form-control" 
                            style={{ backgroundColor: "#faf8f5", border: "1px solid #d3b17d", color: "#4a3b2f", padding: "10px", borderRadius: "8px" }}
                        />
                    </div>
                    <button type="submit" className="btn w-100" style={{ backgroundColor: "#8b6f47", color: "#ffffff", fontWeight: "bold", padding: "12px", borderRadius: "8px" }}>Login</button>
                </form>
                <p className="text-center mt-3" style={{ fontFamily: "'Playfair Display', serif", color: "#4a3b2f" }}>
                    Don't have an account? <Link to="/register" style={{ color: "#8b6f47", textDecoration: "underline" }}>Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;