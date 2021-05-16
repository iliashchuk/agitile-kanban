import React, { createContext, useEffect, useState } from 'react';
import { LocationDescriptor } from 'history';
import { Octokit } from '@octokit/rest';
import querystring from 'querystring';

import { PROJECT_PARAMS_PATH } from '../domain/Router';

import { generatePath, useRouteMatch } from 'react-router-dom';
import { Contributor } from '../domain/Project';
import { API_URL } from '../config';
import useFetch from 'use-http';

export interface Project {
  owner: string;
  repo: string;
  prefix: string;
  seq: number;
}

type ProjectParameters = Pick<Project, 'owner' | 'repo'>;

interface IProjectContext {
  project?: Project;
  loading: boolean;
  projectMatchParams?: ProjectParameters;
  contributors: Contributor[];
  createProjectWithMatchParams(prefix: string): void;
  getProjectRelativePath(path: LocationDescriptor): LocationDescriptor;
}

export const ProjectContext = createContext<IProjectContext>(
  {} as IProjectContext
);

const octokit = new Octokit();

export const ProjectProvider: React.FC = ({ children }) => {
  const projectMatch = useRouteMatch<ProjectParameters>(PROJECT_PARAMS_PATH);
  const [contributors] = useState<Contributor[]>([]);
  const [project, setProject] = useState<Project>();
  const projectMatchParams = projectMatch?.params;

  const { get, post, loading } = useFetch(`${API_URL}/project`);

  useEffect(() => {
    if (projectMatchParams) {
      setProject(undefined);
      const getProject = async () => {
        const project = await get(
          `?${querystring.stringify(projectMatchParams)}`
        );
        if (project) {
          setProject(project as Project);
        }
      };
      getProject();
    }
  }, [projectMatchParams?.owner, projectMatchParams?.repo, get]);

  const getProjectRelativePath: IProjectContext['getProjectRelativePath'] = (
    path
  ) => {
    if (!project) {
      return path;
    }
    const { owner, repo } = project;
    return generatePath(`${PROJECT_PARAMS_PATH}${path}`, { owner, repo });
  };

  const createProjectWithMatchParams: IProjectContext['createProjectWithMatchParams'] = async (
    prefix
  ) => {
    const project = await post({ ...projectMatchParams, prefix });

    if (project) {
      setProject(project);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        loading,
        project,
        projectMatchParams,
        contributors,
        getProjectRelativePath,
        createProjectWithMatchParams,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
