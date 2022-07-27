var idproduct = window.location.search.replace('?id=', '');
var product;
var cart = [];
fetch("http://localhost:3000/api/products/" + idproduct)
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {
        console.log(value);
        product = value;
        document.getElementsByClassName("item__img")[0].innerHTML = `<img src=${value.imageUrl}>`;
        document.getElementById("price").textContent = value.price;
        document.getElementById("title").textContent = value.name;
        document.getElementById("description").textContent = value.description;

        value.colors.forEach(element => {
            document.getElementById("colors").innerHTML += `<option value="${element}">${element}</option>`;

        });

    })
    .catch(function (err) {
        console.log('erreur est survenue', err);
    });

const btn = document.getElementById("addToCart");

btn.addEventListener("click", function (e) {
    if (document.getElementById("colors").value != "" && document.getElementById("quantity").value > 0) {

        var productToCart = {
            id: idproduct,
            name: product.name,
            description: product.description,
            colors: document.getElementById("colors").value,
            quantity: document.getElementById("quantity").value,
            price: product.price
        };
        saveCart(cart);
        addProduct(productToCart);


        console.log(getCart());
    } else {
        alert('la couleur ou la quantité ne sont pas choisis');
        return;
    }
});
// ********cree un panier pour stocker les produits*******
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

//********method pour recuperer le panier avec ces produits s'il y en a ********
function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart != null)
        return JSON.parse(cart);
    return [];
}

//*************methode pour ajouter un produit dans panier***** */
function addProduct(product) {
    let cart = getCart();
    cart.push(product);
    saveCart(cart);
}