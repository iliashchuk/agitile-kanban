import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import { TicketFormProvider } from './components/TicketForm';
import { SprintFormProvider } from './components/SprintForm';
import { ControlPanel } from './components/ControlPanel';
import { Backlog } from './components/Backlog';
import { SprintProvider } from './context/SprintContext';
import { TicketProvider } from './context/TicketContext';

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <TicketProvider>
          <SprintProvider>
            <TicketFormProvider>
              <SprintFormProvider>
                <Box textAlign="center" fontSize="xl">
                  <Grid minH="100vh" p={3}>
                    <ColorModeSwitcher justifySelf="flex-end" />
                    <ControlPanel></ControlPanel>
                    <Switch>
                      <Route path="/sprint/:id">
                        <Backlog />
                      </Route>
                      <Route path="/backlog">
                        <Backlog />
                      </Route>
                      <Redirect to="/backlog" />
                    </Switch>
                  </Grid>
                </Box>
              </SprintFormProvider>
            </TicketFormProvider>
          </SprintProvider>
        </TicketProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
};
