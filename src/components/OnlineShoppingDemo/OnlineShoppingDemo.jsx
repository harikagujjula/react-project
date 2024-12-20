import OSHeader from './OSHeader.jsx';
import Shop from './Shop.jsx';
import Product from './Product.jsx';
import './OnlineShoppingDemo.css';
import CartContextProvider from '../../store/shopping-cart-context.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';

/* 
  This setup is similar to Project management where a state is being shared 
  across components and props being forwarded through other components. 
  Ex: Props being forwarded from OnlineShoppingDemo > Shop > Product and 
  similarly OnlineShoppingDemo > OSHeader > CartModal > Cart. */
export default function OnlineShoppingDemo() {

  return (
    /* Wrapping all the components that need the CartContext created with 
    context as a component(Supportted by React >= 19).
    <CartContext.Provider> ....... </CartContext.Provider> should be used for React < 19. */
    
    /* Note: While using the wrapper, ensure value is passed as props. The 
    default value set when creating context(in shopping-cart-context.jsx) is 
    only used if a component that was not wrapped by <CartContext> tries to 
    access the context value.*/
    // <CartContext value={ctxValue}>
    //   <OSHeader />
    //   {/*  Component composition: Wrapping a component and rendering using 
    //   children. No need of passing props anymore as we moved Product rendering 
    //   logic here which needs those props. */}
    //   {/* <Shop onAddItemToCart={handleAddItemToCart} /> */}
    //   <Shop>
    //     {DUMMY_PRODUCTS.map((product) => (
    //       <li key={product.id}>
    //         <Product {...product} />
    //       </li>
    //     ))}
    //   </Shop>
    // </CartContext>

    // Using the Custom CartContextProvider component, so that all context/state
    // data is at one place.
    <CartContextProvider>
      <OSHeader />
      {/*  Component composition: Wrapping a component and rendering using 
      children. No need of passing props anymore as we moved Product rendering 
      logic here which needs those props. */}
      {/* <Shop onAddItemToCart={handleAddItemToCart} /> */}
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}
