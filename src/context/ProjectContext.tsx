import React, { createContext, useEffect, useState } from 'react';
import { LocationDescriptor } from 'history';
import { Octokit } from '@octokit/rest';

import { PROJECT_PARAMS_PATH } from '../domain/Router';

import { generatePath, useRouteMatch } from 'react-router-dom';
import { Contributor } from '../domain/Project';

export interface ProjectParameters {
  [key: string]: string;
  owner: string;
  repo: string;
}

interface IProjectContext {
  projectParams?: ProjectParameters;
  contributors: Contributor[];
  getProjectRelativePath(path: LocationDescriptor): LocationDescriptor;
}

export const ProjectContext = createContext<IProjectContext>(
  {} as IProjectContext
);

const octokit = new Octokit();

export const ProjectProvider: React.FC = ({ children }) => {
  const match = useRouteMatch<ProjectParameters>(PROJECT_PARAMS_PATH);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const projectParams = match?.params;

  useEffect(() => {
    if (!projectParams) {
      return;
    }
    const getProjectCollaborators = async () => {
      const response = await octokit.rest.repos
        .listContributors(projectParams)
        .catch((e) => console.log(e));
      if (response && response.status === 200) {
        setContributors(response.data);
      }
    };
    getProjectCollaborators();
  }, [projectParams?.owner, projectParams?.repo]);

  const getProjectRelativePath = (path: LocationDescriptor) => {
    if (!projectParams) {
      return path;
    }
    return generatePath(`${PROJECT_PARAMS_PATH}${path}`, projectParams);
  };

  return (
    <ProjectContext.Provider
      value={{ projectParams, getProjectRelativePath, contributors }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
