import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

function renderCartContents() {
  const cartData = getLocalStorage("so-cart") || [];
  const cartItems = Array.isArray(cartData) ? cartData : [cartData];
  const listElement = document.querySelector(".product-list");
  const totalElement = document.querySelector(".cart-total");

  if (!cartItems.length) {
    listElement.innerHTML = `<li class="cart-empty">Your cart is empty.</li>`;
    totalElement.textContent = "Total: $0.00";
    return;
  }

  const cartUI = new ShoppingCart(listElement);
  cartUI.render(cartItems);

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.FinalPrice || 0),
    0,
  );
  totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

loadHeaderFooter();
renderCartContents();
