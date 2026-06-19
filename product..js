let products = [];
let cart = [];

// Fetch products
fetch("https://fakestoreapi.com/products")
  .then(Response => Response.json())
  .then(data => {
    products = data;
    renderProducts(products);
    loadCategories(products);
  })
  .catch(error => {
    document.getElementById("products").innerHTML =
      `<p style="color:red;"> Error loading products: ${error?.message}</p>`;
  });

// Render products
let renderProducts = (list) => {
  let container = document.getElementById("products");
  container.innerHTML = "";

  list.forEach(p => {
   let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.image}" style="width:100px;height:100px;object-fit:contain;">
      <h3>${p.title}</h3>
      <p>$${p.price}</p>
      <p>${p.category}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;

    container.append(card);
  });
};


// Filter products 
let filterProducts = () => {
  let searchValue = document.getElementById("search").value.toLowerCase();
  let category = document.getElementById("category").value;

  let filtered = products.filter(p =>
    p.title.toLowerCase().includes(searchValue)
  );

  filtered = category === "all"
    ? filtered
    : filtered.filter(p => p.category === category);

  renderProducts(filtered);
};

document.getElementById("search").addEventListener("input", filterProducts);
document.getElementById("category").addEventListener("change", filterProducts);

// Load categories
let loadCategories = (data) => {
  let select = document.getElementById("category");

  let categories = ["all", ...new Set(data.map(p => p.category))];

  categories.forEach(cat => {
    let option = document.createElement("option");
    option.value = cat;
    option.innerText = cat;
    select.append(option);
  });
};

// Cart add
let addToCart = (id) => {
  let product = products.find(p => p.id === id);
  cart = [...cart, product];
  renderCart();
  updateStats();
};

// Render cart
let renderCart = () => {
  let cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";

  cart.forEach(item => {
    let div = document.createElement("div");

    div.innerHTML = `
      ${item.title} - $${item.price}
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;

    cartDiv.append(div);
  });
};

// Remove cart item 
let removeFromCart = (id) => {
  cart = cart.filter(item => item.id !== id);
  renderCart();
  updateStats();
};

// Stats update
let updateStats = () => {
  let total = cart.reduce((sum, item) => sum + item.price, 0);
  let sorted = [...cart].sort((a, b) => b.price - a.price);

  document.getElementById("stats").innerText =
    `Items: ${cart.length} | Total: $${total.toFixed(2)} | Highest: ${sorted[0]?.title ?? "None"}`;
};