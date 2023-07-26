import { createClient } from "next-sanity"
import Image from "next/image"
import styles from "../styles/Product.module.css"
import Button from "../components/Button"
import ProductSelect from "../components/ProductSelect"
import Notification from "../components/Notification"

const client = createClient({
  projectId: process.env.PROJECT_ID,
  dataset: process.env.DATASET,
  useCdn: true,
  apiVersion: "2021-10-21"
})


export async function generateMetadata({params: {productName}}) {
  const products = await client.fetch(`*[_type == "product" && slug.current == "${productName}"]{name}`)

  const [product] = products

  return {
    title: product?.name || "Product not found",
  }
}

 async function Product({params: {productName}}) {
  const products = await client.fetch(`*[_type == "product" && slug.current == "${productName}"]{name, slug, price, _id ,description, "image": image.asset->url}`)
  const [product] = products
  return (
    <div className={styles.product__grid}>
      {product !== undefined ? (<>   <Image src={product.image} alt={product.name} width={900} height={900} className={styles.product__image} />
      <div className={styles.product__info}>
        <h2 className={styles.product__title}>{product.name}</h2>
        <p>Price: <span>${product.price}</span></p>
        <label htmlFor="quantity"> quantity</label>
        <ProductSelect styles={styles.product__select}/>
        <p>{product.description}</p>
        <Button text="Add To The Cart" style={styles.product__btn} product={product}/>
      </div>
      <Notification /></>) : (<h1>Product not found</h1>)}
    </div>
  )
}

export default Product