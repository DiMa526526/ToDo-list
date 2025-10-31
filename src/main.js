import HeaderComponent from "./view/header-component.js";
import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";
import TaskModel from "./model/task-model.js";
import TasksApiService from "./tasks-api-service.js";
import { render, RenderPosition } from "./framework/render.js";

const END_POINT = "https://69045a5d6b8dabde4963528d.mockapi.io";
const tasksApiService = new TasksApiService(END_POINT);
const taskModel = new TaskModel({ tasksApiService });

const bodyContainer = document.querySelector(".content");
const addTaskContainer = document.querySelector(".add-task");
const tasksBoardContainer = document.querySelector(".task-group");

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);

const tasksBoardPresenter = new TasksBoardPresenter({
  container: tasksBoardContainer,
  addContainer: addTaskContainer,
  taskModel: taskModel,
});

tasksBoardPresenter.init();
