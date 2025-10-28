import HeaderComponent from "./view/header-component.js";
import TaskAddComponent from "./view/task-add-component.js";
import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";
import TaskModel from "./model/task-model.js";
import { render, RenderPosition } from "./framework/render.js";

const taskModel = new TaskModel();

const bodyContainer = document.querySelector(".content");
const formContainer = document.querySelector(".add-task");
const listsContainer = document.querySelector(".task-group");

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);

const tasksBoardPresenter = new TasksBoardPresenter({
  container: listsContainer,
  taskModel: taskModel,
});

function handleNewTaskButtonClick(title) {
  tasksBoardPresenter.createTask(title);
}

const taskAddComponent = new TaskAddComponent(handleNewTaskButtonClick);

render(taskAddComponent, formContainer);

tasksBoardPresenter.init();
