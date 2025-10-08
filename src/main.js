import HeaderComponent from "./view/header-component.js";
import TaskAddComponent from "./view/task-add-component.js";
import TasksComponent from "./view/tasks-component.js";
import TaskListComponent from "./view/task-list-component.js";
import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";
import TaskModel from "./model/task-model.js";
import { render, RenderPosition } from "./framework/render.js";
import { TaskStatus } from "./const.js";

const taskModel = new TaskModel();

const tasksComponent = new TasksComponent();
const bodyContainer = document.querySelector(".content");
const formContainer = document.querySelector(".add-task");
const listsContainer = document.querySelector(".task-group");

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new TaskAddComponent(), formContainer);
render(tasksComponent, listsContainer);

const statuses = [
  TaskStatus.BACKLOG,
  TaskStatus.PROCESS,
  TaskStatus.DONE,
  TaskStatus.BASKET,
];

statuses.forEach((status) => {
  const taskListComponent = new TaskListComponent(status);
  render(
    taskListComponent,
    tasksComponent.getElement(),
    RenderPosition.BEFOREEND
  );
});

const tasksBoardPresenter = new TasksBoardPresenter({
  container: document.querySelector(".task-group"),
  taskModel: taskModel,
});

tasksBoardPresenter.init();
