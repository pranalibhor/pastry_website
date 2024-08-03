let cart = [];

function addToCart(title, image,  price) {
    const item = {
        title: title,
        image: image,
         price: price
    };
    cart.push(item);
    alert(`${title} ,has been added to your cart. You have ${cart.length} items in your cart.`);
    updateCartSummary();
}

function viewCart() {
    const cartSection = document.getElementById('cart');
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous items
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'col-md-4 mb-4';
            cartItem.innerHTML = `
                <div class="card">
                    <img class="card-img-top" src="${item.image}" alt="Card image">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                         
                        <p class="card-text"><strong>Price:</strong> ₹${item.price}</p>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }
    
    cartSection.classList.remove('d-none');
    cartSection.scrollIntoView({ behavior: 'smooth' });
    updateCartSummary();
}

function updateCartSummary() {
    const cartSummary = document.getElementById('cart-summary');
    cartSummary.innerHTML = '';

    if (cart.length > 0) {
        const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
        const summary = document.createElement('div');
        summary.innerHTML = `
            <p><strong>Total Price:</strong> ₹${totalPrice.toFixed(2)}</p>
            <button class="btn btn-success" onclick="checkout()">Checkout</button>
        `;
        cartSummary.appendChild(summary);
    }
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to your cart before checking out.");
    } else {
        alert(`You have ordered: ${cart.map(item => item.title).join(", ")}. Total price: ₹${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}. Thank you for your purchase!`);
        cart = []; // Clear the cart after placing the order
        viewCart(); // Refresh the cart view
    }
}
