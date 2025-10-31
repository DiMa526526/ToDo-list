import { AbstractComponent } from "../framework/view/abstract-component.js";

function createEmptyListTemplate() {
  return `
    <li class="empty-list">
      <div class="empty-list__content">
        Перетащите карточку
      </div>
    </li>
  `;
}

export default class EmptyListComponent extends AbstractComponent {
  get template() {
    return createEmptyListTemplate();
  }
}
