import { renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  const color = item.Colors?.[0]?.ColorName || "";
  const productLink = `/product_pages/index.html?product=${item.Id}`;
  const image = item.Images?.PrimaryMedium || item.Image || "";

  return `<li class="cart-card divider">
  <a href="${productLink}" class="cart-card__image">
    <img src="${image}" alt="${item.Name}" />
  </a>
  <a href="${productLink}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${color}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${Number(item.FinalPrice).toFixed(2)}</p>
</li>`;
}

export default class ShoppingCart {
  constructor(listElement) {
    this.listElement = listElement;
  }

  render(cartItems) {
    renderListWithTemplate(
      cartItemTemplate,
      this.listElement,
      cartItems,
      "afterbegin",
      true,
    );
  }
}
