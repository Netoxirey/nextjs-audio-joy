'use client' 
import React, { useContext, useState, useRef } from 'react';
import { StoreContext } from '../context/StoreProvider';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Cart.module.css';
import ButtonCartItem from '../components/ButtonCartItem';
function CartItems() {
    const { cart, setQuantity, updateQuantity,} = useContext(StoreContext);

      const handleChange = (e, item) => {
        const newQuantity = +e.target.value;
        setQuantity(newQuantity);
        updateQuantity(item, newQuantity);
        setQuantity(1);
      };
    
  return (
    <div>
    {cart.length === 0 ? <h1>Your cart is empty</h1> : <h1>Your cart</h1>}
    {cart?.map((item) => (
      <div key={item._id} className={styles.cart__item}>
        <Image src={item.image} alt={item.name} width={300} height={300} className={styles.cart__image} />
        <h3>{item.name}</h3>
        <p>price: <span>${item.price} x {item.quantity}</span></p>
        <select className={styles.cart__item__select} defaultValue={item.quantity} onChange={(e) => handleChange(e, item)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <div className={styles.cart__item__btns}>
          <ButtonCartItem styles={styles.cart__item__btn} item={item}/>
        </div>
      </div>
    ))}
  </div>
  )
}

export default CartItems