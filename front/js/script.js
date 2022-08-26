fetch("http://localhost:3000/api/products")
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {
        // console.log(value);
        value.forEach(element => {
            // console.log(element);
            document.getElementById("items").innerHTML += `<a href="./product.html?id=${element._id}">
        <article>
        <img src="${element.imageUrl}" alt="${element.altTxt}">
        <h3 class="productName">${element.name}</h3>
        <p class="productDescription">${element.description}</article>
    </a>`
        });
    })
    .catch(function (err) {
        console.log('une erreur est survenue '+err);
    });