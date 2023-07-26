

import React from 'react'
import styles from "../styles/Contact.module.css"
import ContactContent from '../components/ContactContent'



export const metadata = {
  title: "Contact",
  description: "Contact page",
}
function Contact() {
  
  return (
    <div className={styles.contact__container}>
      <ContactContent />
    </div>
    
  )
}

export default Contact