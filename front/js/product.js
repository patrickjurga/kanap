const params = new URL(document.location).searchParams;
const id = params.get("id");

const url = `http://localhost:3000/api/products/${id}`;

const imgTarget = document.querySelector(".item__img");
const titleTarget = document.getElementById("title");
const priceTarget = document.getElementById("price");
const descriptionTarget = document.getElementById("description");
const colorsTarget = document.getElementById("colors");
const addToCartButton = document.getElementById('addToCart');


/**
 * An immediately invoked async function
 *
 * Fetches a list of products from a remote API, displays a single product on the page and selects a value from the product object
 *
 * @return {Promise} Resolves once all actions inside the function have been completed
 */
(async function() {

    // Declare a variable 'item' and assign it the value returned by the function 'getProducts'
    const item = await getProducts();

    // Call the function 'showItem' and pass in the 'item' variable as an argument
    showItem(item);

    // Call the function 'selectValue' and pass in the 'item' variable as an argument
    selectValue(item);

})();

/**
* Display selected item on the page
* @param {object} item - the selected item
*/
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

/**
 * Select color and quantity values, display error message if no value is selected
 *
 * @param {object} item - the selected item
 *
 */
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
                 
                alert("Produit ajouté au panier");
                  
            }

        }
        
      });

}


/**
* Save the selected item to the cart using Local Storage
* @param {object} item - the selected item
*/
function saveItem(item) {

    const selectedColor = document.getElementById("colors").value;
    const selectedQuantity = document.getElementById("quantity").value;

    addToCart({
        id: item._id,
        qty: selectedQuantity,
        color: selectedColor
    })

}


/**
 * Retrieve the cart content using Local Storage
 * @return {string} cart - cart content
 */
function getCart() {

    return localStorage.getItem("cart");


}


/**
* Add an item to the cart using Local Storage
* @param {object} item - the item to add
*/
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


/**
* Makes an API call to get products
* @param {string} url - the API url to get products
* @return {Promise<Array>} - a promise that resolves with an array of product objects
*/
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