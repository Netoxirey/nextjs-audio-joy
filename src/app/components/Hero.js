import Image from "next/image"
import styles from '../styles/Hero.module.css'

function Hero() {
  return (
    <div className={styles.hero}>
        <div className={styles.hero__container}>
            <h1 className={styles.hero__text}>Guaranteed Quality and Performance<br></br>Design and Functionality in One Place</h1>
            <Image src='/hero-image.png' alt='hero image' width={500} height={500} className={styles.hero__image} />
            <div className={styles.hero__draw }></div>
        </div>
        
    </div>
  )
}

export default Hero