import TaskComponent from "../view/task-one-component.js";

export default class TasksBoardPresenter {
  constructor({ container, taskModel }) {
    this.container = container;
    this.taskModel = taskModel;
    this.boardTasks = [];
  }

  init() {
    this.boardTasks = this.taskModel.getTasks();
    this.renderTasks();
  }

  renderTasks() {
    const tasksByStatus = {
      backlog: this.boardTasks.filter((task) => task.status === "backlog"),
      process: this.boardTasks.filter((task) => task.status === "process"),
      done: this.boardTasks.filter((task) => task.status === "done"),
      basket: this.boardTasks.filter((task) => task.status === "basket"),
    };

    const statusToCssClass = {
      backlog: "backlog",
      process: "in-process",
      done: "complete",
      basket: "basket",
    };

    Object.entries(tasksByStatus).forEach(([status, tasks]) => {
      const cssClass = statusToCssClass[status];
      const statusContainer = this.container.querySelector(
        `.${cssClass} .list`
      );

      console.log(
        `Status: ${status}, CSS Class: ${cssClass}, Tasks: ${tasks.length}, Container:`,
        statusContainer
      );

      if (statusContainer) {
        statusContainer.innerHTML = "";

        tasks.forEach((task) => {
          const taskComponent = new TaskComponent(task);
          statusContainer.appendChild(taskComponent.getElement());
        });
      } else {
        console.warn(
          `Container not found for status: ${status} (CSS class: ${cssClass})`
        );
      }
    });
  }
}
