import React from 'react';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

import Main from './layouts/Main';
import Home from './containers/Home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#9278D1',
    },
    secondary: {
      main: '#428bca',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route>
            <Main>
              <Route path='/' component={Home} />
            </Main>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
