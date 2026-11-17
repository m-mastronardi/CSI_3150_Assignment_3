import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import CartDrawer from "./components/CartDrawer";
import CatalogPage from "./pages/CatalogPage";
import AlbumDetailPage from "./pages/AlbumDetailPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add albums to the shopping cart
  function addToCart(album, quantity = 1) {
    if (quantity < 1 || album.stock === 0) return;

    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === album.id);

      const currentQuantity = existingItem?.quantity || 0;
      const amountToAdd = Math.min(quantity, album.stock - currentQuantity);

      if (amountToAdd <= 0) return currentCart;

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === album.id
            ? { ...item, quantity: item.quantity + amountToAdd }
            : item,
        );
      }

      return [...currentCart, { ...album, quantity: amountToAdd }];
    });

    setIsCartOpen(true);
  }

  // Increase or decrease quantity
  function updateQuantity(albumId, change) {
    setCart((currentCart) =>
      currentCart
        .map((item) => {
          if (item.id !== albumId) return item;

          return {
            ...item,
            quantity: Math.min(item.stock, item.quantity + change),
          };
        })
        .filter((item) => item.quantity > 0),
    );
  }

  // Remove an album
  function removeFromCart(albumId) {
    setCart((currentCart) => currentCart.filter((item) => item.id !== albumId));
  }

  // Clear cart after checkout
  function clearCart() {
    setCart([]);
  }

  // Calculate total number of records
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Calculate cart subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <>
      <NavBar cartCount={cartCount} onToggleCart={() => setIsCartOpen(true)} />

      <Routes>
        <Route path="/" element={<CatalogPage onAddToCart={addToCart} />} />

        <Route
          path="/album/:albumId"
          element={<AlbumDetailPage onAddToCart={addToCart} />}
        />

        <Route
          path="/checkout"
          element={
            <CheckoutPage
              cart={cart}
              subtotal={subtotal}
              onClearCart={clearCart}
            />
          }
        />
      </Routes>

      <CartDrawer
        cart={cart}
        isOpen={isCartOpen}
        subtotal={subtotal}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </>
  );
}

export default App;
