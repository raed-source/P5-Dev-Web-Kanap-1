// ***************recuperer le contenu du panier et les afficher dans la page*********
cart = JSON.parse(localStorage.getItem("cart"));

if (cart == null) {
  document.getElementById("cart__items").innerHTML = "votre panier est vide";
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

  const input = document.getElementsByClassName("itemQuantity");
  [...input].forEach((element) => {
    element.addEventListener("input", (e) => {
      changQuantity(e);
    });
  });

  const suppr = document.getElementsByClassName("deleteItem");
  [...suppr].forEach((element) => {
    element.addEventListener("click", (e) => {
      supprElement(e);
    });
  });

  totalPrice();
}

// **********calculer le prix***************
function totalPrice() {
  let price = 0;
  let quantity = 0;
  cart.forEach((element) => {
    price += parseInt(element.price) * parseInt(element.quantity);
    quantity += parseInt(element.quantity);
  });
  document.getElementById("totalPrice").innerHTML = price;
  document.getElementById("totalQuantity").innerHTML = quantity;
}

// ********changer la quantité*************************
function changQuantity(e) {
  const id = e.target.closest("[data-id]").getAttribute("data-id");
  const color = e.target.closest("[data-color]").getAttribute("data-color");
  cart.forEach((element, index) => {
    if (id == element.id && color == element.colors) {
      i = index;
    }
  });
  if (i != -1) {
    console.log(e.target.value);
    let qte = parseInt(e.target.value)
    if (qte > 0 && qte < 100) {
      cart[i].quantity = qte;
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      alert('Saisissez une quantité valide!')
    }
  }
  totalPrice();
}

//************Supprimer un élément */
function supprElement(e) {
  const id = e.target.closest("[data-id]").getAttribute("data-id");
  const color = e.target.closest("[data-color]").getAttribute("data-color");
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
const inputs = document.querySelectorAll(".cart__order__form input");
console.log(inputs);
let client = {};
localStorage.client = JSON.stringify(client);

const firstName = document.querySelector("#firstName");
firstName.classList.add('names');
const lastName = document.querySelector("#lastName");
lastName.classList.add('names');
const city = document.querySelector("#city");
city.classList.add('names');
const names = document.querySelectorAll('.names');

const address = document.querySelector("#address");
const email = document.querySelector('#email')
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
      // nextToName.innerHTML = "validé";
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
    // nextToAdress.innerHTML = "validé";
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
    // nextToEmail.innerHTML = "validé";
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
  if (firstName.value !== '' && lastName.value !== '' && city.value !== '' && address.value !== '' && email.value !== '') {

    order();
  } else {
    alert('tous les champs ne sont pas remplis');
  }
});

function order() {
  let productToOrder = [];
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
  localStorage.removeItem("cart");
  window.location = "./confirmation.html";
}
