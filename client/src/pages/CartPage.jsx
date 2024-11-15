import React, { useState } from 'react';
import './CartPage.css';

export const CartPage = ({ cart, setCart, checkout, message }) => {
  const [couponCode, setCouponCode] = useState('');

  // Handle coupon code change
  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  // Remove item from cart
  const removeItem = (itemName) => {
    // Filter out the item to remove
    const updatedCart = cart.filter(item => item.name !== itemName);
    
    // Update the cart state in the parent
    setCart(updatedCart);
    
    // Optionally log or handle any additional cleanup logic if necessary
    console.log(`Removing item: ${itemName}`);
  };

  // Update item quantity
  const updateQuantity = (itemName, quantity) => {
    // Update the quantity for the matching item
    const updatedCart = cart.map(item =>
      item.name === itemName ? { ...item, quantity: parseInt(quantity, 10) } : item
    );
    
    // Update the cart state
    setCart(updatedCart);
    console.log(`Updating ${itemName} to quantity: ${quantity}`);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {message && <p className="cart-message">{message}</p>}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.name, e.target.value)}
                      className="quantity-input"
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="remove-button"
                      onClick={() => removeItem(item.name)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="coupon-container">
            <label htmlFor="coupon">Enter Coupon Code:</label>
            <input
              type="text"
              id="coupon"
              value={couponCode}
              onChange={handleCouponChange}
              placeholder="Enter code"
              className="coupon-input"
            />
            <button className="apply-coupon-button">Apply Coupon</button>
          </div>
          <button className="checkout-button" onClick={checkout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};









// export const CartPage = ({ cart, checkout, message }) => (
//     <div>
//       <h2>Cart</h2>
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <ul>
//           {cart.map((item, index) => (
//             <li key={index}>
//               {item.name} - ${item.price} x {item.quantity}
//             </li>
//           ))}
//         </ul>
//       )}
//       <button onClick={checkout}  className="bg-[#1da1f2] text-white mt-6">Checkout</button>
//       {message && <p>{message}</p>}
//     </div>
//   );


  