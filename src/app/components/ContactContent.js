'use client'
import { useState } from "react"
import { useRouter } from 'next/navigation'
import styles from "../styles/Contact.module.css"
function ContactContent() {
    const [showModal, setShowModal] = useState(false)
    const router = useRouter()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      setShowModal(true)
    }
  
    const handleClose = () => {
      setShowModal(false)
      router.push('/')
    }
  return (
    <>
    <h1>Contact Us</h1>
      <p>Feel free to contact us at any time</p>
      <form className={styles.form__container} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="message">Message</label>
        <textarea name="message" id="message" cols="30" rows="10"></textarea>
        <button type="submit">Submit</button>
    </form>
    <div className={`${styles.contact__modal} ${showModal && styles.contact__modal__active}`}> 
        <div className={`${styles.contact__modal__content } ${showModal && styles.contact__modal__content__active }`}> 
            <h2>Thank you for your message</h2>
            <p>We will get back to you as soon as possible</p>
            <button onClick={handleClose} className={styles.contact__modal__btn}>Close</button>
        </div>
  </div>
    </>
  )
}

export default ContactContent