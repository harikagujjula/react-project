import { createContext } from "react";

// Creating a context with an initial value(of any type, object here) which contains React component that we would need.
export const CartContext = createContext({
  // To store shopping cart items.
  items: []
});

