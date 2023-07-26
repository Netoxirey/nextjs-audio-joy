 'use client'
import { useContext } from 'react'
import { StoreContext } from '../context/StoreProvider'
function Button({ text, style, product}) {
    const { addToCart } = useContext(StoreContext)
    const handleClick = () => { 
        addToCart(product)
    }
  return (
    <button onClick={handleClick}  className={style} >
        {text}
    </button>
  )
}

export default Button