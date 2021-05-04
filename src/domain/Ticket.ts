export enum TickerType {
  Story = 'Story',
  Task = 'Task',
  Bugfix = 'Bugfix',
}

export enum SubtaskStatus {
  ToDo = 'To Do',
  InProgress = 'In Progress',
  Review = 'Review',
  Done = 'Done',
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
  status?: SubtaskStatus;
};
