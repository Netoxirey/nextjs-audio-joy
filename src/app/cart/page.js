
import styles from '../styles/Cart.module.css';
import Summary from '../components/Summary';
import CartItems from '../components/CartItems';

export const metadata = {
  title: 'Cart',
  description: 'Cart page',
};

function Cart() {
  return (
    <main className={styles.cart__container}>
      <CartItems />
      <Summary />
    </main>
  );
}

export default Cart;
