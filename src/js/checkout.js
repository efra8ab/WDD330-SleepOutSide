import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

const zipInput = document.querySelector("#zip");
if (zipInput) {
  zipInput.addEventListener("blur", () => checkout.calculateOrderTotal());
  zipInput.addEventListener("change", () => checkout.calculateOrderTotal());
}

const form = document.querySelector("#checkout-form");
if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    await checkout.checkout(form);
  });
}
