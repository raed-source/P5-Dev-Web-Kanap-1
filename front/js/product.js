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
        // console.log(value);
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
cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);
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
        cart.push(productToCart);
        console.log(cart);
    } else {
        alert('la couleur ou la quantité ne sont pas choisis');
        return;
    }
});
