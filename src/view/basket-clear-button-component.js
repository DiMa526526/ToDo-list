import { AbstractComponent } from "../framework/view/abstract-component.js";

function createBasketClearButtonTemplate() {
  return `<button class="basket-button-remove" type="button">
      &#10761; Очистить
    </button>`;
}

export default class BasketClearButtonComponent extends AbstractComponent {
  #handleClick = null;

  constructor(onClick) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener("click", this.#clickHandler.bind(this));
  }

  get template() {
    return createBasketClearButtonTemplate();
  }

  #clickHandler(evt) {
    evt.preventDefault();
    this.#handleClick();
  }

  disable() {
    this.element.disabled = true;
    this.element.style.opacity = "0.5";
    this.element.style.cursor = "not-allowed";
  }

  enable() {
    this.element.disabled = false;
    this.element.style.opacity = "1";
    this.element.style.cursor = "pointer";
  }
}
