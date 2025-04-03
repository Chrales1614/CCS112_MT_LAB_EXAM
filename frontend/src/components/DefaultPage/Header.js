import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar, Nav, Button, Badge, Container, Dropdown } from "react-bootstrap";
import { ShoppingCart, User } from "lucide-react";

const Header = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem("username") || "Guest";
    const role = localStorage.getItem("role") || "User";
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("User not authenticated.");

                const response = await axios.get("http://localhost:8000/api/cart", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const totalItems = response.data.reduce((sum, item) => sum + item.quantity, 0);
                setCartCount(totalItems);
            } catch (err) {
                console.error("Failed to fetch cart count:", err);
            }
        };

        fetchCartCount();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <Navbar 
            expand="lg" 
            className="shadow-lg p-3 mb-3 rounded border-0" 
            style={{ 
                background: "linear-gradient(135deg, #3E2723, #795548)", 
                color: "#FFF", 
                boxSizing: "border-box", 
                width: "100%" 
            }} // Darker brown gradient with auto-fit sizing
        >
            <Container fluid>
                <Navbar.Brand 
                    href="/dashboard" 
                    className="text-light fw-bold fs-4" 
                    style={{ letterSpacing: "2px", fontFamily: "'Poppins', sans-serif" }}
                >
                    ⏱ Luxury Watch
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav className="align-items-center">
                        {role === "customer" && (
                            <Button 
                                variant="outline-light" 
                                className="d-flex align-items-center me-3 rounded-pill px-3 py-2 border-0 shadow-sm" 
                                onClick={() => navigate("/cart")}
                            > 
                                <ShoppingCart size={20} className="me-1" />
                                <Badge bg="danger" className="rounded-pill" style={{ fontSize: "0.8rem", padding: "5px 8px" }}>
                                    {cartCount}
                                </Badge>
                            </Button>
                        )}

                        {/* Profile Dropdown */}
                        <Dropdown align="end">
                            <Dropdown.Toggle 
                                variant="outline-light" 
                                className="d-flex align-items-center rounded-pill px-3 py-2 border-0 shadow-sm"
                            >
                                <User size={20} className="me-2" />
                                <span className="fw-semibold">{username}</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="shadow border-0">
                                {/* Profile and settings options, but only logout will function */}
                                <Dropdown.Item onClick={() => console.log("Profile settings (not functional)")}>
                                    Profile Settings
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => console.log("Name edit (not functional)")}>
                                    Edit Name
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleLogout} className="text-danger">
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
