import HeaderComponent from './view/header-component.js';
import TaskAddComponent from './view/task-add-component.js';
import TasksComponent from './view/tasks-component.js';
import TaskListComponent from './view/task-list-component.js';
import TaskOneComponent from './view/task-one-component.js';
import {render, RenderPosition} from './framework/render.js';


const tasksComponent = new TasksComponent();

const bodyContainer= document.querySelector('.content');
const formContainer = document.querySelector('.add-task');
const listsContainer = document.querySelector('.task-group');


render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new TaskAddComponent(), formContainer);
render(tasksComponent, listsContainer);

for (let j = 0; j < 4; j++) {
    const taskListComponent = new TaskListComponent();
    render(taskListComponent, tasksComponent.getElement(), RenderPosition.BEFOREEND);


  for (let i = 0; i < 4; i++) {
    render(new TaskOneComponent(), taskListComponent.getElement(), RenderPosition.BEFOREEND);
  }
}