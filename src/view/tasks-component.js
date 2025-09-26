import {createElement} from '../framework/render.js'; 


function createTasksComponentTemplate() {
    return (
        `<section class="task-group backlog">
         
        </section>`
      );
}


export default class TasksComponent {
  getTemplate() {
    return createTasksComponentTemplate();
  }


  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }


    return this.element;
  }


  removeElement() {
    this.element = null;
  }
}