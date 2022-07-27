// ********cree un panier pour stocker les produits*******
let cart = [];
localStorage.setItem("cart", JSON.stringify(cart));
document.getElementById("cart__items")


//********method pour recuperer le panier avec ces produits s'il y en a ********
function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart != null)
        return JSON.parse(cart);
    return [];
}

//*************methode pour ajouter un produit dans panier***** */
function addProduct(product) {
    let cart = getCart();
    cart.push(product);
    saveCart(cart);
}