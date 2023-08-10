// Import statements
'use client'

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import CartLink from './CartLink';

function NavBar() {
  // State and ref declarations
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Event handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSearch(false);
    if (search === '') return;
    router.push(`/search/${search}`);
    setSearch('');
  };
  console.log(inputRef)
  const handleSearch = () => {
    setShowSearch(true);
    inputRef.current.focus();
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Logo */}
        <Link href="/" className={styles.nav__link_logo}>
          <span>
            <Image width={30} height={30} src="/headphone-logo.svg" alt="headphone" />
          </span>
          <p className={styles.nav__link__title}>Audio Joy</p>
        </Link>

        {/* Search bar */}
        <form className={styles.nav__search} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Headphones"
            className={styles.nav__search__input}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button className={styles.nav__search__input__button}>
            <Image width={30} height={30} src="/search-logo.svg" alt="search icon" />
          </button>
        </form>

        {/* Mobile search button */}
        <button className={styles.nav__search__input__button_mobile} onClick={handleSearch}>
          <Image width={40} height={40} src="/search-logo-mobile.svg" alt="search icon" />
        </button>

        {/* Navigation links */}
        <Link href="/about" className={styles.nav__link}>
          About
        </Link>
        <Link href="/contact" className={styles.nav__link}>
          Contact
        </Link>
        <CartLink />

        {/* Hamburger menu */}
        <button className={styles.hamburger} onClick={() => setShow((prevShow) => !prevShow)}>
          <Image width={40} height={40} alt="user icon" src="/hamburger-menu-logo.svg" />
        </button>

        {/* Mobile search form */}
        <form
          onSubmit={handleSubmit}
          className={`${styles.nav__search__form__mobile} ${showSearch ? styles.nav__search__form__mobile__show : ''}`}
        >
          <input
            type="text"
            placeholder="Headphones"
            className={styles.nav__search__input__mobile}
            onChange={(e) => setSearch(e.target.value)}
            ref={inputRef}
            value={search}
          />
          <button type="button" className={styles.nav__search__cross}>
            <Image width={30} height={30} src="/cross-logo-white.svg" alt="cross" onClick={() => setShowSearch(false)} />
          </button>
        </form>
      </nav>

      {/* Mobile navigation links */}
      <nav className={`${styles.nav__mobile} ${show ? styles.nav__mobile__show : ''}`}>
        <Link href="/about" className={styles.nav__mobile__link} onClick={() => setShow(false)}>
          About
        </Link>
        <Link href="/contact" className={styles.nav__mobile__link} onClick={() => setShow(false)}>
          Contact
        </Link>
      </nav>
    </header>
  );
}

export default NavBar;
