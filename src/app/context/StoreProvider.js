'use client'
import { createContext, useContext, useEffect, useState } from 'react';

export const StoreContext = createContext({});

function updateCartItem(cart, setCart, item, quantity) {
  const newCart = cart.map((object) =>
    item._id === object._id ? { ...item, quantity } : object
  );
  setCart(newCart);
}

function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    const cartStorage = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(cartStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    if (quantity <= 0) return;

    const item = cart.find((item) => item._id === product._id);
    if (item) {
      item.quantity += quantity;
      updateCartItem(cart, setCart, item, item.quantity);
      setQuantity(1);
      setNotification(true);
    } else {
      setNotification(true);
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (product) => {
    const newCart = cart.filter((item) => item._id !== product._id);
    setCart(newCart);
  };

  const updateQuantity = (product, newQuantity) => {
    if (newQuantity <= 0) return;

    const item = cart.find((item) => item._id === product._id);
    if (item) {
      item.quantity = newQuantity;
      updateCartItem(cart, setCart, item, newQuantity);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        quantity,
        setQuantity,
        removeFromCart,
        updateQuantity,
        notification,
        setNotification,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export default StoreProvider;
