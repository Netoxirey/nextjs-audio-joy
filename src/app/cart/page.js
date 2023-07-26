'use client'
import React, { useContext, useState, useRef } from 'react';
import { StoreContext } from '../context/StoreProvider';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Cart.module.css';

export const metadata = {
  title: 'Cart',
  description: 'Cart page',
};

function Cart() {
  const { cart, removeFromCart, setQuantity, updateQuantity, setCart } = useContext(StoreContext);
  const [cartModal, setCartModal] = useState(false);
  const [shipping, setShipping] = useState(0); 
  const inputRef = useRef(null);

  if (cart.length === 0 && inputRef.current) {
    inputRef.current.disabled = true;
  }

  const handleChange = (e, item) => {
    const newQuantity = +e.target.value;
    setQuantity(newQuantity);
    updateQuantity(item, newQuantity);
    setQuantity(1);
  };

  const handleRadioChange = (e) => {
    setShipping(+e.target.value);
  };

  const handleOrder = () => {
    setCartModal(true);
    setCart([]);
  };

  return (
    <main className={styles.cart__container}>
      <div>
        {cart.length === 0 ? <h1>Your cart is empty</h1> : <h1>Your cart</h1>}
        {cart?.map((item) => (
          <div key={item._id} className={styles.cart__item}>
            <Image src={item.image} alt={item.name} width={300} height={300} className={styles.cart__image} />
            <h3>{item.name}</h3>
            <p>price: <span>${item.price}</span></p>
            <select className={styles.cart__item__select} defaultValue={item.quantity} onChange={(e) => handleChange(e, item)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <div className={styles.cart__item__btns}>
              <button className={styles.cart__item__btn} onClick={() => removeFromCart(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.cart__summary}>
        <h2>Summary</h2>
        <div className={styles.cart__summary__section}>
          <h3>Delivery address</h3>
          <p>Anna McLoan</p>
          <p>Rosenstrasse 2043</p>
          <p>Munich</p>
          <p>81604</p>
          <p>Germany</p>
        </div>
        <div className={styles.cart__summary__section}>
          <h3>Billing address</h3>
          <p>Same as delivery address</p>
        </div>
        <div className={styles.cart__summary__section}>
          <h3>Payment method</h3>
          <p>PayPal</p>
        </div>
        <div className={styles.cart__summary__section}>
          <h3>Discount code or gift card</h3>
          <input type="text" className={styles.cart__summary__section__input}/>
        </div>
        <div className={styles.cart__summary__section}>
          <h3>Shipping method</h3>
          <label>
            <input type="radio" name="shipping" value={0} onChange={handleRadioChange} defaultChecked/>
              Free Shipping (3-7 days)
          </label>
          <br />
          <label>
            <input type="radio" name="shipping" value={15} onChange={handleRadioChange}/>
              Express Shipping (1-3 days) - $15
          </label>
          <p>Standard: <span>free</span> | 3 - 7 days |</p>
          <p>Express: <span>$15</span> | 1 - 3 days |</p>
        </div>
        <div className={styles.cart__summary__section}>
          <h3>Total cost</h3>
          <p>Items: <span>{cart.reduce((acc, product) => acc + product.quantity,0)}</span></p>
          <p>Shipping: <span>{shipping !== 0 ?  "$15": "free"}</span></p>
          <p>Total: <span>${cart.reduce((acc, item) => acc + item.price * item.quantity, 0) + shipping}</span></p>
        </div>
        <button className={styles.cart__btn} onClick={handleOrder} ref={inputRef}>Order and pay</button>
      </div>

      <div className={`${styles.cart__modal} ${cartModal && styles.cart__modal__active}`}>
        <div className={`${styles.cart__modal__content} ${cartModal && styles.cart__modal__content__active}`}>
          <h2>Your order has been processed</h2>
          <Image src="/check-logo.svg" alt="check mark" width={100} height={100} className={styles.cart__modal__image} />
          <p>Thank you for your purchase</p>
          <Link href="/">
            <button className={styles.cart__modal__btn}>Continue shopping</button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Cart;
