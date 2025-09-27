import {createElement} from '../framework/render.js'; 


function createTasksComponentTemplate() {
    return (
        `<div class="task">
         
        </div>`
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