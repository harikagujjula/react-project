import { useState } from 'react';
import OSHeader from './OSHeader.jsx';
import Shop from './Shop.jsx';
import Product from './Product.jsx';
import './OnlineShoppingDemo.css';
import { DUMMY_PRODUCTS } from './dummy-products.js';
import { CartContext } from '../../store/shopping-cart-context.jsx';

/* 
  This setup is similar to Project management where a state is being shared 
  across components and props being forwarded through other components. 
  Ex: Props being forwarded from OnlineShoppingDemo > Shop > Product and 
  similarly OnlineShoppingDemo > OSHeader > CartModal > Cart. */
export default function OnlineShoppingDemo() {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  // Passing not just the Readable variables but also to update variables using context.
  const ctxValue = {
    items: shoppingCart.items,
    /* Passing handleAddItemToCart function as a value so that we can get rid of
     the code where we are sending this function as props and instead access 
     using context.*/
    addItemToCart: handleAddItemToCart
  }
  return (
    /* Wrapping all the components that need the CartContext created with 
    context as a component(Supportted by React >= 19).
    <CartContext.Provider> ....... </CartContext.Provider> should be used for React < 19. */
    
    /* Note: While using the wrapper, ensure value is passed as props. The 
    default value set when creating context(in shopping-cart-context.jsx) is 
    only used if a component that was not wrapped by <CartContext> tries to 
    access the context value.*/
    <CartContext value={ctxValue}>
      <OSHeader
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />
      {/*  Component composition: Wrapping a component and rendering using 
      children. No need of passing props anymore as we moved Product rendering 
      logic here which needs those props. */}
      {/* <Shop onAddItemToCart={handleAddItemToCart} /> */}
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={handleAddItemToCart} />
          </li>
        ))}
      </Shop>
    </CartContext>
  );
}
