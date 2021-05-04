import React, { createContext, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import parseDate from 'date-fns/parseISO';

import { Sprint, SprintStatus } from '../domain/Sprint';
import { SprintParams } from '../domain/Router';

interface ISprintContext {
  sprints: Sprint[];
  activeSprintId?: string;
  setActiveSprintId(id?: string): void;
  finishSprint(id: string): void;
  selectedSprint?: Sprint;
  submitSprint(sprint: Sprint): void;
}

type StorageSprint = Sprint & { startDate: string; endDate: string };

export const SprintContext = createContext<ISprintContext>({
  sprints: [],
  submitSprint: () => null,
  setActiveSprintId: () => null,
  finishSprint: () => null,
});

const getSprintsFromStorage = (): StorageSprint[] =>
  JSON.parse(localStorage.getItem('sprints') ?? '[]');

const setSprintsToStorage = (sprints: Sprint[]) =>
  localStorage.setItem('sprints', JSON.stringify(sprints));

const getActiveSprintIdFromStorage = (): string | undefined =>
  localStorage.getItem('activeSprintId') || undefined;

const setActiveSprintIdToStorage = (id?: string) => {
  if (!id) {
    localStorage.removeItem('activeSprintId');
    return;
  }
  localStorage.setItem('activeSprintId', id);
};

export const SprintProvider: React.FC = ({ children }) => {
  const match = useRouteMatch<SprintParams>('/sprint/:id');
  const [activeSprintId, setLocalActiveSprintId] = useState(
    getActiveSprintIdFromStorage()
  );
  const [sprints, setSprints] = useState<Sprint[]>(
    getSprintsFromStorage().map((sprint) => ({
      ...sprint,
      startDate: parseDate(sprint.startDate),
      endDate: parseDate(sprint.endDate),
    }))
  );

  const handleSetSprints = (sprints: Sprint[]) => {
    setSprints(sprints);
    setSprintsToStorage(sprints);
  };

  const handleSetActiveSprintId = (id?: string) => {
    setActiveSprintIdToStorage(id);
    setLocalActiveSprintId(id);
  };

  const selectedSprint = sprints.find(({ id }) => id === match?.params.id);

  const submitSprint: ISprintContext['submitSprint'] = (submitted) => {
    const currentSprints: Sprint[] = JSON.parse(
      localStorage.getItem('sprints') ?? '[]'
    );

    const sprintIndex = currentSprints.findIndex(
      ({ id }) => id === submitted.id
    );

    if (sprintIndex !== -1) {
      currentSprints[sprintIndex] = submitted;
    } else {
      currentSprints.push({ ...submitted });
    }

    handleSetSprints(currentSprints);
  };

  const setActiveSprintId: ISprintContext['setActiveSprintId'] = (sprintId) => {
    if (sprintId && activeSprintId) {
      // add logs
      return;
    }
    handleSetActiveSprintId(sprintId);
    if (sprintId) {
      handleSetSprints(
        sprints.map((sprint) => {
          if (sprint.id === sprintId) {
            return { ...sprint, status: SprintStatus.InProgress };
          }
          return sprint;
        })
      );
    }
  };

  const finishSprint: ISprintContext['finishSprint'] = (sprintId) => {
    setActiveSprintId(undefined);

    handleSetSprints(
      sprints.map((sprint) => {
        if (sprint.id === sprintId) {
          return { ...sprint, status: SprintStatus.Finished };
        }
        return sprint;
      })
    );
  };

  return (
    <SprintContext.Provider
      value={{
        sprints,
        submitSprint,
        selectedSprint,
        setActiveSprintId,
        activeSprintId,
        finishSprint,
      }}
    >
      {children}
    </SprintContext.Provider>
  );
};
