import axios from 'axios'
import './App.css'
import { useState } from 'react';

function App() {
  const [cart, setCart] = useState([])
  const [message, setMessage] = useState('')

  const addItemToCart = async() => {
    const response = await axios.post('http://localhost:5000/api/v1/cart/add', {
      name: 'sample Item',
      price: 100,
      quantity:1
    })
    setCart(response.data.cart.items)
  };

  const checkout = async () => {
    const response = await axios.post('http://localhost:5000/api/v1/cart/checkout', {
      code: '' //pass dicount code if applicable
    })
    setMessage(response.data.message)
  }

  return (
    <div>
      <h1>E-commerce Store</h1>
      <button onClick={addItemToCart}>Add Item</button>
      <button onClick={checkout}>Checkout</button>
      <p>{message}</p>
    </div>
  );
}

export default App
