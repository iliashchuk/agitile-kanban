export enum SprintStatus {
  Finished = 'Finished',
  InProgress = 'In Progress',
  Planned = 'Planned',
}

export type Sprint = {
  _id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: SprintStatus;
  tickets: string[];
};
