import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import { TicketFormProvider } from './components/TicketForm';
import { Backlog } from './components/Backlog';

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <TicketFormProvider>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <BrowserRouter>
              <Switch>
                <Route path="/backlog">
                  <Backlog />
                </Route>
                <Redirect to="/backlog" />
              </Switch>
            </BrowserRouter>
          </Grid>
        </Box>
      </TicketFormProvider>
    </ChakraProvider>
  );
};
