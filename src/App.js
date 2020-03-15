import React from 'react';

import { createMuiTheme } from '@material-ui/core/styles';

import Main from './layouts/Main';
import Home from './containers/Home';

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
    <Main theme={theme}>
      <Home theme={theme} />
    </Main>
  );
}

export default App;
