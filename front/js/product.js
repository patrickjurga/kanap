const params = new URL(document.location).searchParams;
const id = params.get("id");

const url = `http://localhost:3000/api/products/${id}`;

const imgTarget = document.querySelector(".item__img");
const titleTarget = document.getElementById("title");
const priceTarget = document.getElementById("price");
const descriptionTarget = document.getElementById("description");
const colorsTarget = document.getElementById("colors");
const addToCartButton = document.getElementById('addToCart');

(async function() {

    const item = await getProducts();

    showItem(item);

    selectValue(item)

})();

function showItem(item) {
  
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

function selectValue(item) {

    addToCartButton.addEventListener("click", () => {
        const quantityInput = document.getElementById('quantity');

        const colorInput = document.getElementById('colors');

        console.log('p' + colorInput.value);

        if (colorInput.value === '') {

            alert("Veuillez choisir une couleur");

        } else {

            if (quantityInput.value === '0') {

                alert("Veuillez choisir le nombre de produit que vous voulez");

              } else {

                  saveItem(item)

              }

        }
        
      });

}

function saveItem(item) {

    const selectedColor = document.getElementById("colors").value;
    const selectedQuantity = document.getElementById("quantity").value;

    addToCart({
        id: item._id,
        qty: selectedQuantity,
        color: selectedColor
    })

}

function getCart() {

    return localStorage.getItem("cart");


}

  function addToCart(item) {

    let cart = getCart();

    if (cart === null) {
        cart = [];
    } else {
        cart = JSON.parse(cart);
    }

    item.qty = parseInt(item.qty);

    let existingItem = cart.find(cartItem => cartItem.id === item.id && cartItem.color === item.color);
    if (existingItem) {
        existingItem.qty += item.qty;
    } else {
        cart.push(item);
    }

    cart = JSON.stringify(cart);
    localStorage.setItem("cart", cart);
    console.log(cart);
}

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