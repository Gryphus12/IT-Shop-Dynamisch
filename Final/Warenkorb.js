// Cart im localStorage speichern
function saveCart(cart) {
    const cartString = JSON.stringify(cart);
    localStorage.setItem('cart', cartString);
}

// Warenkorb aus dem localStorage auslesen
function getCart() {
    let cartString = localStorage.getItem('cart');

    if (cartString === null || cartString.indexOf('undefined') > -1) {
        cartString = '{"items": []}';
    }
    return JSON.parse(cartString);
}

// Warenkorb leeren
function clearCart() {
    localStorage.clear();
}

// Produkt zum Warenkorb hinzufügen
function addToCart(productId, amount) {
    const cart = getCart();
    for (let i = 0; i < cart.items.length; i++) {
        let currentItem = cart.items[i];
        // Produkt bereits im Warenkorb
        if (currentItem.pid === productId) {
            cart.items[i].amount += amount;
            saveCart(cart);
            return;
        }
    }
    cart.items.push({ pid: productId, amount: amount });

    saveCart(cart);
}

// Produkt aus dem Warenkorb entfernen
function removeFromCart(productId) {
    const cart = getCart();
    for (let i = 0; i < cart.items.length; i++) {
        let currentItem = cart.items[i];
        if (currentItem.pid === productId) {
            // Element aus dem array löschen
            cart.items.splice(i, 1);
            break; 
        }
    }
    saveCart(cart);
}