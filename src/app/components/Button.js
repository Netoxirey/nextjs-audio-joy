 'use client'
import { useContext } from 'react'
import { StoreContext } from '../context/StoreProvider'
function Button({ text, style, product}) {
    const {name, price, image, _id} = product
    const { addToCart } = useContext(StoreContext)
    const handleClick = () => { 
        const newProduct = {name, price, image, _id}
        addToCart(product)
    }
  return (
    <button onClick={handleClick}  className={style} >
        {text}
    </button>
  )
}

export default Button