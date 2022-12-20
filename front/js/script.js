let cards = function () {
    
  // récupération back-end des produits
  fetch('http://localhost:3000/api/products')
  .then(response => response.json())
  .then(data => {
    // pour chaque item dans le data
    data.forEach(item => {
      
      // création du contenu html avec appel du back-end
      let product = ` <a href="./product.html?id=${item._id}">
                        <article>
                          <img src="${item.imageUrl}" alt="${item.altTxt}"/>
                          <h3 class="productName">${item.name}</h3>
                          <p class="productDescription">${item.description}</p>
                        </article>
                      </a>
                    `;

          // affichage du contenu dans la class "items" du html          
          document.getElementById("items").innerHTML += product;

    });
  })

  // en cas d'erreur affiche un message d'erreur sur la page
  .catch(error => {
    document.getElementById("items").innerHTML = "<p> Une erreur s'est produitre </p>"
    console.log('Une erreur s\'est produite :', error);
  });

}

// appel de la fonction
cards();


