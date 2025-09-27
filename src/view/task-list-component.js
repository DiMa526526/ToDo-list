import {createElement} from '../framework/render.js'; 


function createTaskListComponentTemplate() {
    return (
        `<section class="task-group backlog">
            <h3>Бэклог</h3>
            <ul class="list">
              
            </ul>
        </section>`
      );
}


export default class TaskListComponent {
  getTemplate() {
    return createTaskListComponentTemplate();
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
