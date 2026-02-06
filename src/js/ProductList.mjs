import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product, category) {
  const name = product.NameWithoutBrand || product.Name;
  const brand = product.Brand?.Name || "";
  const images = product.Images || {};
  const image = images.PrimaryMedium || product.Image || "";
  const srcset = [
    images.PrimarySmall && `${images.PrimarySmall} 80w`,
    images.PrimaryMedium && `${images.PrimaryMedium} 160w`,
    images.PrimaryLarge && `${images.PrimaryLarge} 320w`,
    images.PrimaryExtraLarge && `${images.PrimaryExtraLarge} 600w`,
  ]
    .filter(Boolean)
    .join(", ");
  const productLink = category
    ? `/product_pages/index.html?product=${product.Id}&category=${category}`
    : `/product_pages/index.html?product=${product.Id}`;

  return `<li class="product-card">
    <a href="${productLink}">
      <img
        src="${image}"
        ${srcset ? `srcset="${srcset}"` : ""}
        sizes="(min-width: 900px) 250px, (min-width: 600px) 45vw, 90vw"
        alt="Image of ${name}"
      >
      <h3 class="card__brand">${brand}</h3>
      <h2 class="card__name">${name}</h2>
      <p class="product-card__price">$${Number(product.FinalPrice).toFixed(2)}</p>
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
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    return list;
  }

  renderList(list) {
    renderListWithTemplate(
      (item) => productCardTemplate(item, this.category),
      this.listElement,
      list,
      "afterbegin",
      true,
    );
  }
}
