
import Hero from './components/Hero'
import { createClient,  } from 'next-sanity'
import styles from './styles/Home.module.css'
import ProductCard from './components/ProductCard'

const client = createClient({
  projectId: process.env.PROJECT_ID,
  dataset: process.env.DATASET,
  useCdn: true,
  apiVersion: "2021-10-21"
})

const products = await client.fetch(`*[_type == "product"]{name, slug, price, description, _id, "image": image.asset->url}`)

// Map over the products array and return a ProductCard component for each one.
export default function Home() {
  return (
    <main>
      <Hero />
      <div className={styles.products__grid}>
      {products?.map(product => (
        <ProductCard key={product._id} product={product}  className={styles.products__card}/>
    ))}
      </div>
    </main>
  )
}
