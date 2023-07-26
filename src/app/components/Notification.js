'use client'
import { useContext } from "react"
import { StoreContext } from "../context/StoreProvider"
import Image from "next/image"
import styles from "../styles/Notification.module.css"
import { useRouter } from "next/navigation"

function Notification() {
    const { notification, setNotification } = useContext(StoreContext)
    if(notification) {
        setTimeout(() => {
            setNotification(false)
        }, 3000)
    }
    const router = useRouter()
    const handleClick = () => {
        router.push(`/cart`)
        setNotification(false)
    }

    
  return (
    <div onClick={handleClick} className={`${styles.notification__container} ${notification && styles.notification__show} `}>
        <h2>Success</h2>
        <div className={styles.notification__message}>
            <Image src="/check-logo.svg" alt="success" width={30} height={30} />
            <p>Your product has been added to the cart</p>
        </div>
        <div className={`${notification && styles.notification__progress_bar}`}  />
        
    </div>
  )
}

export default Notification