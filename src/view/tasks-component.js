import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTasksComponentTemplate() {
  return `<div class="task"></div>`;
}

export default class TasksComponent extends AbstractComponent {
  get template() {
    return createTasksComponentTemplate();
  }
}
