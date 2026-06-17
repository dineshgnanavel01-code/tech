 let productsContainer = document.getElementById("products");

    fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(products => {
        products.forEach(product => {
         let card = document.createElement("div");
          card.className = "product-card";
          card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p class="rating">⭐ ${product.rating.rate} / 5 (${product.rating.count} reviews)</p>
          `;
          productsContainer.appendChild(card);
        });
      })
      .catch(error => {
        productsContainer.innerHTML = `<p style="color:red;">❌ Error: ${error.message}</p>`;
      })
      .finally(() => {
        console.log("🔄 Fetch attempt completed.");
      });
