import React, { createContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import parseDate from 'date-fns/parseISO';
import useFetch from 'use-http';

import { Sprint, SprintStatus } from '../domain/Sprint';
import { SprintParams } from '../domain/Router';
import { API_URL } from '../config';

interface ISprintContext {
  sprints: Sprint[];
  selectedSprint?: Sprint;
  activeSprintId?: string;
  sprintsLoading: boolean;
  startSprint(id?: string): void;
  finishSprint(id: string): void;
  submitSprint(sprint: Sprint): void;
  addTicketToSprint(sprintId: string, ticketId: string): void;
}

type ResponseSprint = Sprint & { startDate: string; endDate: string };

export const SprintContext = createContext<ISprintContext>(
  {} as ISprintContext
);

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

  const { post, put, data: updatedData } = useFetch<Sprint>(
    `${API_URL}/sprint`
  );

  const { data: sprints = [], loading: sprintsLoading } = useFetch<
    ResponseSprint[]
  >(`${API_URL}/sprints`, {}, [updatedData]);

  useEffect(() => {
    if (!activeSprintId) {
      const activeSprint = sprints.find(
        ({ status }) => status === SprintStatus.InProgress
      );

      if (activeSprint) {
        setActiveSprintId(activeSprint._id);
      }
    }
  }, [sprints, activeSprintId]);

  const submitSprint = async (sprint: Sprint) => {
    if (!sprint._id) {
      await post(sprint);
      return;
    }
    await put(sprint);
  };

  const setActiveSprintId = (id?: string) => {
    setActiveSprintIdToStorage(id);
    setLocalActiveSprintId(id);
  };

  const selectedSprint = sprints.find(({ _id: id }) => id === match?.params.id);

  const startSprint: ISprintContext['startSprint'] = (sprintId) => {
    if (sprintId && activeSprintId) {
      // add logs
      return;
    }
    setActiveSprintId(sprintId);
    if (sprintId) {
      put({ _id: sprintId, status: SprintStatus.InProgress });
    }
  };

  const finishSprint: ISprintContext['finishSprint'] = (sprintId) => {
    setActiveSprintId(undefined);
    put({ _id: sprintId, status: SprintStatus.Finished });
  };

  const addTicketToSprint: ISprintContext['addTicketToSprint'] = (
    sprintId,
    ticketId
  ) => {
    put({
      _id: sprintId,
      tickets: [
        ...(sprints.find(({ _id }) => _id === sprintId)?.tickets ?? []),
        ticketId,
      ],
    });
  };

  return (
    <SprintContext.Provider
      value={{
        sprints: sprints.map((sprint) => ({
          ...sprint,
          startDate: parseDate(sprint.startDate),
          endDate: parseDate(sprint.endDate),
        })),
        submitSprint,
        selectedSprint,
        sprintsLoading,
        startSprint,
        activeSprintId,
        finishSprint,
        addTicketToSprint,
      }}
    >
      {children}
    </SprintContext.Provider>
  );
};
