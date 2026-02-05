import { renderListWithTemplate } from "./utils.mjs";

const supportedProducts = ["344YJ", "880RR", "985PR", "985RF"];

function productCardTemplate(product) {
  const name = product.NameWithoutBrand || product.Name;
  const brand = product.Brand?.Name || "";
  const image = product.Image || "";
  const productLink = `product_pages/index.html?product=${product.Id}`;

  return `<li class="product-card">
    <a href="${productLink}">
      <img src="${image}" alt="Image of ${name}">
      <h3 class="card__brand">${brand}</h3>
      <h2 class="card__name">${name}</h2>
      <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    const listToRender = list.filter((product) =>
      supportedProducts.includes(product.Id),
    );
    this.renderList(listToRender);
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true,
    );
  }
}
