import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Login from "../DefaultPage/Login"; // Import Login component

const ProductCatalog = ({ products }) => {
    const [showModal, setShowModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null); // Track hovered card

    const handleShowModal = (product) => {
        const token = localStorage.getItem("token");

        if (!token) {
            setSelectedProduct(product);
            setShowLoginModal(true);
        } else {
            setSelectedProduct(product);
            setQuantity(1);
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setError(null);
    };

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    };

    const handleLoginSuccess = () => {
        setShowLoginModal(false);
        setQuantity(1);
        setShowModal(true);
    };

    const handleAddToCart = async () => {
        if (!selectedProduct) return;
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("You need to be logged in to add to cart.");
                setLoading(false);
                return;
            }

            const response = await axios.post(
                "http://localhost:8000/api/cart",
                {
                    product_id: selectedProduct.id,
                    quantity: quantity,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            console.log("Added to cart:", response.data);
            handleCloseModal();
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // Styles
    const cardStyle = (productId) => ({
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: hoveredCard === productId ? "translateY(-8px)" : "none", // Elevate on hover
        boxShadow:
            hoveredCard === productId
                ? "0 12px 20px rgba(0, 0, 0, 0.2)"
                : "0 4px 8px rgba(0, 0, 0, 0.1)",
    });

    const buttonStyle = {
        backgroundColor: "rgb(33, 41, 65)", // Default color
        color: "white",
        border: "none",
        transition: "background-color 0.3s ease",
    };

    const buttonHoverStyle = {
        backgroundColor: "rgb(72, 79, 121)", // Hover color
    };

    const [isButtonHovered, setIsButtonHovered] = useState(false);

    return (
        <div className="row">
            <div className="col-12 mb-4">
                <h3 className="text-dark mb-2">Featured Product:</h3>
                <hr className="mb-4" />
            </div>

            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                products.map((product) => (
                    <div key={product.id} className="col-md-4 mb-4">
                        <div
                            className="card h-100"
                            style={cardStyle(product.id)} // Apply hover style
                            onMouseEnter={() => setHoveredCard(product.id)} // Track hover
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div style={{ height: "400px", overflow: "hidden" }}>
                                <img
                                    src={product.image}
                                    className="card-img-top"
                                    alt={product.name}
                                    style={{ objectFit: "cover", height: "100%", width: "100%" }}
                                />
                            </div>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text flex-grow-1">{product.description}</p>
                                <div className="mt-auto">
                                    <p className="card-text">
                                        <strong>₱{product.price}</strong>
                                    </p>
                                    <button
                                        className="btn w-100"
                                        style={{
                                            ...buttonStyle,
                                            ...(isButtonHovered ? buttonHoverStyle : {}),
                                        }}
                                        onMouseEnter={() => setIsButtonHovered(true)}
                                        onMouseLeave={() => setIsButtonHovered(false)}
                                        onClick={() => handleShowModal(product)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}

            {/* Modal for adding to cart */}
            {selectedProduct && (
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedProduct.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img
                            src={selectedProduct.image}
                            className="img-fluid mb-3"
                            alt={selectedProduct.name}
                        />
                        <p>{selectedProduct.description}</p>
                        <p>
                            <strong>Price:</strong> ₱{selectedProduct.price}
                        </p>
                        <p>
                            <strong>Stock:</strong> {selectedProduct.stock}
                        </p>
                        {error && <p className="text-danger">{error}</p>}
                        <Form>
                            <Form.Group controlId="quantity">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button
                            style={{
                                ...buttonStyle,
                                ...(isButtonHovered ? buttonHoverStyle : {}),
                            }}
                            onMouseEnter={() => setIsButtonHovered(true)}
                            onMouseLeave={() => setIsButtonHovered(false)}
                            onClick={handleAddToCart}
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "Add to Cart"}
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            {/* Login Modal */}
            <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Login Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="mb-3">Please login to add products to your cart.</p>
                    <Login inModal={true} onSuccess={handleLoginSuccess} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseLoginModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProductCatalog;
