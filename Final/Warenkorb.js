// Cart im localstorage

function saveCart(cart){
    const cartString = JSON.stringify(cart);
    localStorage.setItem('cart', cartString);
}

// Warenkorb aus dem localstorage auslesen

function getCart(){
    let cartString = localStorage.getItem('cart');

    if (cartString === null || cartString.indexOf('undfined') > -1){
        cartString = '{"Items ":  []}';
    }
    return JSON.parse(cartString);
}

// Warenkorb leeren

function clearCart(){
    localStorage.clear();
}


// Produkt zum Warenkorb hinzufügen

function addToCart(KategorieID, amount){    //Umgeändert von produktID
    const Cart = getCart();
    for (let i = 0; i < cart.items.length; i++){
        let currentItem = cart.items[i];

    // Produkt bereits im Warenkorb

    if(currentItem.pid === KategorieID){
        cart.Items[i].amount += amount;
        saveCart(cart);
        return;
    }
    }

    cart.items.push({pid: KategorieID, amount: amount});

    saveCart(cart);
}

// Produkt aus dem Warenkorb entfernen

function removeFromCart(KategorieID){
    const cart = getCart();
    for (let i = 0; i < cart.items.length; i++){
        let currentItem = cart.items[i];
        if (currentItem.pid === KategorieID){

            //Element aus dem array löschen

            cart.items.splice(i, 1);
            break;
        }
    }

    saveCart(cart);
}