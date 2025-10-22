import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskOneComponentTemplate(task) {
  return `<li>${task.title}</li>`;
}

export default class TaskOneComponent extends AbstractComponent {
  constructor(task) {
    super();
    this.task = task;
  }

  get template() {
    return createTaskOneComponentTemplate(this.task);
  }
}
