import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouteMatch } from 'react-router-dom';
import parseDate from 'date-fns/parseISO';
import useFetch from 'use-http';
import querystring from 'querystring';

import { Sprint, SprintStatus } from '../domain/Sprint';
import { PROJECT_PARAMS_PATH, SprintParams } from '../domain/Router';
import { API_URL } from '../config';
import { ProjectContext } from './ProjectContext';

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
  const { project } = useContext(ProjectContext);
  const sprintMatch = useRouteMatch<SprintParams>(
    `${PROJECT_PARAMS_PATH}/sprint/:id`
  );

  const [sprints, setSprints] = useState<ResponseSprint[]>([]);
  const [activeSprintId, setLocalActiveSprintId] = useState(
    getActiveSprintIdFromStorage()
  );

  const { get, loading: sprintsLoading } = useFetch<ResponseSprint[]>(
    `${API_URL}/sprints`
  );
  const { post, put } = useFetch<Sprint>(`${API_URL}/sprint`);

  const fetchAndSetSprints = useCallback(async () => {
    if (project) {
      const { owner, repo } = project;
      const response = await get(`?${querystring.stringify({ owner, repo })}`);

      setSprints(response);
    }
  }, [project, get]);

  const setActiveSprintId = (id?: string) => {
    setActiveSprintIdToStorage(id);
    setLocalActiveSprintId(id);
  };

  useEffect(() => {
    fetchAndSetSprints();
  }, [fetchAndSetSprints, project]);

  useEffect(() => {
    if (!activeSprintId) {
      const activeSprint = sprints.find(
        ({ status }) => status === SprintStatus.InProgress
      );

      if (activeSprint) {
        setActiveSprintId(activeSprint._id);
      } else {
        setActiveSprintId(undefined);
      }
    }
  }, [sprints, activeSprintId]);

  useEffect(() => {
    if (activeSprintId) {
      const sprintInProgress = sprints.find(
        ({ status }) => status === SprintStatus.InProgress
      );

      if (!sprintInProgress || activeSprintId !== sprintInProgress._id) {
        setActiveSprintId(sprintInProgress?._id);
      }
    }
  }, [activeSprintId, sprints]);

  const updateAndRefetchSprint = async (ticket: Partial<Sprint>) => {
    await put(ticket);
    fetchAndSetSprints();
  };

  const submitSprint = async (sprint: Sprint) => {
    if (project) {
      const { owner, repo } = project;

      if (!sprint._id) {
        await post({ ...sprint, owner, repo });
        fetchAndSetSprints();
      }
      await updateAndRefetchSprint(sprint);
    }
  };

  const selectedSprint = sprints.find(
    ({ _id: id }) => id === sprintMatch?.params.id
  );

  const startSprint: ISprintContext['startSprint'] = async (sprintId) => {
    if (activeSprintId) {
      // add logs
      return;
    }
    if (sprintId) {
      await updateAndRefetchSprint({
        _id: sprintId,
        status: SprintStatus.InProgress,
      });
      setActiveSprintId(sprintId);
    }
  };

  const finishSprint: ISprintContext['finishSprint'] = async (sprintId) => {
    await updateAndRefetchSprint({
      _id: sprintId,
      status: SprintStatus.Finished,
    });
    setActiveSprintId(undefined);
  };

  const addTicketToSprint: ISprintContext['addTicketToSprint'] = (
    sprintId,
    ticketId
  ) => {
    updateAndRefetchSprint({
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
