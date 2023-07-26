'use client'
import { useContext } from 'react'
import { StoreContext } from '../context/StoreProvider'

function ProductSelect({styles}) {
    const {quantity, setQuantity} = useContext(StoreContext)
  return (
    <select name="quantity" id="quantity" className={styles} onChange={(e) => setQuantity(+e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
  )
}

export default ProductSelect