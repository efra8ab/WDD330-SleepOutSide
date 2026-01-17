import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Always store the cart as an ARRAY in localStorage
  const cart = getLocalStorage("so-cart") || [];
  const updatedCart = Array.isArray(cart) ? cart : [cart];

  updatedCart.push(product);
  setLocalStorage("so-cart", updatedCart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
