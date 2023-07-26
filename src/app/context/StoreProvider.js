'use client'
import { createContext, use, useEffect, useState } from 'react'

export const StoreContext = createContext({})

function StoreProvider({ children}) {
    const [cart, setCart] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [notification, setNotification] = useState(false)
    useEffect(() => {
        const cart = localStorage.getItem('cart')
        setCart(JSON.parse(cart))
    }
    ,[])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    ,[cart])
    
    const addToCart = (product) => {
        const item = cart.find((item) => item._id === product._id)
        if(item) {
            item.quantity += quantity
            const newCart = cart.map((object) => item._id === object._id ? item : object)
            setCart(newCart)
            setQuantity(1)
            setNotification(true)
            return
        }
        setQuantity(1)
        setNotification(true)
        return setCart([...cart, {...product, quantity}])
    }

    const removeFromCart = (product) => {
        const newCart = cart.filter((item) => item._id !== product._id)
        setCart(newCart)
    }

    const updateQuantity = (product, newQuantity) => {
        const item = cart.find((item) => item._id === product._id)
        if(item) {
            item.quantity = newQuantity
            const newCart = cart.map((object) => item._id === object._id ? item : object)
            setCart(newCart)
            return
        }
      };
      
  return (
    <StoreContext.Provider value={{cart, setCart, addToCart,quantity,setQuantity,removeFromCart, updateQuantity,notification, setNotification}}>
        {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider