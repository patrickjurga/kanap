const cart = getCart(); // Récupère l'objet cart du localStorage
const items = JSON.parse(cart); // Parse l'objet cart en objet JavaScript

const url = "http://localhost:3000/api/products";

const target = document.getElementById("cart__items");

const totalPrice = document.getElementById('totalPrice');



(async function() {

    const kanaps = await getProducts();

    items.forEach(item => {
      showKanap(item, kanaps);
    });

    console.log(items);

    deleteKanap();

    changeQty()

    showPrice(items, kanaps);

    checkForm()

})();


function getCart() {
    return localStorage.getItem("cart");
  }

async function deleteKanap() {

    const kanaps = await getProducts();

    const deleteItemButton = document.querySelectorAll('.deleteItem');
    // Ajoutez un écouteur d'événement de clic sur tous les boutons deleteItem
    deleteItemButton.forEach(button => {
        button.addEventListener('click', event => {
        // Récupérez l'élément de l'article du panier
        const cartItem = event.target.closest('.cart__item');

        // Récupérez l'ID du produit à partir de l'attribut data-id de l'élément de l'article du panier
        const productId = cartItem.getAttribute('data-id');

        const productColor = cartItem.getAttribute('data-color');
        console.log(productId);
        console.log(productColor);

        // Trouvez l'index de l'élément dans le tableau items
        let itemIndex = items.findIndex(item => item.id === productId && item.color === productColor);

        console.log(itemIndex);

        // Supprimez l'élément du tableau items
            items.splice(itemIndex, 1);
                
        // Mettez à jour le localStorage
        localStorage.setItem('cart', JSON.stringify(items));

        // Supprimez l'élément de l'article du panier de la page
        cartItem.remove();

        showPrice(items, kanaps);
            
        });
        

    });

}

async function changeQty() {

    const kanaps = await getProducts();

    const qtyInput = document.querySelectorAll('.itemQuantity');

    qtyInput.forEach(button => {
        button.addEventListener('click', event => {

            const cartItem = event.target.closest('.cart__item');

            // Récupérez l'ID du produit à partir de l'attribut data-id de l'élément de l'article du panier
            const productId = cartItem.getAttribute('data-id');

            const productColor = cartItem.getAttribute('data-color');
            console.log(productId);
            console.log(productColor);

            const updatedQuantity = event.target.value;
            const item = items.find(i => i.id === productId && i.color === productColor);
            item.qty = updatedQuantity;

            localStorage.setItem('cart', JSON.stringify(items));

            showPrice(items, kanaps);

        })

    })

}

function showKanap(item, kanaps) {

  
    // Trouvez l'objet produit correspondant à l'item actuel dans le tableau kanaps
    const product = kanaps.find(kanap => kanap._id === item.id);
  
    // Créez l'élément racine pour l'article du panier
    const cartItem = document.createElement('article');
    cartItem.classList.add('cart__item');
    cartItem.setAttribute('data-id', item.id);
    cartItem.setAttribute('data-color', item.color);
  
    // Créez l'élément de l'image
    const imgElement = document.createElement('div');
    imgElement.classList.add('cart__item__img');
    const img = document.createElement('img');
    img.src = product.imageUrl;
    img.alt = `Photographie du produit ${product.name}`;
    imgElement.appendChild(img);
  
    // Créez l'élément de contenu
    const contentElement = document.createElement('div');
    contentElement.classList.add('cart__item__content');
  
    // Créez l'élément de description
    const descriptionElement = document.createElement('div');
    descriptionElement.classList.add('cart__item__content__description');
    const name = document.createElement('h2');
    name.innerText = product.name;
    descriptionElement.appendChild(name);
    const color = document.createElement('p');
    color.innerText = item.color; // Utilisez la couleur de l'item au lieu de celle du produit
    descriptionElement.appendChild(color);
    const price = document.createElement('p');
    price.innerText = `${product.price} €`;
    descriptionElement.appendChild(price);
  
    // Créez l'élément de paramètres
    const settingsElement = document.createElement('div');
    settingsElement.classList.add('cart__item__content__settings');
  
    // Créez l'élément de quantité
    const quantityElement = document.createElement('div');
    quantityElement.classList.add('cart__item__content__settings__quantity');
    const quantityLabel = document.createElement('p');
    quantityLabel.innerText = 'Qté :';
    quantityElement.appendChild(quantityLabel);
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.classList.add('itemQuantity');
    quantityInput.name = 'itemQuantity';
    quantityInput.min = 1;
    quantityInput.max = 100;
    quantityInput.value = item.qty; // Utilisez la quantité de l'item au lieu de celle du produit
    quantityElement.appendChild(quantityInput);

    // Créez l'élément de suppression
    const deleteElement = document.createElement('div');
    deleteElement.classList.add('cart__item__content__settings__delete');
    const deleteButton = document.createElement('p');
    deleteButton.classList.add('deleteItem');
    deleteButton.innerText = 'Supprimer';
    deleteElement.appendChild(deleteButton);

    // Ajoutez les éléments de quantité et de suppression aux paramètres
    settingsElement.appendChild(quantityElement);
    settingsElement.appendChild(deleteElement);

    // Ajoutez l'élément de description et de paramètres au contenu
    contentElement.appendChild(descriptionElement);
    contentElement.appendChild(settingsElement);

    // Ajoutez l'image et le contenu à l'élément de l'article du panier
    cartItem.appendChild(imgElement);
    cartItem.appendChild(contentElement);

    // Ajoutez l'élément de l'article du panier à la cible
    target.appendChild(cartItem);



} 

function showPrice(items, kanaps) {

    let sum = 0;

    
  
    items.forEach(item => {
      const product = kanaps.find(kanap => kanap._id === item.id);
        sum += product.price * item.qty;
    });
  
    console.log(sum);

    totalPrice.innerText = sum;

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


    
    let getId = items.map(product => product.id);

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







