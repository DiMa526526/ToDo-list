import {createElement} from '../framework/render.js'; 


function createTaskOneComponentTemplate() {
    return (
        `<li>Выучить JS</li>`
      );
}


export default class TaskOneComponent {
  getTemplate() {
    return createTaskOneComponentTemplate();
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