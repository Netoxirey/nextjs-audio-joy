'use client'
import React, { useContext, useState, useRef, useEffect } from 'react';
import { StoreContext } from '../context/StoreProvider';
import styles from '../styles/Summary.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Address from './Address'; // Importamos el componente Address

const DiscountCode = {
  test10: 0.10,
  test20: 0.20,
  test30: 0.30,
};

function Summary() {
  const { cart, setCart } = useContext(StoreContext);
  const inputRef = useRef(null);
  const checkoutRef = useRef(null);
  const [cartModal, setCartModal] = useState(false);
  const [shipping, setShipping] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState(false);
  const [form, setForm] = useState('');
  const [formAddressError, setFormAddressError] = useState(false);
  const [address, setAddress] = useState({
    person: 'Anna McLoan',
    address: 'Rosenstrasse 2043',
    city: 'Munich',
    state: 'Baviera',
    zip: '81604',
    country: 'Germany',
  });
  const [billing, setBilling] = useState({
    person: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

  useEffect(() => {
    const isCartEmpty = cart.length === 0;
    const isAddressIncomplete = Object.values(address).some((value) => value === '');
    const isBillingIncomplete = Object.values(billing).some((value) => value === '');

    if (isCartEmpty || isAddressIncomplete || isBillingIncomplete) {
      inputRef.current.disabled = true;
    } else {
      inputRef.current.disabled = false;
    }
  }, [cart, address, billing]);

  useEffect(() => {
    if (address !== billing && checkoutRef.current) {
      checkoutRef.current.checked = false;
    }
  }, [address, billing]);

  const handleSubmitAddress = (e, title) => {
    e.preventDefault();
    const currentAddress = title === 'Delivery' ? address : billing;
    if (!currentAddress.person || !currentAddress.address || !currentAddress.city || !currentAddress.state || !currentAddress.zip || !currentAddress.country) {
      setFormAddressError(true);
      return;
    }
    setFormAddressError(false);
    if (title === 'Delivery') {
      setAddress(currentAddress);
    } else {
      setBilling(currentAddress);
    }
    setForm('');
    if (checkoutRef.current) {
      checkoutRef.current.checked = false;
    }
  };

  const handleCloseAddress = (title) => {
    setForm('');
    if (title === 'Delivery') {
      setAddress({ ...address });
    } else {
      setBilling({ ...billing });
    }
    setFormAddressError(false);
  };

  const handleRadioChange = (e) => {
    setShipping(+e.target.value);
  };

  const handleOrder = () => {
    setCartModal(true);
    setCart([]);
  };

  const handleDiscount = (e) => {
    if (!e.target.value) {
      setDiscount(0);
      setError(false);
      return;
    }
    if (DiscountCode[e.target.value]) {
      setDiscount(Math.round(total * DiscountCode[e.target.value]));
      setError(false);
      return;
    }
    setError(true);
  };

  return (
    <>
      <div className={styles.cart__summary}>
        <h2>Summary</h2>
        {/* Delivery Address */}
        <div className={styles.cart__summary__section}>
          <Address
            title="Delivery"
            data={address}
            setData={setAddress}
            form={form}
            setForm={setForm}
            formAddressError={formAddressError}
            handleSubmitAddress={(e) => handleSubmitAddress(e, 'Delivery')}
            handleCloseAddress={() => handleCloseAddress('Delivery')}
          />
        </div>
        {/* Billing Address */}
        <div className={styles.cart__summary__section}>
          <Address
            title="Billing"
            data={billing}
            setData={setBilling}
            form={form}
            setForm={setForm}
            formAddressError={formAddressError}
            handleSubmitAddress={(e) => handleSubmitAddress(e, 'Billing')}
            handleCloseAddress={() => handleCloseAddress('Billing')}
          />
          <div className={styles.cart__summary__checkbox}>
            <input type="checkbox" name="billing" id="billing" onChange={() => setBilling(address)} ref={checkoutRef} />
            <label htmlFor="billing">Same as delivery address</label>
          </div>
        </div>
        {/* Payment Method */}
        <div className={styles.cart__summary__section}>
          <h3>Payment method</h3>
          <p>PayPal</p>
          <button className={styles.cart__summary__edit}>
            <Image src="/edit-logo.svg" alt="edit" width={30} height={30} />
          </button>
        </div>
        {/* Discount Code */}
        <div className={styles.cart__summary__section}>
          <h3>Discount code or gift card</h3>
          <input type="text" className={styles.cart__summary__section__input} onChange={handleDiscount} />
          {error && <p className={styles.cart__summary__section__error}>Invalid code</p>}
        </div>
        {/* Shipping Method */}
        <div className={styles.cart__summary__section}>
          <h3>Shipping method</h3>
          <label>
            <input type="radio" name="shipping" value={0} onChange={handleRadioChange} defaultChecked />
            Free Shipping (3-7 days)
          </label>
          <br />
          <label>
            <input type="radio" name="shipping" value={15} onChange={handleRadioChange} />
            Express Shipping (1-3 days) - $15
          </label>
        </div>
        {/* Total Cost */}
        <div className={styles.cart__summary__section}>
          <h3>Total cost</h3>
          <p>Discount code: <span>${discount ? discount : 0}</span></p>
          <p>Items: <span>{cart.reduce((acc, product) => acc + product.quantity, 0)}</span></p>
          <p>Shipping: <span>{shipping !== 0 ? "$15" : "free"}</span></p>
          <p>Total: <span>${total + shipping - discount}</span></p>
        </div>
        {/* Order and Pay Button */}
        <button className={styles.cart__btn} onClick={handleOrder} ref={inputRef}>Order and pay</button>
        {/* Cart Modal */}
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
      </div>
    </>
  );
}

export default Summary;
