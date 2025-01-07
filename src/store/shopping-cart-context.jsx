import { createContext, useReducer } from "react";
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
  Moving all the Context/State related code from OnlineShoppingDemo.jsx in to this function to prevent it
  sitting at one place that could be cumbersome when we have more contexts and
  more states. */
  /* Below code is replaced by using useReducer hook instead of useState. */
// export default function CartContextProvider({children}) {
//   const [shoppingCart, setShoppingCart] = useState({
//     items: [],
//   });

//   function handleAddItemToCart(id) {
//     setShoppingCart((prevShoppingCart) => {
//       const updatedItems = [...prevShoppingCart.items];

//       const existingCartItemIndex = updatedItems.findIndex(
//         (cartItem) => cartItem.id === id
//       );
//       const existingCartItem = updatedItems[existingCartItemIndex];

//       if (existingCartItem) {
//         const updatedItem = {
//           ...existingCartItem,
//           quantity: existingCartItem.quantity + 1,
//         };
//         updatedItems[existingCartItemIndex] = updatedItem;
//       } else {
//         const product = DUMMY_PRODUCTS.find((product) => product.id === id);
//         updatedItems.push({
//           id: id,
//           name: product.title,
//           price: product.price,
//           quantity: 1,
//         });
//       }

//       return {
//         items: updatedItems,
//       };
//     });
//   }

//   function handleUpdateCartItemQuantity(productId, amount) {
//     setShoppingCart((prevShoppingCart) => {
//       const updatedItems = [...prevShoppingCart.items];
//       const updatedItemIndex = updatedItems.findIndex(
//         (item) => item.id === productId
//       );

//       const updatedItem = {
//         ...updatedItems[updatedItemIndex],
//       };

//       updatedItem.quantity += amount;

//       if (updatedItem.quantity <= 0) {
//         updatedItems.splice(updatedItemIndex, 1);
//       } else {
//         updatedItems[updatedItemIndex] = updatedItem;
//       }

//       return {
//         items: updatedItems,
//       };
//     });
//   }

//   // Passing not just the Readable variables but also to update variables using context.
//   const ctxValue = {
//     items: shoppingCart.items,
//     /* Passing handleAddItemToCart function as a value so that we can get rid of
//      the code where we are sending this function as props and instead access
//      using context.*/
//     addItemToCart: handleAddItemToCart,
//     updateItemQuantity: handleUpdateCartItemQuantity
//   }

//   // Returning the CartContext with Children.
//   return <CartContext.Provider value={ctxValue}>
//     {children}
//   </CartContext.Provider>
// }

/* Reducer function that is called on dispatch accepts state and action
automatically by React. This function can be defined outside the component. */
function shoppingCartReducer(state, action) {
  // Adding Item.
  if (action.type === 'ADD_ITEM') {
      const updatedItems = [...state.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === action.payload
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
        updatedItems.push({
          id: action.payload,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        ...state, // Copying the existing state. This is not needed here as we have only one property.
        items: updatedItems,
      };
  }
  // Update Item.
  if (action.type === 'UPDATE_ITEM') {
    const updatedItems = [...state.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === action.payload.productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += action.payload.amount

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        ...state, // Copying the existing state. This is not needed here as we have only one property.
        items: updatedItems,
      };
  }
  return state;
}

// Using useReducer hook instead of useState with all the context related code at one place.
export default function CartContextProvider({children}) {
  // const [shoppingCart, setShoppingCart] = useState({
  //   items: [],
  // });
  /* useReducer hook Accepts a function that is called on dispatch, a default value for the state.
   & Similar to useState Returns updated state, dispatch function instead of state update function. */
  const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, {items: []});

  function handleAddItemToCart(id) {
    // Moving all logic to the reducer function and dispatching an action.
    shoppingCartDispatch({
      // An identifier for the action.
      type: 'ADD_ITEM',
      // Additional data that is required to update the state. Using payload as a convention.
      payload: id
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    // Moving all logic to the reducer function and dispatching an action.
    shoppingCartDispatch({
      // An identifier for the action.
      type: 'UPDATE_ITEM',
      // Additional data that is required to update the state. Using payload as a convention.
      payload: {
        productId,
        amount
      }
    });
  }

  // Passing not just the Readable variables but also to update variables using context.
  const ctxValue = {
    items: shoppingCartState.items,
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
