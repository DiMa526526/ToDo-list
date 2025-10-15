import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskAddComponentTemplate() {
  return `<form class="add-task-form">
            <h3 class="add-task-header">Новая задача</h3>
            <div class="add-task-body">
              <label class="visually-hidden" for="taskname">Название задачи</label>
              <input
                class="add-task-form-input"
                id="taskname"
                name="taskname"
                placeholder="Название задачи..."
              />
              <button class="add-task-form-button" type="submit">
                &#43; Добавить
              </button>
            </div>
          </form>`;
}

export default class TaskAddComponent extends AbstractComponent {
  get template() {
    return createTaskAddComponentTemplate();
  }
}
