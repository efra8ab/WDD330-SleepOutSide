import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam, formatCategoryName } from "./utils.mjs";

async function initProductListing() {
  loadHeaderFooter();

  const category = getParam("category") || "tents";
  const dataSource = new ProductData();
  const listElement = document.querySelector(".product-list");
  const myList = new ProductList(category, dataSource, listElement);

  const displayCategory = formatCategoryName(category);
  const titleElement = document.querySelector(".product-list-title");
  if (titleElement) {
    titleElement.textContent = displayCategory
      ? `Top Products: ${displayCategory}`
      : "Top Products";
  }

  const list = await myList.init();

  const breadcrumb = document.querySelector(".breadcrumbs");
  if (breadcrumb && displayCategory) {
    const count = Array.isArray(list) ? list.length : 0;
    breadcrumb.textContent = `${displayCategory} -> (${count} items)`;
  }
}

initProductListing();
