import { createContext } from "react";

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

