import {
  alertMessage,
  animateCartIcon,
  getLocalStorage,
  setLocalStorage,
} from "./utils.mjs";

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
    alertMessage("Item added to cart.", false);
    animateCartIcon();
  }

  renderProductDetails() {
    const section = document.querySelector(".product-detail");
    const name = this.product.NameWithoutBrand || this.product.Name || "";
    const brand = this.product.Brand?.Name || "";
    const images = this.product.Images || {};
    const image = images.PrimaryLarge || this.product.Image || "";
    const srcset = [
      images.PrimarySmall && `${images.PrimarySmall} 80w`,
      images.PrimaryMedium && `${images.PrimaryMedium} 160w`,
      images.PrimaryLarge && `${images.PrimaryLarge} 320w`,
      images.PrimaryExtraLarge && `${images.PrimaryExtraLarge} 600w`,
    ]
      .filter(Boolean)
      .join(", ");
    const price = Number(this.product.FinalPrice || 0).toFixed(2);
    const color = this.product.Colors?.[0]?.ColorName;

    section.innerHTML = `<h3>${brand}</h3>
      <h2 class="divider">${name}</h2>
      <img
        class="divider"
        src="${image}"
        ${srcset ? `srcset="${srcset}"` : ""}
        sizes="(min-width: 700px) 500px, 90vw"
        alt="${this.product.Name || name}"
      />
      <p class="product-card__price">$${price}</p>
      ${color ? `<p class="product__color">${color}</p>` : ""}
      <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
        <button id="addToCart">Add to Cart</button>
      </div>`;
  }
}
