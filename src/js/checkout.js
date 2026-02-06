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
const message = document.querySelector("#checkout-message");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    try {
      const response = await checkout.checkout(form);
      if (message) {
        message.textContent = response
          ? "Order submitted successfully."
          : "Unable to submit order.";
      }
    } catch (error) {
      if (message) {
        message.textContent = error?.message
          ? `Order failed: ${error.message}`
          : "There was a problem submitting your order.";
      }
      console.error(error);
    }
  });
}
