export enum TicketType {
  Story = 'Story',
  Task = 'Task',
  Bugfix = 'Bugfix',
}

export enum TicketStatus {
  ToDo = 'To Do',
  InProgress = 'In Progress',
  Review = 'Review',
  Done = 'Done',
}

export enum TicketDNDTypes {
  TICKET = 'TICKET',
  COLUMN = 'COLUMN',
}

export const TicketStatuses = Object.values(TicketStatus) as TicketStatus[];

export type Subtask = {
  _id: string;
  name: string;
  displayId: string;
  isCompleted: boolean;
};

export type Ticket = {
  name: string;
  displayId: string;
  _id: string;
  status: TicketStatus;
  type: TicketType;
  description?: string;
  subtasks?: Subtask[];
  assignee?: string;
  owner: string;
  repo: string;
};
