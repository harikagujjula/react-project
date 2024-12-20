import { useRef, useContext } from 'react';
import onlineShoppingLogo from '../../assets/OnlineShopping/online-shopping-logo.png';
import CartModal from './CartModal.jsx';
import { CartContext } from '../../store/shopping-cart-context.jsx';

export default function OSHeader() {
  const modal = useRef();
  // Consuming Context.
  const { items } = useContext(CartContext);

  const cartQuantity = items.length;

  function handleOpenCartClick() {
    modal.current.open();
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal
        ref={modal}
        // Getting rid of props as we are accessing them using context.
        // cartItems={cart.items}
        // onUpdateCartItemQuantity={onUpdateCartItemQuantity}
        title="Your Cart"
        actions={modalActions}
      />
      <header id="main-header">
        <div id="main-title">
          <img src={onlineShoppingLogo} alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}
