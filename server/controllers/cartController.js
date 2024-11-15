const Cart = require("../models/Cart")
const cart = new Cart(); // Create an instance of the Cart class
let orderCount = 0;
let discountCode = null;

exports.addItemToCart = (req, res) => {
    const {name, price, quantity} = req.body
    if (!name || !price || !quantity){
        return res.status(400).json({error: 'Invalid item details'})
    }
    cart.addItem({name, price, quantity})
    return res.status(200).json({message: 'Item added to cart', cart})
}

exports.checkout = (req, res) => {
    const { cart, code } = req.body;  // Assuming cart and code are being passed from the front-end
    let discount = 0;

    // Calculate the total amount of the cart
    const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Check if the coupon code is valid and apply the discount (10%)
    if (discountCode && code === discountCode) {
        discount = 0.1 * totalAmount; // Apply 10% discount
        discountCode = null;  // Reset the discount code after use
    }

    // Calculate the final amount after applying the discount
    const finalAmount = totalAmount - discount;

    // Increment order count and generate a new discount code for every 3rd order
    orderCount++;
    if (orderCount % 3 === 0) {
        discountCode = `DISCOUNT-${Date.now()}`;
    }

    // Clear the cart after placing the order (assuming the `cart` is an array)
    cart.length = 0;  // Clear the cart using this approach

    // Respond with the original amount, discount, and final amount
    res.status(200).json({
        message: 'Order placed successfully',
        originalAmount: totalAmount.toFixed(2),
        discount: discount.toFixed(2),
        finalAmount: finalAmount.toFixed(2),
        newDiscountCode: discountCode || 'N/A',  // New code if applicable, else 'N/A'
    });
};


exports.removeItem = (req, res) => {
    const { productId } = req.body; // Ensure `productId` is passed from the client side
    console.log('Received request to remove item:', productId);

    if (!productId) {
        return res.status(400).json({ error: 'Product ID is required' });
    }

    // Call the `removeItem` method using `productId`
    const success = cart.removeItem(productId);
    if (!success) {
        return res.status(404).json({ error: 'Item not found in the cart' });
    }

    res.status(200).json({ message: 'Item removed from the cart', cart });
};
