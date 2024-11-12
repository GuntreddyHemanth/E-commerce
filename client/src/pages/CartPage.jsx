export const CartPage = ({ cart, checkout, message }) => (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price} x {item.quantity}
            </li>
          ))}
        </ul>
      )}
      <button onClick={checkout}>Checkout</button>
      {message && <p>{message}</p>}
    </div>
  );


  