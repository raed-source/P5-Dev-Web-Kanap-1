var idproduct = window.location.search.replace('?id=', '');
fetch("http://localhost:3000/api/products/" + idproduct)
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {
        console.log(value);
        document.getElementsByClassName("item__img")[0].innerHTML = `<img src=${value.imageUrl}>`;
        document.getElementById("price").innerHTML = value.price;
        document.getElementById("title").innerHTML = value.name;
        document.getElementById("description").innerHTML = value.description;
        value.colors.forEach(element => {
            document.getElementById("colors").innerHTML += `<option value="${element}">${element}</option>`;
        });
        // .catch (function(err) {
        //     // console.log('erreur est survenue');
        // }
    });
document.getElementById("addToCart").addEventListener("click", function (e) {
    if (document.getElementById("colors").value != "" && document.getElementById("quntity").calue > 0) {
        var productToCart = {
            id: idproduct,
            name: product.name,
            description: product.description,
            colors: product.colors,
            quantity: product.quantity,
            price: product.price
        };
        console.log(productToCart);
    } else {
        alert('la couleur ou la quantité ne sont pas choisis');
        return;
    }
});