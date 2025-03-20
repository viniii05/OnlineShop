document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');

    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product-item');
                productElement.innerHTML = `
                    <h2>${product.title}</h2>
                    <p>$${product.price}</p>
                    <button onclick="editProduct('${product.id}')">Edit</button>
                    <button onclick="deleteProduct('${product.id}')">Delete</button>
                `;
                productsContainer.appendChild(productElement);
            });
        });

    // Edit product function
    window.editProduct = function (productId) {
        const title = prompt('Enter new title:');
        const price = prompt('Enter new price:');

        fetch(`/api/editProduct/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, price })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            location.reload();
        });
    };

    // Delete product function
    window.deleteProduct = function (productId) {
        if (confirm('Are you sure you want to delete this product?')) {
            fetch(`/api/deleteProduct/${productId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                location.reload();
            });
        }
    };
});
