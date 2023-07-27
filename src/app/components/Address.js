import React from 'react';
import Image from 'next/image';
import styles from '../styles/Summary.module.css';

function Address({ title, data, setData, form, setForm, formAddressError, handleSubmitAddress, handleCloseAddress }) {
    const { person, address, city, state, zip, country } = data;
  
    return (
      <>
        <h3>{title} address</h3>
        <p>{person}</p>
        <p>{address}</p>
        <p>{city}</p>
        <p>{state}</p>
        <p>{zip}</p>
        <p>{country}</p>
        <button className={styles.cart__summary__edit}>
          <Image src="/edit-logo.svg" alt="edit" width={30} height={30} onClick={() => setForm(form === title.toLowerCase() ? '' : title.toLowerCase())} />
        </button>
        <div className={`${styles.cart__modal} ${form === title.toLowerCase() ? styles.cart__modal__active : ''}`}>
          <form className={`${styles.cart__modal__content} ${form === title.toLowerCase() ? styles.cart__modal__content__active : ''}`} onSubmit={handleSubmitAddress}>
            <label htmlFor='name'>Name</label>
            <input type="text" name="name" id="name" onChange={(e) => setData({ ...data, person: e.target.value })} value={person} />
            <label htmlFor='address'>Address</label>
            <input type="text" name="address" id="address" onChange={(e) => setData({ ...data, address: e.target.value })} value={address} />
            <label htmlFor='city'>City</label>
            <input type="text" name="city" id="city" onChange={(e) => setData({ ...data, city: e.target.value })} value={city} />
            <label htmlFor="state">State/Province</label>
            <input type="text" name="state" id="state" onChange={(e) => setData({ ...data, state: e.target.value })} value={state} />
            <label htmlFor='zip'>Zip/PostalCode</label>
            <input type="text" name="zip" id="zip" onChange={(e) => setData({ ...data, zip: e.target.value })} value={zip} />
            <label htmlFor='country'>Country</label>
            <input type="text" name="country" id="country" value={country} onChange={(e) => setData({ ...data, country: e.target.value })} />
            <button className={styles.cart__modal__btn}>Save</button>
            {formAddressError && <p className={styles.cart__summary__section__error}>Please fill all the fields</p>}
            <Image src="/cross-logo.svg" alt="close" width={30} height={30} className={styles.cart__modal__cross} onClick={handleCloseAddress} />
          </form>
        </div>
      </>
    );
  }
  
  export default Address;