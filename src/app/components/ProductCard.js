import Link from "next/link"
import Image from "next/image"
import styles from "../styles/ProductCard.module.css"

function ProductCard({ product}) { // destructuring the product object
  const { name, image, price, description, slug } = product
  return (
    <div key={name} className={styles.products__card}>
          <Link href={`/${slug.current}`}><Image src={image} alt={name} width={300} height={300} className={styles.products__card__image} /></Link>
          <Link href={`/${slug.current}`}><h2 className={styles.product__card__title}>{name}</h2></Link>
          <p>Price: <span className={styles.product__card__price}>${price}</span></p>
          <p className={styles.products__card_description}>{description}</p>
          <Link href={`/${slug.current}`} className={styles.products__card__link}><button className={styles.products__card__btn}>View Product</button></Link>
        </div>
  )
}

export default ProductCard