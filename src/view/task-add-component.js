import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskAddComponentTemplate() {
  return `<form class="add-task-form">
            <h3 class="add-task-header">Новая задача</h3>
            <div class="add-task-body">
              <label class="visually-hidden" for="add-task">Название задачи</label>
              <input
                class="add-task-form-input"
                id="add-task"
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
  #handleSubmit = null;

  constructor(onSubmit) {
    super();
    this.#handleSubmit = onSubmit;
    this.element.addEventListener("submit", this.#submitHandler.bind(this));
  }

  get template() {
    return createTaskAddComponentTemplate();
  }

  #submitHandler(evt) {
    evt.preventDefault();

    const input = this.element.querySelector("#add-task");
    const title = input.value.trim();

    if (title) {
      this.#handleSubmit(title);
      input.value = "";
    }
  }
}
