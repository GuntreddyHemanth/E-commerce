let totalItemsSold = 0;
let totalRevenue = 0;
let discountCodes = [];
let totalDiscountGiven = 0;

exports.getStats = (req, res) => {
    res.status(200).json({
        totalItemsSold,
        totalRevenue,
        discountCodes,
        totalDiscountGiven,
    })
}

exports.generateDiscountCode = (req, res) => {
    const newCode = `ADMIN-DISCOUNT - ${Date.now()}`;
    discountCodes.push(newCode)
    res.status(200).json({newCode})
}