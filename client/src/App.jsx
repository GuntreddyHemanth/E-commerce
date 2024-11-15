import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CartPage } from './pages/CartPage';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');
  const [theme, setTheme] = useState('current');
  const [orderCount, setOrderCount] = useState(0); // Track order count
  const navigate = useNavigate();

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

  // Load cart data from localStorage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Function to handle theme change
  const handleThemeChange = (e) => {
    setTheme(e.target.checked ? 'synthwave' : 'current');
    document.body.className = e.target.checked ? 'synthwave-theme' : '';
  };

  // Add item to the cart
  const addItemToCart = (product) => {
    try {
      const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItemIndex = savedCart.findIndex(item => item.name === product.title);

      if (existingItemIndex !== -1) {
        savedCart[existingItemIndex].quantity += 1;
      } else {
        savedCart.push({ name: product.title, price: product.price, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(savedCart));
      setCart(savedCart);
      setMessage(`${product.title} has been added to the cart.`);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setMessage('Error adding item to the cart.');
    }
  };

  // Remove item from the cart
  const removeItemFromCart = (productName) => {
    try {
      const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
      const updatedCart = savedCart.reduce((acc, item) => {
        if (item.name === productName) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, []);

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
      setMessage(`${productName} has been removed from the cart.`);
    } catch (error) {
      console.error('Error removing item from cart:', error);
      setMessage('Error removing item from the cart.');
    }
  };

  // Checkout function
  const checkout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/cart/checkout', {
        code: 'DISCOUNT - 1731433181937',
      });
      setMessage(response.data.message);
      setOrderCount(prevCount => prevCount + 1); // Increment order count on checkout
    } catch (error) {
      console.error('Error during checkout:', error);
      setMessage('Error during checkout.');
    }
  };

  return (
    <div className={`app-container ${theme === 'synthwave' ? 'synthwave-theme' : ''}`}>
      <h1>E-commerce Store</h1>
      
      {/* Cart Icon */}
      <div className="cart-icon" onClick={() => navigate('/cart')}>
        <img src="cart-icon.png" alt="Cart" style={{ width: '40px', cursor: 'pointer' }} />
        <span>{cart.length}</span>
      </div>

      <label className="flex cursor-pointer gap-2">
        <span className="label-text">Current</span>
        <input
          type="checkbox"
          value="synthwave"
          className="toggle theme-controller"
          onChange={handleThemeChange}
        />
        <span className="label-text">Synthwave</span>
      </label>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h2>Products</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {products.map((product) => {
                  const isInCart = cart.some(item => item.name === product.title);
                  return (
                    <div
                      key={product.id}
                      style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        style={{ width: '100%', cursor: 'pointer' }}
                        onClick={() => addItemToCart(product)}
                      />
                      <h3>{product.title}</h3>
                      <p>Price: ${product.price}</p>
                      <button
                        className="bg-[#1da1f2] text-white mt-6"
                        onClick={() => {
                          if (isInCart) {
                            removeItemFromCart(product.title);
                          } else {
                            addItemToCart(product);
                          }
                        }}
                      >
                        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          }
        />
        <Route
          path="/cart"
          element={<CartPage cart={cart} setCart={setCart} checkout={checkout} message={message} orderCount={orderCount} />}
        />
      </Routes>
    </div>
  );
}

export default App;
