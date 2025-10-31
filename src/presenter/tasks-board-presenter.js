import { render } from "../framework/render.js";
import TaskComponent from "../view/task-one-component.js";
import TaskListComponent from "../view/task-list-component.js";
import TasksComponent from "../view/tasks-component.js";
import BasketClearButtonComponent from "../view/basket-clear-button-component.js";
import EmptyListComponent from "../view/empty-list-component.js";
import LoadingViewComponent from "../view/loading-view-component.js";
import TaskAddComponent from "../view/task-add-component.js";
import { TaskStatus, UserAction } from "../const.js";

export default class TasksBoardPresenter {
  #boardContainer = null;
  #addTaskContainer = null;
  #taskModel = null;

  #tasksBoardComponent = new TasksComponent();
  #basketClearButtonComponent = null;
  #loadingComponent = new LoadingViewComponent();
  #taskAddComponent = null;

  constructor({ container, addContainer, taskModel }) {
    this.#boardContainer = container;
    this.#addTaskContainer = addContainer;
    this.#taskModel = taskModel;

    this.#taskModel.addObserver(this.#handleModelEvent.bind(this));
  }

  #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer);
    Object.values(TaskStatus).forEach((status) =>
      this.#renderTasksList(status)
    );
  }

  #renderTasksList(status) {
    const tasksListComponent = new TaskListComponent(
      status,
      this.#handleTaskDrop.bind(this)
    );

    render(tasksListComponent, this.#tasksBoardComponent.element);

    const tasksForStatus = this.#taskModel.getTasksByStatus(status);
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

  async #handleTaskDrop(taskId, newStatus, afterElement = null) {
    try {
      const afterTaskId = afterElement ? afterElement.dataset.taskId : null;
      await this.#taskModel.reorderTask(taskId, newStatus, afterTaskId);
    } catch (err) {}
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

  async createTask(title) {
    try {
      await this.#taskModel.addTask(title);
    } catch (err) {}
  }

  async #handleBasketClear() {
    try {
      await this.#taskModel.clearBasketTasks();
    } catch (err) {}
  }

  #handleModelEvent(event, payload) {
    switch (event) {
      case UserAction.ADD_TASK:
      case UserAction.UPDATE_TASK:
      case UserAction.DELETE_TASK:
        this.#clearBoard();
        this.#renderBoard();
        break;
    }
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

  async init() {
    this.#taskAddComponent = new TaskAddComponent(this.createTask.bind(this));
    render(this.#taskAddComponent, this.#addTaskContainer);
    render(this.#loadingComponent, this.#boardContainer);

    try {
      await this.#taskModel.init();
      this.#boardContainer.innerHTML = "";
      this.#renderBoard();
    } catch (error) {}
  }
}
