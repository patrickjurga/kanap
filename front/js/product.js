let params = new URL(document.location).searchParams;
let id = params.get("id");



let product = function () {

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
product();