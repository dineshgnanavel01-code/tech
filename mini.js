let productsContainer = document.getElementById("products");
let searchInput = document.getElementById("search");
let categoryFilter = document.getElementById("categoryFilter");
let cartCount = document.getElementById("cartCount");
let cartItems = document.getElementById("cartItems");
let totalPrice = document.getElementById("totalPrice");

let products = [];
let cart = [];

async function fetchProducts() {
  let response = await fetch(
    "https://fakestoreapi.com/products"
  );

  products = await response.json();

  displayProducts(products);
  loadCategories();
}

function displayProducts(data) {
  productsContainer.innerHTML = "";

  data.forEach(product => {
    productsContainer.innerHTML += `
      <div class="card">
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p class="price">₹${Math.round(product.price * 85)}</p>
        <button onclick="addToCart(${product.id})">
          Add To Cart
        </button>
      </div> `;
  });
}

function loadCategories() {
  const categories = [
    ...new Set(products.map(p => p.category))
  ];

  categories.forEach(category => {
    categoryFilter.innerHTML += `
      <option value="${category}">
        ${category}
      </option>
    `;
  });
}

searchInput.addEventListener("input", () => {
 let value = searchInput.value.toLowerCase();

  const filtered = products.filter(product =>
    product.title.toLowerCase().includes(value)
  );

  displayProducts(filtered);
});

categoryFilter.addEventListener("change", () => {
   let category = categoryFilter.value;

  if(category === "all"){
    displayProducts(products);
    return;
  }

   let filtered = products.filter(
    product => product.category === category
  );

  displayProducts(filtered);
});

function addToCart(id){
   let item = products.find(
    product => product.id === id
  );

  cart.push(item);
  updateCart();
}

function removeFromCart(index){
  cart.splice(index,1);
  updateCart();
}

function updateCart(){

  cartCount.textContent = cart.length;

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item,index) => {

    total += item.price * 85;

    cartItems.innerHTML += `
      <div class="cart-item">
        <p>${item.title.substring(0,20)}...</p>
        <p>₹${Math.round(item.price * 85)}</p>

        <button
          class="remove-btn"
          onclick="removeFromCart(${index})">
          Remove
        </button>
      </div>
    `;
  });

  totalPrice.textContent = total.toFixed(0);
}

fetchProducts();