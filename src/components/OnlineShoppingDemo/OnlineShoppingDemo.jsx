import { useState } from 'react';
import OSHeader from './OSHeader.jsx';
import Shop from './Shop.jsx';
import Product from './Product.jsx';
import './OnlineShoppingDemo.css';
import { DUMMY_PRODUCTS } from './dummy-products.js';

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

  return (
    <>
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
    </>
  );
}
