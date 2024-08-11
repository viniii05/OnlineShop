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
      

  document.addEventListener('DOMContentLoaded', () => {
    fetch('/product-data')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            products.forEach(product => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <h2>${product.title}</h2>
                    <img src="${product.imageUrl}" alt="${product.title}" style="width: 150px;">
                    <p>Price: $${product.price.toFixed(2)}</p>
                    <form action="/delete-product" method="POST" style="display: inline;">
                        <input type="hidden" name="productId" value="${product.id}">
                        <button type="submit">Delete</button>
                    </form>
                    <form action="/edit-product" method="GET" style="display: inline;">
                        <input type="hidden" name="productId" value="${product.id}">
                        <button type="submit">Edit</button>
                    </form>
                `;
                productList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
});
