// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");
  const [headerTemplate, footerTemplate] = await Promise.all([
    loadTemplate("/partials/header.html"),
    loadTemplate("/partials/footer.html"),
  ]);

  if (headerElement) {
    renderWithTemplate(headerTemplate, headerElement);
  }
  if (footerElement) {
    renderWithTemplate(footerTemplate, footerElement);
  }
}

export function formatCategoryName(category) {
  if (!category) return "";
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `
    <p>${message}</p>
    <button class="alert-close" type="button" aria-label="Dismiss alert">x</button>
  `;

  alert.addEventListener("click", (event) => {
    if (event.target.classList.contains("alert-close")) {
      alert.remove();
    }
  });

  const main = document.querySelector("main");
  if (main) {
    main.prepend(alert);
  }

  if (scroll) {
    window.scrollTo(0, 0);
  }
}
