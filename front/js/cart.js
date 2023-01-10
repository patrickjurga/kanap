let cart = [];

const target = document.getElementById("cart__items");
const totalPrice = document.getElementById('totalPrice');


/**
 * Initializes the cart by fetching data from local storage, displaying it on the page and checking the form
 */
(function(){

    // Get Cart
    cart = getCart();

    // Show Cart
    showCart(cart);

    // Show total price of all products in the cart
    showTotalPrice(cart)

     
    checkForm()

})();

/**
 * Get Cart from Local Storage
 *
 * @returns {Array} cart - An array of products 
 */
function getCart() 
{
    let cart = localStorage.getItem("cart");
    return JSON.parse(cart);
}


/**
 * Get Product from API call
 *
 * @param {string} url - The URL of the API endpoint to make the request to.
 * @returns {Promise<Array>} - A promise that resolves with an array of product objects.
 */
async function getProduct(url) 
{
    try {
        const response = await fetch(url);
        return await response.json();
    } 
    catch(error) {
        console.warn(`${error.message}: ${url}`);
        return [];
    }
}

/**
 * show cart items in the webpage
 *
 * @param {Array} cart - array of product in the cart
 * 
 */
function showCart(cart)
{
    target.innerHTML = "";
    
    cart.forEach(async (product) => {

        const url = `http://localhost:3000/api/products/${product.id}`;
        const _product = await getProduct(url);


        // Quantity
        // --

        let quantityLabel = document.createElement('p');
            quantityLabel.innerText = 'Qté :';

        let quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.classList.add('itemQuantity');
            quantityInput.name = 'itemQuantity';
            quantityInput.min = 1;
            quantityInput.max = 100;
            quantityInput.value = product.qty;

            quantityInput.addEventListener('click', changeQty );

        let quantityElement = document.createElement('div');
            quantityElement.classList.add('cart__item__content__settings__quantity');
            quantityElement.appendChild(quantityLabel);
            quantityElement.appendChild(quantityInput);


        // Delete
        // --

        let deleteButton = document.createElement('p');
            deleteButton.classList.add('deleteItem');
            deleteButton.innerText = 'Supprimer';


        let deleteElement = document.createElement('div');
            deleteElement.classList.add('cart__item__content__settings__delete');
            deleteElement.appendChild(deleteButton);

            deleteElement.addEventListener('click', deleteItem );


        // Settings
        // --

        let settingsElement = document.createElement('div');
            settingsElement.classList.add('cart__item__content__settings');
            settingsElement.appendChild(quantityElement);
            settingsElement.appendChild(deleteElement);


        // Content
        // --

        let name = document.createElement('h2');
            name.innerText = _product.name;

        let color = document.createElement('p');
            color.innerText = product.color;

        let price = document.createElement('p');
            price.innerText = `${_product.price} €`;


        // Créez l'élément de description
        let descriptionElement = document.createElement('div');
            descriptionElement.classList.add('cart__item__content__description');
            descriptionElement.appendChild(name);
            descriptionElement.appendChild(color);
            descriptionElement.appendChild(price);

        let contentElement = document.createElement('div');
            contentElement.classList.add('cart__item__content');
            contentElement.appendChild(descriptionElement);
            contentElement.appendChild(settingsElement);


        // Image
        // -- 

        let img = document.createElement('img');
            img.src = _product.imageUrl;
            img.alt = `Photographie du produit ${product.name}`;

        let imgElement = document.createElement('div');
            imgElement.classList.add('cart__item__img');
            imgElement.appendChild(img);
            

        // Article
        // --

        let article = document.createElement('article');
            article.classList.add('cart__item');
            article.setAttribute('data-id', product.id);
            article.setAttribute('data-color', product.color);
            article.appendChild(imgElement);
            article.appendChild(contentElement);

        // Ajoutez l'élément de l'article du panier à la cible
        target.appendChild(article);

        showTotalPrice(cart)
        
    });

    

}

/**
 * Removes an item from the cart array and updates the local storage
 *
 * @param {Event} event - the event triggered when clicking on the delete button
 */
function deleteItem(event)
{
    // Retrieve product data
    const cartItem = event.target.closest('.cart__item');
    const id = cartItem.getAttribute('data-id');
    const color = cartItem.getAttribute('data-color');

    // Retrieve the product in cart   
    const index = cart.findIndex(item => item.id === id && item.color === color);

    cart.splice(index, 1);

    localStorage.setItem('cart', JSON.stringify(cart));

    showTotalPrice(cart)

    showCart( getCart() );
    
}

/**
 * Update quantity of item in the cart array and updates the local storage
 *
 * @param {Event} event - the event triggered when changing the quantity of item
 */
function changeQty(event) {

    // Retrieve product data
    const cartItem = event.target.closest('.cart__item');
    const id = cartItem.getAttribute('data-id');
    const color = cartItem.getAttribute('data-color');

    const updatedQuantity = event.target.value;
    const index = cart.find(i => i.id === id && i.color === color);
    index.qty = updatedQuantity;

    localStorage.setItem('cart', JSON.stringify(cart));

    showTotalPrice(cart)

} 

/**
 * Show total price of all products in the cart
 *
 * @param {Array} cart - array of product in the cart
 * 
 */
function showTotalPrice(cart) {

    let sum = 0;
  
    if (cart.length === 0) {

      totalPrice.innerText = sum;

    } else {

      cart.forEach(async (product) => {

        const url = `http://localhost:3000/api/products/${product.id}`;
        const _product = await getProduct(url);
  
        sum += _product.price * product.qty;
  
        totalPrice.innerText = sum;

      });

    }

  }

/**
 * Checking the form
 *
 */
function checkForm() {

    const firstName = document.getElementById('firstName');
    const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');

    firstName.addEventListener('input', function() {
        const regex = /^[A-Za-zÀ-ÿ -]*[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ -]*$/;
        if(!regex.test(firstName.value)) {
            firstNameErrorMsg.textContent = 'Prénom non valide';
        } else {
            firstNameErrorMsg.textContent = '';
        }
    });



    const lastName = document.getElementById('lastName');
    const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');

    lastName.addEventListener('input', function() {
        const regex = /^[A-Za-zÀ-ÿ -]*[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ -]*$/;
        if(!regex.test(lastName.value)) {
            lastNameErrorMsg.textContent = 'Nom non valide';
        } else {
            lastNameErrorMsg.textContent = '';
        }
    });



    const address = document.getElementById("address");
    const addressErrorMsg = document.getElementById("addressErrorMsg");

    address.addEventListener('input', function() {
        const regex = /^[A-Za-z0-9 _-]*[A-Za-z0-9][A-Za-z0-9 _-]*$/;
        if(!regex.test(address.value)) {
            addressErrorMsg.textContent = 'Adresse non valide';
        } else {
            addressErrorMsg.textContent = '';
        }
    });
    


    const city = document.getElementById("city");
    const cityErrorMsg = document.getElementById("cityErrorMsg");

    city.addEventListener('input', function() {
        const regex = /^[A-Za-zÀ-ÿ -]*[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ -]*$/;
        if(!regex.test(city.value)) {
            cityErrorMsg.textContent = 'Ville non valide';
        } else {
            cityErrorMsg.textContent = '';
        }
    });



    const email = document.getElementById("email");
    const emailErrorMsg = document.getElementById("emailErrorMsg");

    email.addEventListener('input', function() {
        const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if(!regex.test(email.value)) {
            emailErrorMsg.textContent = 'Adresse mail non valide';
        } else {
            emailErrorMsg.textContent = ''
        }
    });


    
    let getId = cart.map(product => product.id);

    document.querySelector(".cart__order__form__submit").addEventListener("click", function(e) {

        const formIsValid = firstNameErrorMsg.textContent === '' &&
        lastNameErrorMsg.textContent === '' &&
        addressErrorMsg.textContent === '' &&
        cityErrorMsg.textContent === '' &&
        emailErrorMsg.textContent === '';

        if (formIsValid) {

            e.preventDefault();
        
            const response = fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contact: {
                        firstName: document.getElementById("firstName").value,
                        lastName: document.getElementById("lastName").value,
                        address: document.getElementById("address").value,
                        city: document.getElementById("city").value,
                        email: document.getElementById("email").value
                        },
                    products : getId
                })
            });
            response.then(async (answer) => {
                try {
                    const data = await answer.json();
                    window.location.href = `confirmation.html?id=${data.orderId}`;
                    localStorage.clear();
                    localStorage.setItem('cart', JSON.stringify([]));
                } catch (e) {
                }
            });

        } else {

            alert("Veuillez remplir correctement le formulair");

        }
        
        
        
    })

}

  

  





// 1. get cart (localstorage)

// 2. Show cart

    // Init event 
        // - qty
            // Check cart
            // Update qty
            // Update localstorage
            // Update view

        // - deletion
            // Check cart
            // Update qty
            // Update localstorage
            // Update view








