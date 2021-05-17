export interface Repo {
  id: number;
  name: string;
}

export interface Contributor {
  id?: number;
  login?: string;
  avatar_url?: string;
}

export interface Project {
  owner: string;
  repo: string;
  prefix: string;
  seq: number;
}

export type ProjectParameters = Pick<Project, 'owner' | 'repo'>;
