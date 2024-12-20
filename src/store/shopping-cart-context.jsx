import { createContext, useState } from "react";
import { DUMMY_PRODUCTS } from '../components/OnlineShoppingDemo/dummy-products.js';



/* Creating a context with an initial value(of any type, object here) which 
  contains React component that we would need. Having default value defined 
  allows developer to get autosuggestions with the properties available inside 
  a context. */
export const CartContext = createContext({
  // To store shopping cart items.
  items: [],
  // Property that will be used to access adding item to cart function. Empty dummy function for now.
  addItemToCart: () => {},
  // Property that will be used to access cart update function. Empty dummy function for now.
  updateItemQuantity: () => {}
});

/* 
  Moving all the Context/State related code in to this function to prevent it 
  sitting at one place that could be cumbersome when we have more contexts and 
  more states. */
export default function CartContextProvider({children}) {
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
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity
  }

  // Returning the CartContext with Children.
  return <CartContext.Provider value={ctxValue}>
    {children}
  </CartContext.Provider>
}