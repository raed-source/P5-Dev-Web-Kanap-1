// ***************recuperer le contenu du panier et les afficher dans la page*********
cart = JSON.parse(localStorage.getItem("cart"));
if (cart == null) {
    document.getElementById("cart_items").innerHTML = "votre panier est vide";
    document.getElementsByClassName("cart_price")[0].style.display = none;
    document.getElementsByClassName("cart_ordre")[0].style.display = none;
} else {
    alert('coucou');
    displayCart();
}
// *******afficher le contenu du panie******************
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
        <p>${element.price}</p>
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
}

// **********calculer le prix***************
function priceTotal() {
    var price = 0;
    var quantity = 0;
    cart.forEach((element) => {
        price += element.price;
        quantity += element.quantity;
    });
    document.getElementById("totalPrice").innerText = price;
    document.getElementById("totalQuantity").innerText = quantity;
}
// ********changer la quantité*******
function changQuantity(quantity) {

}

