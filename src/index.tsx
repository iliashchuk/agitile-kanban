import { ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory, History } from 'history';

import { App } from './App';
import * as serviceWorker from './serviceWorker';

declare global {
  interface Window {
    renderKanban(containerId: string, history: History): void;
    unmountKanban(containerId: string): void;
  }
}

window.renderKanban = (containerId, history) => {
  ReactDOM.render(
    <React.StrictMode>
      <ColorModeScript />
      <App history={history} />
    </React.StrictMode>,
    document.getElementById(containerId)
  );
  serviceWorker.unregister();
};

window.unmountKanban = (containerId) => {
  const appElement = document.getElementById(containerId);
  if (!appElement) {
    return;
  }
  ReactDOM.unmountComponentAtNode(appElement);
};

if (!document.getElementById('Kanban-container')) {
  const history = createBrowserHistory();
  ReactDOM.render(<App history={history} />, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
