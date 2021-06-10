export const dispatchTaskDoneEvent = () => {
  const projectEvent = new CustomEvent('task-done');
  window.dispatchEvent(projectEvent);
};

export const dispatchSprintEvent = () => {
  const onSprintPageEvent = new CustomEvent('on-sprint-page');
  window.dispatchEvent(onSprintPageEvent);
};
