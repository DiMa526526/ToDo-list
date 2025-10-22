export const generateID = (tasksArray = []) => {
  if (tasksArray.length === 0) {
    return 1;
  }

  const maxID = Math.max(...tasksArray.map((task) => task.id));

  return maxID + 1;
};
