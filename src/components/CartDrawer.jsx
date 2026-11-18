import { useNavigate } from "react-router-dom";

function CartDrawer({
  cart,
  isOpen,
  subtotal,
  onClose,
  onUpdateQuantity,
  onRemove,
}) {
  const navigate = useNavigate();

  // Calculate total number of records
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Navigate to checkout page
  function handleCheckout() {
    onClose();
    navigate("/checkout");
  }

  return (
    <>
      {/* Dark background behind the cart */}
      {isOpen && <div className="cart-overlay" onClick={onClose}></div>}

      {/* Slide-over Cart */}
      <aside
        className={`cart-drawer ${isOpen ? "open" : ""}`}
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        <div className="cart-header">
          <div>
            <h2>Your Cart</h2>
            <p>{totalItems} records selected</p>
          </div>

          <button
            type="button"
            className="close-cart"
            onClick={onClose}
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {/* Cart Items */}
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added any records yet.</p>

              <button
                type="button"
                onClick={onClose}
                className="continue-shopping"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                {/* Album Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-image"
                />

                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>{item.artist}</p>

                  <span className="cart-item-price">
                    ${item.price.toFixed(2)}
                  </span>

                  {/* Quantity Controls */}
                  <div className="cart-item-actions">
                    <div className="cart-quantity">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        disabled={item.quantity >= item.stock}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>

                  <p className="cart-line-total">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="subtotal-row">
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>

            <p className="cart-note">
              Shipping and taxes calculated at checkout.
            </p>

            <button
              type="button"
              className="checkout-button"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>

            <button
              type="button"
              className="continue-shopping"
              onClick={onClose}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;
