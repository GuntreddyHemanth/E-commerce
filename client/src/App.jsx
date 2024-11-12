import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Function to handle adding an item to the cart
  const addItemToCart = async (product) => {
    try {
      const response = await axios.post('http://localhost:5000/api/cart/add', {
        name: product.title,
        price: product.price,
        quantity: 1 // You can customize this based on user input
      });
      setCart(response.data.cart.items);
      setMessage(`${product.title} has been added to the cart.`);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setMessage('Error adding item to the cart.');
    }
  };

  // Function to handle checkout
  const checkout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/cart/checkout', {
        code: '' // Pass a discount code if applicable
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error during checkout:', error);
      setMessage('Error during checkout.');
    }
  };

  return (
    <div>
      <h1>E-commerce Store</h1>

      <h2>Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: '100%', cursor: 'pointer' }}
              onClick={() => addItemToCart(product)} // Add item to cart on image click
            />
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>

      <button onClick={checkout}>Checkout</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
