import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id || item.id || "",
    name: item.Name || item.NameWithoutBrand || "",
    price: Number(item.FinalPrice || item.ListPrice || 0),
    quantity: 1,
  }));
}

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.services = new ExternalServices();
  }

  init() {
    const stored = getLocalStorage(this.key) || [];
    this.list = Array.isArray(stored) ? stored : [stored];
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce(
      (sum, item) => sum + Number(item.FinalPrice || 0),
      0,
    );
    const subtotalElement = document.querySelector(
      `${this.outputSelector} #subtotal`,
    );
    const countElement = document.querySelector(
      `${this.outputSelector} #item-count`,
    );

    if (subtotalElement) {
      subtotalElement.textContent = `$${this.itemTotal.toFixed(2)}`;
    }
    if (countElement) {
      countElement.textContent = this.list.length;
    }
  }

  calculateOrderTotal() {
    if (!this.list.length) {
      this.tax = 0;
      this.shipping = 0;
      this.orderTotal = 0;
      this.displayOrderTotals();
      return;
    }

    this.tax = this.itemTotal * 0.06;
    this.shipping = 10 + Math.max(this.list.length - 1, 0) * 2;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const taxElement = document.querySelector(`${this.outputSelector} #tax`);
    const shippingElement = document.querySelector(
      `${this.outputSelector} #shipping`,
    );
    const totalElement = document.querySelector(
      `${this.outputSelector} #order-total`,
    );

    if (taxElement) taxElement.textContent = `$${this.tax.toFixed(2)}`;
    if (shippingElement)
      shippingElement.textContent = `$${this.shipping.toFixed(2)}`;
    if (totalElement)
      totalElement.textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout(form) {
    if (!form) return null;

    this.calculateOrderTotal();

    const order = formDataToJSON(form);
    order.orderDate = new Date().toISOString();
    order.items = packageItems(this.list);
    order.orderTotal = this.orderTotal.toFixed(2);
    order.shipping = Number(this.shipping.toFixed(2));
    order.tax = this.tax.toFixed(2);

    return this.services.checkout(order);
  }
}
