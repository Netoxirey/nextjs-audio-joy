import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import { StoreContext } from '../context/StoreProvider'
function CartLink({styles}) {
    const {cart} = useContext(StoreContext)
    const totalInCart = cart.reduce((acc, item) => acc + item.quantity, 0)
  return (
    <Link href="/cart"><Image width={30} height={30} alt='cart icon' src='/cart-logo.svg' /><span>{totalInCart}</span></Link> 
  )
}

export default CartLink