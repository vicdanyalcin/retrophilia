var removeCartItemButtons = document.getElementsByClassName("btn-danger");
for (var i = 0; i < removeCartItemButtons.length; i++) {
  var button = removeCartItemButtons[i];
  button.addEventListener("click", removeCartItem);
}
var quantityInputs = document.getElementsByClassName("cart-quantity-input");
for (var i = 0; i < quantityInputs.length; i++) {
  var input = quantityInputs[i];
  input.addEventListener("change", quantityChanged);
}
var addToCartButtons = document.getElementsByClassName("btn-success");
for (var i = 0; i < addToCartButtons.length; i++) {
  var button = addToCartButtons[i];
  button.addEventListener("click", addToCartClicked);
}

function removeCartItem(e) {
  var buttonClicked = e.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}
function quantityChanged(e) {
  var input = e.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}
function addToCartClicked(e) {
  var button = e.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("card-body")[0].innerText;
  var price = shopItem.getElementsByClassName("item-price")[0].innerText;
  var imgSrc = shopItem.getElementsByClassName("card-img-top")[0].src;

  addItemToCart(title, price, imgSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imgSrc) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-item-title");
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  var cartRowContents = `       
        <div class="cart-item cart-column">
                 <img src="${imgSrc}" alt="" class="cart-item-image" width="150" height="100">
                  <span class="cart-item-title">${title}</span>
        </div>

        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input type="number" class="cart-quantity-input" value="2">
            <button class="btn btn-danger">REMOVE</button>
        </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
}
function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}
