class Cart {
    constructor(){
        this.items = [];
        this.totalAmount = 0;
    }

    addItem(item) {
        this.items.push(item);
        this.totalAmount += item.price * item.quantity;
    }

    clearCart() {
        this.items = [];
        this.totalAmount = 0;
    }

    removeItem(productId) {
        const itemIndex = this.items.findIndex(item => item.id === productId);
        if (itemIndex === -1) {
            return false; // Item not found
        }
    
        const item = this.items[itemIndex];
        this.items.splice(itemIndex, 1); // Remove item from array
        this.totalAmount -= item.price * item.quantity; // Adjust total amount
        return true; // Successfully removed
    }
    
}

module.exports = Cart; // This exports the Cart class
