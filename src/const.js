export const TaskStatus = {
  BACKLOG: "backlog",
  PROCESS: "process",
  DONE: "done",
  BASKET: "basket",
};

export const StatusTitles = {
  [TaskStatus.BACKLOG]: "Бэклог",
  [TaskStatus.PROCESS]: "В процессе",
  [TaskStatus.DONE]: "Готово",
  [TaskStatus.BASKET]: "Корзина",
};

export const UserAction = {
  UPDATE_TASK: "UPDATE_TASK",
  ADD_TASK: "ADD_TASK",
  DELETE_TASK: "DELETE_TASK",
};

export const UpdateType = {
  PATCH: "PATCH",
  MINOR: "MINOR",
  MAJOR: "MAJOR",
  INIT: "INIT",
};
