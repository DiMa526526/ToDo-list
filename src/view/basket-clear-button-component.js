import { AbstractComponent } from "../framework/view/abstract-component.js";

function createBasketClearButtonTemplate() {
  return `<button class="basket-button-remove" type="reset">
      &#10761; Очистить
    </button>`;
}

export default class BasketClearButtonComponent extends AbstractComponent {
  get template() {
    return createBasketClearButtonTemplate();
  }
}
