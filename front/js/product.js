var idproduct = window.location.search.replace('?id=', '');
fetch("http://localhost:3000/api/products/" + idproduct)
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (product) {
        console.log(product);
        document.getElementsByClassName("item__img")[0].innerHTML = `<img src=${product.imageUrl}>`;
        document.getElementById("price").textContent = product.price;
        document.getElementById("title").textContent = product.name;
        document.getElementById("description").textContent = product.description;

        product.colors.forEach(element => {
            document.getElementById("colors").innerHTML += `<option value="${element}">${element}</option>`;

        });

    })
    .catch(function (err) {
        console.log('erreur est survenue', err);
    });

const btn = document.getElementById("addToCart");

btn.addEventListener("click", function (e) {
    if (document.getElementById("colors").value != "" && document.getElementById("quantity").value > 0) {
        const panier = [];
        var productToCart = {
            id: idproduct,
            name: product.name,
            description: document.getElementById("description").value,
            colors: document.getElementById("colors").value,
            quantity: document.getElementById("quantity").value,
            price: document.getElementById("price").value,
        };
        panier.push(productToCart);
        console.log(productToCart);
        console.log(panier);
    } else {
        alert('la couleur ou la quantité ne sont pas choisis');
        return;
    }
});