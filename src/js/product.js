import { getParam, loadHeaderFooter, formatCategoryName } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParam("product");
const category = getParam("category");
const dataSource = new ProductData();
const product = new ProductDetails(productId, dataSource);
loadHeaderFooter();

const breadcrumb = document.querySelector(".breadcrumbs");
if (breadcrumb) {
  const displayCategory = formatCategoryName(category);
  breadcrumb.textContent = displayCategory || "Products";
}

product.init();
