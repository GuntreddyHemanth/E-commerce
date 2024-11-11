class Cart {
    constructor(){
        this.items = []
        this.totalAmount = 0
    }

    addItem(items) {
        this.items.push(items);
        this.totalAmount += items.price * items.quantity;
    }

    clearCart(){
        this.items = [];
        this.totalAmount = 0;
    }
}

module.exports = new Cart();