//*******fetch pour recuperer les produits **************/
var idproduct = window.location.search.replace("?id=", "");
var product;
var cart = [];
var panier = JSON.parse(localStorage.getItem("cart"));
if (panier != null) {
    cart = panier;
}
fetch("http://localhost:3000/api/products/" + idproduct)
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {
        // console.log(value);
        product = value;
        document.getElementsByClassName(
            "item__img"
        )[0].innerHTML = `<img src=${value.imageUrl}>`;
        document.getElementById("price").textContent = value.price;
        document.getElementById("title").textContent = value.name;
        document.getElementById("description").textContent = value.description;

        value.colors.forEach((element) => {
            document.getElementById(
                "colors"
            ).innerHTML += `<option value="${element}">${element}</option>`;
        });
    })
    .catch(function (err) {
        console.log("erreur est survenue", err);
    });

// *******Ajouter les produit au panier*************
const btn = document.getElementById("addToCart");
btn.addEventListener("click", function (e) {
    if (
        document.getElementById("colors").value != "" &&
        document.getElementById("quantity").value > 0
    ) {
        var productToCart = {
            id: idproduct,
            name: product.name,
            imageUrl: product.imageUrl,
            description: product.description,
            colors: document.getElementById("colors").value,
            quantity: document.getElementById("quantity").value,
            price: product.price,
        };
        addProduct(productToCart);
    } else {
        alert("la couleur ou la quantité ne sont pas choisis");
        return;
    }
});
//*************methode pour ajouter un produit dans panier***** */
function addProduct(product) {
    let i = -1;
    if (cart.length > 0) {
        cart.forEach((element, index) => {
            if (product.id == element.id && product.colors == element.colors) {
                i = index;
            }
        });
        if (i != -1) {
            cart[i].quantity =
                parseInt(cart[i].quantity) + parseInt(product.quantity);
        } else {
            cart.push(product);
        }
    } else {
        cart.push(product);
    }
    saveCart(cart);
}

//  ********foction sert à sauvguarder le contenu du panier**********************
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}
