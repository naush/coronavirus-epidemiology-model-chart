import React from 'react';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import Main from './layouts/Main';
import PredictionModel from './containers/PredictionModel';
import SafeGroupSize from './containers/SafeGroupSize';
import EmergencyFoodGuide from './containers/EmergencyFoodGuide';
import PTOCalculator from './containers/PTOCalculator';
import Credits from './containers/Credits';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#597B80',
    },
    secondary: {
      main: '#364A4D',
    },
    tertiary: {
      main: '#808080',
    },
    quaternary: {
      main: '#CCCCC0',
    },
    quinary: {
      main: '#F85353',
    },
    senary: {
      main: '#ECEFF1',
    },
    text: {
      primary: '#333333',
      secondary: '#333333',
    },
  },
});

theme.overrides.MuiToggleButton = {
  root: {
    '&$selected': {
      backgroundColor: theme.palette.senary.main,
    },
  },
  label: {
    width: theme.spacing(20),
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Router>
          <Switch>
            <Route path='/safe-group-size'>
              <Main title='Safe Group Size'>
                <SafeGroupSize />
              </Main>
            </Route>
            <Route path='/emergency-food-guide'>
              <Main title='Emergency Food Guide'>
                <EmergencyFoodGuide />
              </Main>
            </Route>
            <Route path='/pto-calculator'>
              <Main title='Paid Time Off'>
                <PTOCalculator />
              </Main>
            </Route>
            <Route path='/credits'>
              <Main title='Credits'>
                <Credits />
              </Main>
            </Route>
            <Route path='/'>
              <Main title='Prediction Model'>
                <PredictionModel />
              </Main>
            </Route>
          </Switch>
        </Router>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
