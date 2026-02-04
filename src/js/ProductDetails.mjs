import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    if (!this.product) {
      document.querySelector(".product-detail").innerHTML =
        "<p>Sorry, this product was not found.</p>";
      return;
    }
    this.renderProductDetails();
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    this.addProductToCart(this.product);
  }

  addProductToCart(product) {
    const cart = getLocalStorage("so-cart") || [];
    const updatedCart = Array.isArray(cart) ? cart : [cart];
    updatedCart.push(product);
    setLocalStorage("so-cart", updatedCart);
  }

  renderProductDetails() {
    const section = document.querySelector(".product-detail");
    section.innerHTML = `<h3>${this.product.Brand.Name}</h3>
      <h2 class="divider">${this.product.NameWithoutBrand}</h2>
      <img class="divider" src="${this.product.Image}" alt="${this.product.Name}" />
      <p class="product-card__price">$${this.product.FinalPrice}</p>
      <p class="product__color">${this.product.Colors[0].ColorName}</p>
      <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
        <button id="addToCart">Add to Cart</button>
      </div>`;
  }
}
