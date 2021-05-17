import { ProjectParameters } from '../domain/Project';

export const dispatchProjectEvent = (project: ProjectParameters) => {
  const projectEvent = new CustomEvent('project-ready', {
    detail: project,
  });
  window.dispatchEvent(projectEvent);
};

export const dispatchSprintEvent = () => {
  const onSprintPageEvent = new CustomEvent('on-sprint-page');
  window.dispatchEvent(onSprintPageEvent);
};
