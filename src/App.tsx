import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ChakraProvider, Container, Grid, theme } from '@chakra-ui/react';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import { TicketFormProvider } from './components/TicketForm';
import { SprintFormProvider } from './components/SprintForm';
import { ControlPanel } from './components/ControlPanel';
import { Backlog } from './components/Backlog';
import { SprintProvider } from './context/SprintContext';
import { TicketProvider } from './context/TicketContext';
import { ControlProvider } from './context/ControlContext';

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      {/* remove basename later */}
      <BrowserRouter basename="/agitile-kanban">
        <SprintProvider>
          <TicketProvider>
            <ControlProvider>
              <TicketFormProvider>
                <SprintFormProvider>
                  <Grid minH="100vh">
                    <ColorModeSwitcher justifySelf="flex-end" />
                    <Container textAlign="center" maxW="80vw" fontSize="xl">
                      <ControlPanel />
                      <Switch>
                        <Route path="/sprint/:id">
                          <Backlog />
                        </Route>
                        <Route path="/backlog">
                          <Backlog />
                        </Route>
                        <Redirect to="/backlog" />
                      </Switch>
                    </Container>
                  </Grid>
                </SprintFormProvider>
              </TicketFormProvider>
            </ControlProvider>
          </TicketProvider>
        </SprintProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
};
