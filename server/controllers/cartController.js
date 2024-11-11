const cart = require("../models/Cart")
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
    const {code} = req.body
    let discount = 0;

    if (discountCode && code === discountCode){
        discount = 0.1 * cart.totalAmount;
        discountCode = null;
    }
    const finalAmount = cart.totalAmount - discount
    orderCount++

    if (orderCount % 3 === 0){//Assuming every 3rd order generate a new code
        discountCode = `DISCOUNT - ${Date.now()}`
    }
    cart.clearCart();
    res.status(200).json({
        message: 'order placed successfully',
        finalAmount,
        discount,
        newDiscountCode: discountCode || 'N/A',
    });
};
