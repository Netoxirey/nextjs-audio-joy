import Link from 'next/link';
import styles from '../styles/Footer.module.css';
import Image from 'next/image';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__creator}>
          <h2>Created By Ernesto Serna</h2>
          <div className={styles.footer__creator__logos}>
            <Link href="https://www.linkedin.com/in/ernesto-serna-guerrero/" target='_blank'>
              <Image src="/linkedin-logo.svg" alt="linkedin" width={50} height={50} />
            </Link>
            <Link href="https://github.com/Netoxirey" target='_blank'>
              <Image src="/github-logo.svg" alt="github" width={50} height={50} />
            </Link>
          </div>
        </div>
          <div className={styles.footer__rights}>
          <p>@2023 Electronic Joy. All Rights Reserved</p>
          <div className={styles.footer__rights__contact}>
            <p>Email: <span>ernestoserna94<br />@gmail.com</span></p>
            <p>Phone: <span>+52-834-254-7065</span></p>
          </div>
         </div>
      </div>
      
    </footer>
  )
}

export default Footer