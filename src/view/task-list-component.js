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
  constructor(status) {
    super();
    this.status = status;
  }

  get template() {
    return createTaskListComponentTemplate(this.status);
  }
}
