import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cart = getLocalStorage("so-cart") || [];
  const cartItems = Array.isArray(cart) ? cart : [cart];
  const listElement = document.querySelector(".product-list");
  const totalElement = document.querySelector(".cart-total");

  if (!cartItems.length) {
    listElement.innerHTML = `<li class="cart-empty">Your cart is empty.</li>`;
    totalElement.textContent = "Total: $0.00";
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  listElement.innerHTML = htmlItems.join("");

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.FinalPrice || 0),
    0,
  );
  totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${Number(item.FinalPrice).toFixed(2)}</p>
</li>`;

  return newItem;
}

renderCartContents();
