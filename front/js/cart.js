// ***************recuperer le contenu du panier et les afficher dans la page*********
cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);
if (cart == null) {
  document.getElementById("cart_items").innerHTML = "votre panier est vide";
  document.getElementsByClassName("cart_price")[0].style.display = none;
  document.getElementsByClassName("cart_ordre")[0].style.display = none;
} else {
  alert('coucou');
  displayCart();
}
// *************l'objet product dt liste de produits dans le panier si mise à jour *******************
let product = {};
let chetOutCary = [];
// *******afficher le contenu du panier******************
function displayCart() {
  cart.forEach((element) => {
    document.getElementById(
      "cart__items"
    ).innerHTML +=

      `<article class="cart__item" data-id="${element.id}" data-color="${element.colors}">
    <div class="cart__item__img">
      <img src="${element.imageUrl}" alt="${element.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${element.name}</h2>
        <p>${element.colors}</p>
        <p>${element.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`
  });
  totalPrice();
}

// **********calculer le prix***************
function totalPrice() {
  var price = 0;
  var quantity = 0;
  cart.forEach((element) => {
    price += parseInt(element.price) * parseInt(element.quantity);
    quantity += parseInt(element.quantity);
  });
  document.getElementById("totalPrice").innerText = price;
  document.getElementById("totalQuantity").innerText = quantity;
}


// ********changer la quantité*************************
function changQuantity(e) {
  var id = e.target.closest("[data-id]").getAttribute("data-id");
  var color = e.target.closest("[data-color]").getAttribute("data-color");
  cart.forEach((element, index) => {
    if (id == element.id && color == element.colors) {
      i = index;
    }
  });
  if (i != -1) {
    cart[i].quantity = parseInt(e.target.value);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  totalPrice();
}

// **********supprimer un produit****************

function supprElement(e) {
  var id = e.target.closest("[data-id]").getAttribute("data-id");
  var color = e.target.closest("[data-color]").getAttribute("data-color");
  cart.forEach((element, index) => {
    if (id == element.id && color == element.colors) {
      i = index;
    }
  });
  if (i != -1) {
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  displayCart();
}

// ************formulaire*****************
let cart__order__form = document.getElementsByClassName("cart__order__form");
console.log(cart__order__form);

let client = {};
client.firstName = document.querySelector("#firstName");
client.lastName = document.querySelector("#lastName");
client.address = document.querySelector("#address");
client.city = document.querySelector("#city");
client.email = document.querySelector("#email");
console.log(client);
localStorage.client = JSON.stringify(client);
console.log(cart__order__form[0]);

var inputs = document.querySelectorAll(".cart__order__form input");

[...inputs].forEach((element) =>
  element.addEventListener("input", (e) => {
    checkValid(e);
  })
);
