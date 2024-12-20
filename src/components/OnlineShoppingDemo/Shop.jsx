// import { DUMMY_PRODUCTS } from './dummy-products.js';
// import Product from './Product.jsx';

export default function Shop({ children }) {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>

      <ul id="products">
        {/* Moving this to  OnlineShoppingDemo to utilize Component composition and get rid of props drilling. */}

        {/* {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={onAddItemToCart} />
          </li>
        ))} */}
        {/* Rendering Products using children. */}
        {children}
      </ul>
    </section>
  );
}
