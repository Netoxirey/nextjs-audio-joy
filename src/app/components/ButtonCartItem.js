'use client'
import { useContext } from 'react';
import { StoreContext } from '../context/StoreProvider';
function ButtonCartItem({styles,item}) {
    const { removeFromCart  } = useContext(StoreContext);
  return (
    <button className={styles} onClick={() => removeFromCart(item)}>Delete</button>
  )
}

export default ButtonCartItem