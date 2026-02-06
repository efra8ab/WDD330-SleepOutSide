import { getParam, loadHeaderFooter, formatCategoryName } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParam("product");
const category = getParam("category");
const dataSource = new ExternalServices();
const product = new ProductDetails(productId, dataSource);
loadHeaderFooter();

const breadcrumb = document.querySelector(".breadcrumbs");
if (breadcrumb) {
  const displayCategory = formatCategoryName(category);
  breadcrumb.textContent = displayCategory || "Products";
}

product.init();
