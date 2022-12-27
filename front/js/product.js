/* let params = new URL(document.location).searchParams;
let id = params.get("id");

let product = function () {

// récupération back-end des produits
fetch('http://localhost:3000/api/products')
  .then(response => response.json())
  .then(data => {
    // pour chaque item dans le data
    data.forEach(item => {

        //si l'id du lien correspond a l'id du produit
        if (id == item._id) {

        document.querySelector(".item__img").innerHTML = `<img src="${item.imageUrl}" alt="${item.altTxt}"/>`;

        document.getElementById("title").innerHTML = `${item.name}`;

        document.getElementById("price").innerHTML = `${item.price}`;
        
        document.getElementById("description").innerHTML = `${item.description}`;

        // pour chaque couleurs dans le tableau colors on affiche la couleur dans le html
        item.colors.forEach(color => {

          document.getElementById("colors").innerHTML += `<option value="${color}">${color}</option>`;
          
        });

      }       

    });
  })

}

// appel de la fonction
product(); */

const params = new URL(document.location).searchParams;
const id = params.get("id");

const url = `http://localhost:3000/api/products/${id}`;

const imgTarget = document.querySelector(".item__img");
const titleTarget = document.getElementById("title");
const priceTarget = document.getElementById("price");
const descriptionTarget = document.getElementById("description");
const colorsTarget = document.getElementById("colors");


(async function() {

  const getKanap = await getProducts();

  let image = document.createElement("img");
  image.src = `${getKanap.imageUrl}`;
  image.alt = `${getKanap.altTxt}`;

  imgTarget.appendChild(image);
  titleTarget.innerText = getKanap.name;
  priceTarget.innerText = getKanap.price;
  descriptionTarget.innerText = getKanap.description;

  getKanap.colors.forEach(color => {

    let option = document.createElement("option");
    option.value = option.innerText = `${color}`;

    colorsTarget.appendChild(option);

  }); 
  
  const addToCartButton = document.getElementById("addToCart");

  addToCartButton.addEventListener("click", () => {
    // Get the selected color value from the colors select element
    const selectedColor = document.getElementById("colors").value;

    // Store the data in local storage
    localStorage.setItem("name", getKanap.name);
    localStorage.setItem("price", getKanap.price);
    localStorage.setItem("imageUrl", getKanap.imageUrl);
    localStorage.setItem("altTxt", getKanap.altTxt);
    localStorage.setItem("color", selectedColor);

    // Redirect to the cart page
    window.location.href = "http://127.0.0.1:5500/front/html/cart.html";
  });
  
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






