export enum SprintStatus {
  Finished = 'Finished',
  InProgress = 'In Progress',
  Planned = 'Planned',
}

export type Sprint = {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: SprintStatus;
  ticketsIds: string[];
};
