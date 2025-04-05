import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Button } from "react-bootstrap";

const CartTable = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [contact, setContact] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [address, setAddress] = useState("");

  const primaryColor = "rgb(63, 82, 138)";
  const lightText = "#ffffff";

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not authenticated.");

        const response = await axios.get("http://localhost:8000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCartItems(response.data || []);
      } catch (err) {
        setError("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleSelectItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated.");
        return;
      }

      const response = await axios.delete(
        `http://localhost:8000/api/cart/${itemId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        alert("Item removed from cart.");
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemId)
        );
      } else {
        alert("Failed to remove item.");
      }
    } catch (err) {
      alert("Failed to remove item.");
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalQuantity = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!address.trim()) {
      alert("Please enter your address.");
      return;
    }
    if (!contact.trim()) {
      alert("Please enter your contact number.");
      return;
    }
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated.");
        return;
      }

      const selectedCartItems = cartItems.filter((item) =>
        selectedItems.includes(item.id)
      );

      const response = await axios.post(
        "http://localhost:8000/api/checkout",
        { address, contact, paymentMethod, items: selectedCartItems },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert("Checkout successful! Order ID: " + response.data.order_id);

        const remainingItems = cartItems.filter(
          (item) => !selectedItems.includes(item.id)
        );
        setCartItems(remainingItems);

        setSelectedItems([]);
        setShowSummary(false);
        setCheckoutStep(1);
        setAddress("");
        setContact("");
        setPaymentMethod("");
      } else {
        alert(response.data.message || "Failed to checkout.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred during checkout.");
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center mt-4">
        <Spinner animation="border" style={{ color: primaryColor }} />
        <span className="ms-3 text-muted">Loading...</span>
      </div>
    );

  if (error)
    return <p className="text-danger text-center fw-bold">{error}</p>;

  return (
    <div>
      <h5>Total Items in Cart: {totalItems}</h5>
      <div className="table-responsive mt-3">
        <table className="table table-bordered shadow-sm">
          <thead
            className="text-center"
            style={{ backgroundColor: primaryColor, color: lightText }}
          >
            <tr>
              <th></th>
              <th className = "text-white">Product</th>
              <th className = "text-white">Price</th>
              <th className = "text-white">Quantity</th>
              <th className = "text-white">Total</th>
              <th className = "text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>₱{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>₱{item.price * item.quantity}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted fw-bold py-3">
                  Your cart is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {cartItems.length > 0 && (
          <Button
            variant="primary"
            className="mt-3"
            style={{
              backgroundColor: "rgb(66, 83, 136)",
              borderColor: "rgb(66, 83, 136)",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "rgb(33, 41, 65)";
              e.target.style.borderColor = "rgb(33, 41, 65)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "rgb(66, 83, 136)";
              e.target.style.borderColor = "rgb(66, 83, 136)";
            }}
            onClick={() => setShowSummary(true)}
        >
          Checkout Selected
        </Button>
        
        )}
      </div>

      {showSummary && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div
                className="modal-header"
                style={{ backgroundColor: primaryColor, color: lightText }}
              >
                <h5 className="modal-title">Order Summary</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowSummary(false)}
                ></button>
              </div>
              <div className="modal-body">
                {checkoutStep === 1 ? (
                  <>
                    <p>Total Quantity: {totalQuantity}</p>
                    <p>Total Price: ₱{totalPrice}</p>
                  </>
                ) : (
                  <>
                    <label>Enter Address:</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your address"
                      required
                    />
                    <label>Contact Number:</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="Enter your contact number"
                      required
                    />
                    <label>Payment Method:</label>
                    <select
                      className="form-control mb-2"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select a payment method</option>
                      <option value="Gcash">Cash on Delivery</option>
                      <option value="Gcash">Gcash</option>
                      <option value="Maya">Maya</option>
                      <option value="Credit/Debit Card">Credit/Debit Card</option>
                    </select>
                  </>
                )}
              </div>
              <div className="modal-footer">
                {checkoutStep === 1 ? (
                  <Button
                    style={{ backgroundColor: primaryColor, borderColor: primaryColor }}
                    onClick={() => setCheckoutStep(2)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button variant="success" onClick={handleCheckout}>
                    Checkout
                  </Button>
                )}
                <Button variant="secondary" onClick={() => setShowSummary(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartTable;
