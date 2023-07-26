import { createClient } from "next-sanity"
import Image from "next/image"
import Link from "next/link"
import styles from "../../styles/SearchProductCard.module.css"
const client = createClient({
    projectId: process.env.PROJECT_ID,
    dataset: process.env.DATASET,
    useCdn: true,
    apiVersion: "2021-10-21"
    })



async function ProductSearch({params: {productSearch}}) {
  const products = await client.fetch(`*[_type == "product" && (name match "${productSearch}*" || category match "${productSearch}*")]{
    name,
    slug,
    price,
    _id,
    description,
    "image": image.asset->url
  }`);
  

  return (
    <main className={styles.products__container}>
      {products.length === 0 && <h2>No products found</h2>}
        {products.map(product => (
          <div key={product._id} className={styles.product__card}>
            <Link href={`/${product.slug.current}`}>
              <Image src={product.image} alt={product.name} width={300} height={300} className={styles.product__image}/>
            </Link>
            <div>
            <Link href={`/${product.slug.current}`}><h2 className={styles.product__title}>{product.name}</h2></Link> 
            <p className={styles.product__price}>${product.price}</p>
            <p className={styles.product__description}>{product.description}</p>
            </div>
          </div>
      
        ))}
    </main>
  )
}

export default ProductSearch