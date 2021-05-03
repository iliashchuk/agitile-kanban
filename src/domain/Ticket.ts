export enum TickerType {
  Story = 'Story',
  Task = 'Task',
  Bugfix = 'Bugfix',
}

export type Subtask = {
  id: string;
  name: string;
  isCompleted: boolean;
};

export type Ticket = {
  name: string;
  id: string;
  description?: string;
  type: TickerType;
  subtasks?: Subtask[];
  assignee?: string;
  status?: string;
};
