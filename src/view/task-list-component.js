import { AbstractComponent } from "../framework/view/abstract-component.js";
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
      </div>
    </section>`;
}

export default class TaskListComponent extends AbstractComponent {
  constructor(status, onTaskDrop) {
    super();
    this.status = status;
    this.#setDropHandler(onTaskDrop);
  }

  get template() {
    return createTaskListComponentTemplate(this.status);
  }

  #setDropHandler(onTaskDrop) {
    const container = this.element;
    const list = container.querySelector(".list");

    container.addEventListener("dragover", (event) => {
      event.preventDefault();
      this.#highlightDropZone(event);
    });

    container.addEventListener("dragleave", (event) => {
      event.preventDefault();
      this.#removeDropZoneHighlight();
    });

    container.addEventListener("drop", (event) => {
      event.preventDefault();
      this.#removeDropZoneHighlight();

      const taskId = event.dataTransfer.getData("text/plain");
      const afterElement = this.#getDragAfterElement(list, event.clientY);

      onTaskDrop(taskId, this.status, afterElement);
    });
  }

  #highlightDropZone(event) {
    this.#removeDropZoneHighlight();

    const list = this.element.querySelector(".list");
    const afterElement = this.#getDragAfterElement(list, event.clientY);

    if (afterElement) {
      afterElement.classList.add("drop-before");
    } else {
      list.classList.add("drop-end");
    }
  }

  #removeDropZoneHighlight() {
    const list = this.element.querySelector(".list");
    list.classList.remove("drop-end");

    const highlightedElements = list.querySelectorAll(".drop-before");
    highlightedElements.forEach((element) => {
      element.classList.remove("drop-before");
    });
  }

  #getDragAfterElement(container, y) {
    const draggableElements = [
      ...container.querySelectorAll("li:not(.empty-list):not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
}
