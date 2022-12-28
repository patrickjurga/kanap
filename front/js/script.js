/* let cards = function () {
    
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
cards(); */

const url = "http://localhost:3000/api/products";
const target = document.getElementById("items");

(async function() {

  const kanaps = await getProducts();

  kanaps.forEach(kanap => {
    creatKanap(kanap);
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

function creatKanap(item) {

  let link = document.createElement("a");
  link.href = `product.html?id=${item._id}`;
  
  let article = document.createElement("article");

  let image = document.createElement("img");
  image.src = `${item.imageUrl}`;
  image.alt = `${item.altTxt}`;

  let titre3 = document.createElement("h3");
  titre3.classList.add("productName");
  titre3.innerText= item.name;

  let paragraphe = document.createElement("p");
  paragraphe.classList.add("productDescription");
  paragraphe.innerText= item.description;

  target.appendChild(link);
  link.appendChild(article);
  article.appendChild(image);
  article.appendChild(titre3);
  article.appendChild(paragraphe);

}





