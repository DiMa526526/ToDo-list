import { render } from "../framework/render.js";
import TaskComponent from "../view/task-one-component.js";
import TaskListComponent from "../view/task-list-component.js";
import TasksComponent from "../view/tasks-component.js";
import BasketClearButtonComponent from "../view/basket-clear-button-component.js";
import EmptyListComponent from "../view/empty-list-component.js";
import { TaskStatus } from "../const.js";

export default class TasksBoardPresenter {
  #boardContainer = null;
  #taskModel = null;
  #boardTasks = [];
  #tasksBoardComponent = new TasksComponent();

  constructor({ container, taskModel }) {
    this.#boardContainer = container;
    this.#taskModel = taskModel;
  }

  init() {
    this.#boardTasks = [...this.#taskModel.tasks];
    this.#renderBoard();
  }

  #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer);

    Object.values(TaskStatus).forEach((status) => {
      this.#renderTasksList(status);
    });
  }

  #renderTasksList(status) {
    const tasksListComponent = new TaskListComponent(status);
    render(tasksListComponent, this.#tasksBoardComponent.element);

    const tasksForStatus = this.#boardTasks.filter(
      (task) => task.status === status
    );

    const listContainer = tasksListComponent.element.querySelector(".list");

    if (tasksForStatus.length === 0) {
      this.#renderEmptyList(listContainer);
    } else {
      tasksForStatus.forEach((task) => this.#renderTask(task, listContainer));
    }

    if (status === TaskStatus.BASKET) {
      this.#renderClearButton(tasksListComponent.element);
    }
  }

  #renderEmptyList(container) {
    const emptyListComponent = new EmptyListComponent();
    render(emptyListComponent, container);
  }

  #renderClearButton(container) {
    const buttonComponent = new BasketClearButtonComponent();
    render(buttonComponent, container);
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent(task);
    render(taskComponent, container);
  }
}
