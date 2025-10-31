import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskOneComponentTemplate(task) {
  return `<li data-task-id="${task.id}">${task.title}</li>`;
}

export default class TaskOneComponent extends AbstractComponent {
  constructor(task) {
    super();
    this.task = task;
    this.#afterCreateElement();
  }

  get template() {
    return createTaskOneComponentTemplate(this.task);
  }

  #afterCreateElement() {
    this.#makeTaskDraggable();
  }

  #makeTaskDraggable() {
    this.element.setAttribute("draggable", true);

    this.element.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", this.task.id.toString());
      this.element.classList.add("dragging");
    });

    this.element.addEventListener("dragend", () => {
      this.element.classList.remove("dragging");
    });
  }
}
