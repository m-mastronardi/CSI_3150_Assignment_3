import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CheckoutPage({ cart, subtotal, onClearCart }) {
  const navigate = useNavigate();

  // Store customer information
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
  });

  // Track successful order submission
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Keep form inputs updated with React state
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  // Handle checkout submission
  function handleSubmit(event) {
    event.preventDefault();

    if (cart.length === 0) {
      alert("Your shopping cart is empty.");
      return;
    }

    // Check that all fields contain information
    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== "",
    );

    if (!allFieldsFilled) {
      alert("Please complete all required fields.");
      return;
    }

    // Validate postal code (US ZIP code)
    if (!/^\d{5}(-\d{4})?$/.test(formData.postalCode)) {
      alert("Please enter a valid ZIP code.");
      return;
    }

    // Basic payment field validation
    const cardDigits = formData.cardNumber.replace(/\s/g, "");

    if (!/^\d{13,19}$/.test(cardDigits)) {
      alert("Please enter a valid card number.");
      return;
    }

    if (!/^\d{3,4}$/.test(formData.cvv)) {
      alert("Please enter a valid security code.");
      return;
    }

    const expirationMatch = formData.expiration.match(
      /^(0[1-9]|1[0-2])\/(\d{2})$/,
    );

    if (!expirationMatch) {
      alert("Enter the expiration date as MM/YY.");
      return;
    }

    const month = Number(expirationMatch[1]);
    const year = 2000 + Number(expirationMatch[2]);
    const today = new Date();

    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      alert("Please enter a future expiration date.");
      return;
    }

    // Clear cart and show confirmation
    onClearCart();
    setIsSubmitted(true);
  }

  // Display confirmation after checkout
  if (isSubmitted) {
    return (
      <main className="checkout-page">
        <div className="order-confirmation">
          <h1>Order Confirmed!</h1>

          <p>
            Thank you for shopping with VinylVault! Your order has been
            successfully submitted.
          </p>

          <p>We hope you enjoy your new records.</p>

          <button
            type="button"
            className="checkout-button"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <Link to="/" className="back-link">
        ← Continue Shopping
      </Link>

      <div className="checkout-heading">
        <h1>Checkout</h1>
        <p>You're one step away from your next favorite record.</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-checkout">
          <h2>Your cart is empty</h2>
          <p>Add some records before checking out.</p>

          <Link to="/" className="checkout-button">
            Browse Records
          </Link>
        </div>
      ) : (
        <div className="checkout-container">
          {/* Shipping and Payment Form */}
          <section className="checkout-form-section">
            <form onSubmit={handleSubmit}>
              <h2>Shipping Information</h2>

              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Street Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main Street"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="12345"
                  required
                />
              </div>

              <h2>Payment Information</h2>

              <p className="payment-note">
                Demo checkout only. Do not enter real payment details.
              </p>

              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  inputMode="numeric"
                  autoComplete="off"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiration">Expiration Date</label>
                  <input
                    type="text"
                    id="expiration"
                    name="expiration"
                    value={formData.expiration}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    inputMode="numeric"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="place-order-button">
                Place Order - ${subtotal.toFixed(2)}
              </button>
            </form>
          </section>

          {/* Order Summary */}
          <section className="order-summary">
            <h2>Order Summary</h2>

            {cart.map((item) => (
              <div className="order-item" key={item.id}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="order-item-image"
                />

                <div className="order-item-info">
                  <h3>{item.title}</h3>
                  <p>{item.artist}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>${item.price.toFixed(2)} each</p>
                </div>

                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </div>
            ))}

            <div className="order-total">
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>

            <p className="cart-note">
              This is a demonstration storefront. No real payments will be
              processed.
            </p>
          </section>
        </div>
      )}
    </main>
  );
}

export default CheckoutPage;
