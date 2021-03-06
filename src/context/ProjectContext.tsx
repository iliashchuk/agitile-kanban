import React, { createContext, useEffect, useState } from 'react';
import { LocationDescriptor } from 'history';
import { Octokit } from '@octokit/rest';
import querystring from 'querystring';
import { generatePath, useHistory, useRouteMatch } from 'react-router-dom';
import useFetch from 'use-http';

import { PROJECT_PARAMS_PATH } from '../domain/Router';
import { Contributor, Project, ProjectParameters } from '../domain/Project';
import { API_URL } from '../config';

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
  const history = useHistory();
  const projectMatch = useRouteMatch<ProjectParameters>(PROJECT_PARAMS_PATH);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [project, setProject] = useState<Project>();
  const projectMatchParams = projectMatch?.params;

  const { get, post, loading } = useFetch(`${API_URL}/project`);

  const getContributors = async (
    projectParams: ProjectParameters
  ): Promise<Contributor[] | undefined> => {
    try {
      const { data } = await octokit.rest.repos.listContributors({
        ...projectParams,
      });

      return data;
    } catch (e) {
      if (e.code === 404) {
        history.push('/');
      }
    }
  };

  useEffect(() => {
    if (projectMatchParams) {
      const fetchAndSetProject = async () => {
        const contributors = await getContributors(projectMatchParams);
        if (contributors) {
          const project = await get(
            `?${querystring.stringify(projectMatchParams)}`
          );
          if (project) {
            setProject(project);
            setContributors(contributors);
          }
        }
      };
      fetchAndSetProject();
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
    if (!projectMatchParams) {
      return;
    }

    const contributors = await getContributors(projectMatchParams);

    if (contributors) {
      const project = await post({ ...projectMatchParams, prefix });

      if (project) {
        setProject(project);
        setContributors(contributors);
      }
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
