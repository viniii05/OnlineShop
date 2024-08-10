document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            window.__PRODUCTS__ = products; // Attach products to a global variable
            initializeProductList();
        })
        .catch(error => console.error('Error fetching products:', error));
});

function initializeProductList() {
    const productList = document.getElementById('product-list');
    if (window.__PRODUCTS__ && productList) {
        window.__PRODUCTS__.forEach(product => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h2>${product.title}</h2>
                <img src="${product.imageUrl}" alt="${product.title}" style="width: 150px;">
                <p>Price: $${product.price.toFixed(2)}</p>
                <button onclick="viewDetails('${product.id}')">View Details</button>
                <button onclick="addToCart('${product.id}')">Add to Cart</button>
            `;
            productList.appendChild(li);
        });
    }
}

function viewDetails(productId) {
    window.location.href = `/products/${productId}`;
}

function addToCart(productId) {
    fetch('/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `productId=${productId}`
    })
    .then(response => {
        if (response.ok) {
            alert('Product added to cart');
        } else {
            alert('Failed to add product to cart');
        }
    })
    .catch(error => console.error('Error adding product to cart:', error));
}
