import { render } from "../framework/render.js";
import TaskComponent from "../view/task-one-component.js";
import TaskListComponent from "../view/task-list-component.js";
import TasksComponent from "../view/tasks-component.js";
import BasketClearButtonComponent from "../view/basket-clear-button-component.js";
import EmptyListComponent from "../view/empty-list-component.js";
import { TaskStatus } from "../const.js";
import { generateID } from "../utils.js";

export default class TasksBoardPresenter {
  #boardContainer = null;
  #taskModel = null;
  #tasksBoardComponent = new TasksComponent();
  #basketClearButtonComponent = null;

  constructor({ container, taskModel }) {
    this.#boardContainer = container;
    this.#taskModel = taskModel;

    this.#taskModel.addObserver(this.#handleModelChange.bind(this));
  }

  init() {
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

    const tasksForStatus = this.tasks.filter((task) => task.status === status);

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
    this.#basketClearButtonComponent = new BasketClearButtonComponent(() => {
      this.#handleBasketClear();
    });

    render(this.#basketClearButtonComponent, container);

    this.#updateClearButtonState();
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent(task);
    render(taskComponent, container);
  }

  createTask(title) {
    if (!title) {
      return;
    }

    this.#taskModel.addTask(title);
  }

  #handleBasketClear() {
    this.#taskModel.clearBasket();
  }

  #handleModelChange() {
    this.#clearBoard();
    this.#renderBoard();
  }

  #clearBoard() {
    this.#tasksBoardComponent.element.innerHTML = "";
  }

  #updateClearButtonState() {
    if (this.#basketClearButtonComponent) {
      const basketTasks = this.tasks.filter(
        (task) => task.status === TaskStatus.BASKET
      );

      if (basketTasks.length === 0) {
        this.#basketClearButtonComponent.disable();
      } else {
        this.#basketClearButtonComponent.enable();
      }
    }
  }

  get tasks() {
    return this.#taskModel.tasks;
  }
}
