// ***************recuperer le contenu du panier et les afficher dans la page*********
cart = JSON.parse(localStorage.getItem("cart"));

if (cart == null) {
  document.getElementById("cart_items").innerHTML = "votre panier est vide";
  document.getElementsByClassName("cart_price")[0].style.display = none;
  document.getElementsByClassName("cart_ordre")[0].style.display = none;
} else {
  displayCart();
}
// *************l'objet product dt liste de produits dans le panier si mise à jour *******************
let product = {};
let chetOutCary = [];
// *******afficher le contenu du panier******************
function displayCart() {
  document.getElementById("cart__items").innerHTML = "";
  cart.forEach((element) => {
    document.getElementById(
      "cart__items"
    ).innerHTML += `<article class="cart__item" data-id="${element.id}" data-color="${element.colors}">
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
  </article>`;
  });

  var input = document.getElementsByClassName("itemQuantity");
  [...input].forEach((element) => {
    element.addEventListener("input", (e) => {
      changQuantity(e);
    });
  });

  var suppr = document.getElementsByClassName("deleteItem");
  [...suppr].forEach((element) => {
    element.addEventListener("click", (e) => {
      supprElement(e);
    });
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

//************Supprimer un élément */
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



// ******************les inputs validés dans le formulaire*************
// ******fonction pour verfier les noms, villes***********
let acceptedNames = new RegExp('^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]{1,31}$', 'g');
let acceptedAdresses = new RegExp('[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]', 'g')
// ************formulaire*****************
let cart__order__form = document.getElementsByClassName("cart__order__form");
// console.log(cart__order__form);
// *********créer l'objet client nom,penom,adresse,ville....*********************
let client = {};
let firstName = document.querySelector("#firstName");
firstName.classList.add('names');
let lastName = document.querySelector("#lastName");
lastName.classList.add('names');
let address = document.querySelector("#address");
address.classList.add('adresses');
let city = document.querySelector("#city");
city.classList.add('names');
let email = document.querySelector("#email");
// ***************sauvgarder dans localstorage***********************
localStorage.client = JSON.stringify(client);
// console.log(cart__order__form[0]);


var names = document.querySelectorAll('.names');
console.log(names);
names.forEach((name) => {
  name.addEventListener('input', (e) => {
    let val = e.target.value;
    console.log(val);
    if (acceptedNames.test(val)) {
      client.firstName = e.firstName;
      client.lastName = e.lastName;
      client.city = e.city;
    } else { }
  })

})


var inputs = document.querySelectorAll(".cart__order__form input");

// [...inputs].forEach((element) =>
//   element.addEventListener("change", (e) => {
//     if (e.id = firstName) {

//       let val = e.target.value;
//       console.log(val);
//       if (acceptedNames.test(val)) {
//         console.log('good names')
//       }
//     }

//   })
// );

// function checkValid(e) {
//   if (!e.target.checkValidity()) {
//     e.target.nextElementSibling.innerHTML = e.target.validationMessage;
//     console.log(e.target.validationMessage);
//   } else {
//     e.target.nextElementSibling.innerHTML = "";
//   }
// }



// if (acceptedAdresses.test())

//   function checkValidNames(names) {
//     let val = names.target.value;
//     if (acceptedNames.test(val)) {
//       client.firstName = firstName.value;
//       client.lastName = lastName.value;
//       client.city = city.value;
//     } else {
//       names.target.nextElementSibling.innerHTML = names.target.validationMessage;

//     }
//   }