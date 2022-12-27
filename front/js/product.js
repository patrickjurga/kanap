const params = new URL(document.location).searchParams;
const id = params.get("id");

const url = `http://localhost:3000/api/products/${id}`;

const imgTarget = document.querySelector(".item__img");
const titleTarget = document.getElementById("title");
const priceTarget = document.getElementById("price");
const descriptionTarget = document.getElementById("description");
const colorsTarget = document.getElementById("colors");
const addToCartButton = document.getElementById("addToCart");



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
  
  /*
  addToCartButton.addEventListener("click", async function() {

    const selectedColor = document.querySelector("#colors option:checked").value;

    const data = {
      name: getKanap.name,
      price: getKanap.price,
      imageUrl: getKanap.imageUrl,
      altTxt: getKanap.altTxt,
      color: selectedColor

    };

    const response = await fetch("http://127.0.0.1:5500/front/html/cart.html", {

      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Accept": "application/json", 
        "Content-Type": "application/json"
      }

    });

    if (response.ok) {
      
      window.location.href = "http://127.0.0.1:5500/front/html/cart.html";
    } else {
      
      console.error(`Error: ${response.status} ${response.statusText}`);
    }
  });

  */
  
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






