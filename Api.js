
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
        let output = '';

        products.forEach(product => {
            output += `
                <div class="product">
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>$${product.price}</p>
                </div>
            `;
        });

        document.getElementById('products').innerHTML = output;
    })
    .catch(error => {
        document.getElementById('products').innerHTML =
            '<p>Error loading products.</p>';
        console.error(error);
    })
    .finally(() => {
        console.log('Fetch completed');
    });


