const loadProducts = () => {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => showProducts(data))
};


// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product ">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h3>Price: $ ${product.price}</h3>
      <h5>Rating: ${product.rating.rate}</h5>
      <h5>Count: ${product.rating.count}</h5>
      <div class="card-footer">
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="showDetails('${image}','${product.title}','${product.description}','${product.rating.rate}')" id="details-btn" class="btn btn-danger">Details</button>
        </div>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

// show product
const showDetails = (image, title, detail, rating) => {
  document.getElementById("product-details").textContent = "";
  const div = document.createElement("div");

  div.innerHTML = `
  <div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src=${image} class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${detail}</p>
        <p class="card-text">Rating : ${rating}</p>
     
      </div>
    </div>
  </div>
</div>

`;

  // div.innerHTML = `
  //   <div class=" bg-light p-5">
  //   <img class="product-image" src=${image}></img>
  //     <h3> Product details:  </h3>
  //     <p>${detail}</p>
  // </div>
  // `;
  document.getElementById("product-details").appendChild(div);
};
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
loadProducts();