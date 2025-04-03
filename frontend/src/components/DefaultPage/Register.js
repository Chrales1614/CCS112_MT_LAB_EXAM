import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { CheckCircle } from "lucide-react";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "customer" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/register", formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            localStorage.setItem("token", response.data.token);
            setSuccess("Registration successful!");
            setTimeout(() => navigate("/dashboard"), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f4f1ea", fontFamily: "'Playfair Display', serif" }}>
            <div className="card p-5 shadow-lg" style={{ maxWidth: "420px", backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #d3b17d", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
                <h2 className="text-center mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: "bold", color: "#8b6f47" }}>Create an Account</h2>
                {error && <p className="alert alert-danger">{error}</p>}
                {success && (
                    <div className="alert alert-success d-flex align-items-center justify-content-center">
                        <CheckCircle className="me-2" size={20} />
                        {success}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="form-control" style={{ backgroundColor: "#faf8f5", border: "1px solid #d3b17d", color: "#4a3b2f", padding: "10px", borderRadius: "8px" }} />
                    </div>
                    <div className="mb-3">
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="form-control" style={{ backgroundColor: "#faf8f5", border: "1px solid #d3b17d", color: "#4a3b2f", padding: "10px", borderRadius: "8px" }} />
                    </div>
                    <div className="mb-3">
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="form-control" style={{ backgroundColor: "#faf8f5", border: "1px solid #d3b17d", color: "#4a3b2f", padding: "10px", borderRadius: "8px" }} />
                    </div>
                    <div className="mb-3">
                        <select name="role" value={formData.role} onChange={handleChange} className="form-select" style={{ backgroundColor: "#faf8f5", border: "1px solid #d3b17d", color: "#4a3b2f", padding: "10px", borderRadius: "8px" }}>
                            <option value="customer">Customer</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>
                    <button type="submit" className="btn w-100" style={{ backgroundColor: "#8b6f47", color: "#ffffff", fontWeight: "bold", padding: "12px", borderRadius: "8px" }}>Register</button>
                </form>
                <p className="text-center mt-3" style={{ fontFamily: "'Playfair Display', serif", color: "#4a3b2f" }}>
                    Already have an account? <Link to="/login" style={{ color: "#8b6f47", textDecoration: "underline" }}>Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;