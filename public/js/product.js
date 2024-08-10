// public/js/products.js

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products')
      .then(response => response.json())
      .then(products => {
        const productList = document.getElementById('product-list');
        products.forEach(product => {
          const li = document.createElement('li');
          li.innerHTML = `
            <h2>${product.title}</h2>
            <img src="${product.imageUrl}" alt="${product.title}" style="width: 150px;">
            <p>Price: $${product.price.toFixed(2)}</p>
            <form action="/cart" method="POST">
              <input type="hidden" name="productId" value="${product.id}">
              <button type="submit">Add to Cart</button>
            </form>
          `;
          productList.appendChild(li);
        });
      });
  });
      