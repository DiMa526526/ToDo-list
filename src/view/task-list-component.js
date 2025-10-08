import { createElement } from "../framework/render.js";
import { StatusTitles } from "../const.js";

function createTaskListComponentTemplate(status) {
  const statusTitle = StatusTitles[status] || status;

  const cssClassMap = {
    backlog: "backlog",
    process: "in-process",
    done: "complete",
    basket: "basket",
  };

  const cssClass = cssClassMap[status] || status;

  return `<section class="task-group ${cssClass}">
      <div class="column">
        <h3>${statusTitle}</h3>
        <ul class="list"></ul>
        ${
          status === "basket"
            ? '<button class="basket-button-remove" type="reset">&#10761; Очистить</button>'
            : ""
        }
      </div>
    </section>`;
}

export default class TaskListComponent {
  constructor(status) {
    this.status = status;
  }

  getTemplate() {
    return createTaskListComponentTemplate(this.status);
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
