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
let acceptedNames = new RegExp('[a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]{1,31}$', 'g');
let acceptedAdresses = new RegExp('[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]{1,40}$', 'g');
let acceptedEmail = new RegExp('[a-zA-Z0-9]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');


// ************formulaire*****************variable necessaires pour valider *******************
let cart__order__form = document.getElementsByClassName("cart__order__form");
var inputs = document.querySelectorAll(".cart__order__form input");
console.log(inputs);
let client = {};
localStorage.client = JSON.stringify(client);

let firstName = document.querySelector("#firstName");
firstName.classList.add('names');
let lastName = document.querySelector("#lastName");
lastName.classList.add('names');
let city = document.querySelector("#city");
city.classList.add('names');
var names = document.querySelectorAll('.names');

let address = document.querySelector("#address");
let email = document.querySelector('#email')
email.setAttribute("type", "text");

// ************valider nom prenom et ville***************
console.log(names);
names.forEach((names) =>
  names.addEventListener("change", (e) => {
    let val = e.target.value;
    let nextToName = names.nextElementSibling;
    if (!acceptedNames.test(val)) {
      nextToName.innerHTML = "entrez un nom valide";
    } else {
      nextToName.innerHTML = "";
      client.firstName = firstName.value;
      client.lastName = lastName.value;
      client.city = city.value;
      nextToName.innerHTML = "fait";
    }
    localStorage.client = JSON.stringify(client);

  }));
//********valider l'adresse**************** */
address.addEventListener("change", (e) => {
  let val = e.target.value;
  let nextToAdress = address.nextElementSibling;
  if (!acceptedAdresses.test(val)) {
    nextToAdress.innerHTML = "entrez une adresse valide";
  } else {
    nextToAdress.innerHTML = "";
    client.address = address.value;
    //  console.log(address.value);
    nextToAdress.innerHTML = "fait";
  }
  localStorage.client = JSON.stringify(client);
});

//*************************** */ valider l'adresse mail***************
email.addEventListener("change", (e) => {
  let val = e.target.value;
  let nextToEmail = email.nextElementSibling;
  nextToEmail.innerHTML = "";
  if (!acceptedEmail.test(val)) {
    nextToEmail.innerHTML = "entrez un email valide";
  } else {
    client.email = email.value;
    // console.log(email.value);
    nextToEmail.innerHTML = "fait";
  }
  localStorage.client = JSON.stringify(client);
});


console.log(client);
localStorage.client = JSON.stringify(client);

// *******verification si tous les champs cont renseignés*******************
// for(let i=0; i<inputs.length;i++){
//   if(inputs[i]=="")
//   {
//     alert('des informations manquantes');
//   }
// }

// *********passer la commande....*********************
document.getElementById("order").addEventListener("click", function (e) {
  e.preventDefault();
  order();
});

function order() {
  var productToOrder = [];
  cart.forEach((element) => {
    if (productToOrder.find((prod) => (prod = element.id)) == undefined) {
      productToOrder.push(element.id);
    }
  });
  order = {
    contact: {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    },
    products: productToOrder,
  };
  localStorage.setItem("order", JSON.stringify(order));
  window.location = "./confirmation.html";
}
