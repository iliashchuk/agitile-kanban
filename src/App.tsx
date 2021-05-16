import React, { FC } from 'react';
import { Router } from 'react-router-dom';
import { ChakraProvider, Container, Grid, theme } from '@chakra-ui/react';
import { Provider as ApiProvider, CachePolicies } from 'use-http';
import { History } from 'history';

import {
  SprintFormProvider,
  TicketFormProvider,
  MainRouter,
  // ColorModeSwitcher
} from './components';
import { SprintProvider } from './context/SprintContext';
import { TicketProvider } from './context/TicketContext';
import { ControlProvider } from './context/ControlContext';
import { ProjectProvider } from './context/ProjectContext';
import { API_URL } from './config';

const apiOptions = {
  cachePolicy: CachePolicies.NETWORK_ONLY,
};

interface Props {
  history: History;
}

export const App: FC<Props> = ({ history }) => {
  return (
    <ChakraProvider theme={theme}>
      <ApiProvider url={API_URL} options={apiOptions}>
        <Router history={history}>
          <ProjectProvider>
            <SprintProvider>
              <TicketProvider>
                <ControlProvider>
                  <TicketFormProvider>
                    <SprintFormProvider>
                      {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
                      <Container
                        p={4}
                        textAlign="center"
                        maxW="100%"
                        maxH="100%"
                        w="100%"
                        h="100%"
                        fontSize="xl"
                      >
                        <MainRouter history={history} />
                      </Container>
                    </SprintFormProvider>
                  </TicketFormProvider>
                </ControlProvider>
              </TicketProvider>
            </SprintProvider>
          </ProjectProvider>
        </Router>
      </ApiProvider>
    </ChakraProvider>
  );
};
