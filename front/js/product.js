const params = new URL(document.location).searchParams;
const id = params.get("id");

const url = `http://localhost:3000/api/products/${id}`;

const imgTarget = document.querySelector(".item__img");
const titleTarget = document.getElementById("title");
const priceTarget = document.getElementById("price");
const descriptionTarget = document.getElementById("description");
const colorsTarget = document.getElementById("colors");

async function showItem(item) {
  
  let image = document.createElement("img");
  image.src = `${item.imageUrl}`;
  image.alt = `${item.altTxt}`;
  
  imgTarget.appendChild(image);

  titleTarget.innerText = item.name;
  priceTarget.innerText = item.price;
  descriptionTarget.innerText = item.description;

  item.colors.forEach(color => {
    let option = document.createElement("option");
    option.value = option.innerText = `${color}`;
    colorsTarget.appendChild(option);
  });

}

function saveItem(item) {

  const addToCartButton = document.getElementById("addToCart");

  addToCartButton.addEventListener("click", () => {

    const selectedColor = document.getElementById("colors").value;
    const selectedQuantity = document.getElementById("quantity").value;

    localStorage.setItem("name", item.name);
    localStorage.setItem("price", item.price);
    localStorage.setItem("imageUrl", item.imageUrl);
    localStorage.setItem("altTxt", item.altTxt);
    localStorage.setItem("color", selectedColor);
    localStorage.setItem("quantity", selectedQuantity);

    window.location.href = "http://127.0.0.1:5500/front/html/cart.html";

  });

}

(async function() {

  const item = await getProducts();

  showItem(item);
  saveItem(item);

})();

async function getProducts() {

  try {
    const response = await fetch(url);
    return await response.json();
  } 
  
  catch(error) {
    console.warn(`${error.message}: ${url}`);
    return [];
  }

}






