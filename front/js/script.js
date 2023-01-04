const url = "http://localhost:3000/api/products";
const target = document.getElementById("items");


/**
 * This immediately invoked function makes an API call to get product data and then creates an HTML element for each product.
 * 
 * It does not take in any parameters.
 */
(async function() {

     // Get the product data from the API call
    const kanaps = await getProducts();

    // For each product, create an HTML element to display it
    kanaps.forEach(kanap => {
        creatKanap(kanap);
    });

})();


/**
 * This function makes an API call to the specified URL to retrieve product data in JSON format.
 * 
 * If the API call is unsuccessful, it returns an empty array.
 * 
 * @param {string} url - The URL of the API endpoint to make the request to.
 * @returns {Promise<Array>} - A promise that resolves with an array of product objects.
 */
async function getProducts() {

    // We use a try-catch block to handle any errors that may occur when fetching the data
    try {
        const response = await fetch(url);
        return await response.json();
    }

    // If an error occurs, we log a warning message with the error message and the url and return empty array
    catch(error) {
        console.warn(`${error.message}: ${url}`);
        return [];
    }

}


/**
 * This function creates HTML elements to display a product and its information.
 * 
 * It takes in a product object as a parameter and appends the created elements to the target element on the page.
 * 
 * @param {string} item.imageUrl - The URL of the product image.
 * @param {string} item.altTxt - The alt text for the product image.
 * @param {string} item.name - The name of the product.
 * @param {string} item.description - The description of the product.
 * @param {string} item._id - The unique identifier of the product.
 */
function creatKanap(item) {

    // create image element
    let image = document.createElement("img");
    image.src = `${item.imageUrl}`;
    image.alt = `${item.altTxt}`;


    // create h3 element for product name
    let titre3 = document.createElement("h3");
    titre3.classList.add("productName");
    titre3.innerText= item.name;


    // create p element for product description
    let paragraphe = document.createElement("p");
    paragraphe.classList.add("productDescription");
    paragraphe.innerText= item.description;


    // create article element to hold product info
    let article = document.createElement("article");
        article.appendChild(image);
        article.appendChild(titre3);
        article.appendChild(paragraphe);


    // create a element to wrap article and link to product page
    let link = document.createElement("a");
    link.href = `product.html?id=${item._id}`;
    link.appendChild(article);
    

    // add link to target element
    target.appendChild(link);


}





