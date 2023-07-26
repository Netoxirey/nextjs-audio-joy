import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from "../styles/SearchProductCard.module.css"
function SearchCard({product}) {
  return (
    <div key={product._id} className={styles.product__card}>
    <Link href={`/${product.slug.current}`}><Image src={product.image} alt={product.name} width={300} height={300} className={styles.product__image} /></Link>
    <div>
    <Link href={`/${product.slug.current}`} className={styles.product__title}>{product.name}</Link>
        <p className={styles.product__description}>{product.description}</p>
    </div>
</div>
  )
}

export default SearchCard