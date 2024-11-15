import React, { useState, useEffect } from 'react';
import './CartPage.css';

export const CartPage = ({ cart, setCart, checkout, message, orderCount }) => {
  const [couponCode, setCouponCode] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [generatedCoupon, setGeneratedCoupon] = useState('');

  // Generate coupon code logic based on order count
  useEffect(() => {
    if (orderCount > 0 && orderCount % 3 === 0) {
      const newCoupon = `DISCOUNT-${Date.now()}`;
      setGeneratedCoupon(newCoupon);
      setShowPopup(true); // Show the popup when a new coupon is generated
    }
  }, [orderCount]);

  // Handle coupon popup visibility
  const handleCouponClick = () => {
    setShowPopup(!showPopup);
  };

  // Remove item from cart
  const removeItem = (itemName) => {
    const updatedCart = cart.filter(item => item.name !== itemName);
    setCart(updatedCart);
  };

  // Update item quantity
  const updateQuantity = (itemName, quantity) => {
    const updatedCart = cart.map(item =>
      item.name === itemName ? { ...item, quantity: parseInt(quantity, 10) } : item
    );
    setCart(updatedCart);
  };

  // Handle coupon code input change
  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  // Apply coupon
  const handleApplyCoupon = () => {
    if (couponCode === generatedCoupon) {
      setShowPopup(true); // Show the popup with the coupon code
      alert('Coupon applied successfully!');
    } else {
      alert('Invalid Coupon Code');
    }
  };

  // Handle copying the coupon code to the clipboard
  const handleCopyCoupon = () => {
    try {
      navigator.clipboard.writeText(generatedCoupon).then(() => {
        alert('Coupon code copied to clipboard!');
      }).catch(err => {
        alert('Failed to copy coupon code. Please try again.');
        console.error('Copy failed:', err);
      });
    } catch (err) {
      alert('Clipboard access is not available.');
      console.error('Clipboard error:', err);
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {message && <p className="cart-message">{message}</p>}

      {/* Display coupon box if a coupon is generated */}
      {generatedCoupon && (
        <div className="coupon-box" onClick={handleCouponClick}>
          <p>Click here to view your coupon code</p>
        </div>
      )}

      {/* Coupon Popup */}
      {showPopup && generatedCoupon && (
        <div className="coupon-popup">
          <div className="popup-content">
            <h3>Your Coupon Code</h3>
            <p>{generatedCoupon}</p>
            <button onClick={handleCopyCoupon}>Copy Coupon</button>
            <button onClick={handleCouponClick}>Close</button>
          </div>
        </div>
      )}

      {/* Coupon Input Form (Before Checkout) */}
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
        <button className="apply-coupon-button" onClick={handleApplyCoupon}>
          Apply Coupon
        </button>
      </div>

      {/* Cart Items */}
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

          {/* Checkout Button */}
          <button className="checkout-button" onClick={checkout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};












// import React, { useState, useEffect } from 'react';
// import './CartPage.css';

// export const CartPage = ({ cart, setCart, checkout, message, orderCount }) => {
//   const [couponCode, setCouponCode] = useState('');
//   const [showPopup, setShowPopup] = useState(false);
//   const [generatedCoupon, setGeneratedCoupon] = useState('');

//   // Generate coupon code logic based on order count
//   useEffect(() => {
//     if (orderCount > 0 && orderCount % 3 === 0) {
//       const newCoupon = `DISCOUNT-${Date.now()}`;
//       setGeneratedCoupon(newCoupon);
//       setShowPopup(true); // Show the popup when a new coupon is generated
//     }
//   }, [orderCount]);

//   // Handle coupon popup visibility
//   const handleCouponClick = () => {
//     setShowPopup(!showPopup);
//   };

//   // Remove item from cart
//   const removeItem = (itemName) => {
//     const updatedCart = cart.filter(item => item.name !== itemName);
//     setCart(updatedCart);
//   };

//   // Update item quantity
//   const updateQuantity = (itemName, quantity) => {
//     const updatedCart = cart.map(item =>
//       item.name === itemName ? { ...item, quantity: parseInt(quantity, 10) } : item
//     );
//     setCart(updatedCart);
//   };

//   return (
//     <div className="cart-page">
//       <h2>Your Cart</h2>
//       {message && <p className="cart-message">{message}</p>}

//       {/* Display coupon box if a coupon is generated */}
//       {generatedCoupon && (
//         <div className="coupon-box" onClick={handleCouponClick}>
//           <p>Click here to view your coupon code</p>
//         </div>
//       )}

//       {showPopup && generatedCoupon && (
//         <div className="coupon-popup">
//           <div className="popup-content">
//             <h3>Your Coupon Code</h3>
//             <p>{generatedCoupon}</p>
//             <button
//               onClick={() => {
//                 try {
//                   navigator.clipboard.writeText(generatedCoupon).then(() => {
//                     alert('Coupon code copied to clipboard!');
//                   }).catch(err => {
//                     alert('Failed to copy coupon code. Please try again.');
//                     console.error('Copy failed:', err);
//                   });
//                 } catch (err) {
//                   alert('Clipboard access is not available.');
//                   console.error('Clipboard error:', err);
//                 }
//               }}
//             >
//               Copy Coupon
//             </button>
//             <button onClick={handleCouponClick}>Close</button>
//           </div>
//         </div>
//       )}

//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div>
//           <table className="cart-table">
//             <thead>
//               <tr>
//                 <th>Product</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <th>Total</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cart.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.name}</td>
//                   <td>${item.price.toFixed(2)}</td>
//                   <td>
//                     <input
//                       type="number"
//                       min="1"
//                       value={item.quantity}
//                       onChange={(e) => updateQuantity(item.name, e.target.value)}
//                       className="quantity-input"
//                     />
//                   </td>
//                   <td>${(item.price * item.quantity).toFixed(2)}</td>
//                   <td>
//                     <button
//                       className="remove-button"
//                       onClick={() => removeItem(item.name)}
//                     >
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button className="checkout-button" onClick={checkout}>
//             Proceed to Checkout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };



