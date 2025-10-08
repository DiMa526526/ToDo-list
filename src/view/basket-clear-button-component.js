import { createElement } from "../framework/render.js";

function createBasketClearButtonTemplate() {
  return `<button class="basket-button-remove" type="reset">
      &#10761; Очистить
    </button>`;
}

export default class BasketClearButtonComponent {
  getTemplate() {
    return createBasketClearButtonTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
