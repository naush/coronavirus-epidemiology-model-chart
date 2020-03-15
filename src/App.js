import React from 'react';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

import Main from './layouts/Main';
import Home from './containers/Home';
import SafeGroupSize from './containers/SafeGroupSize';

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
      <Router basename={'coronavirus-epidemiology-model-chart'}>
        <Switch>
          <Route path='/safe-group-size'>
            <Main>
              <SafeGroupSize />
            </Main>
          </Route>
          <Route path='/'>
            <Main>
              <Home />
            </Main>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
