import React from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Container from '@material-ui/core/Container';

import purple from '@material-ui/core/colors/purple';
import grey from '@material-ui/core/colors/grey';

import { Model } from 'coronavirus-epidemiology-model';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: grey,
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();
  const options = {
    numberOfDaysPerDoubling: 7,
    numberOfDaysFromInfectionToDeath: 20,
    mortalityRate: 0.015,
    numberOfDaysFromInfectionToHospitalization: 12,
    hopistalizationRate: 0.2,
    numberOfDaysFromInjectionToOutOfHospital: 40,
  };
  const model = new Model(options);
  const days = Array.from(new Array(180), (_, day) => day + 1).filter((day) => day % 7 === 0);

  const data = days.map((day) => {
    const dataset = model.ofDay(day);

    return {
      name: day,
      numberOfCases: dataset.numberOfCases.toFixed(0),
      numberOfDeaths: dataset.numberOfDeaths.toFixed(0),
      numberHospitalized: dataset.numberHospitalized.toFixed(0),
      numberInHospitalAtTheTime: dataset.numberInHospitalAtTheTime.toFixed(0),
    };
  });

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth={false}
        disableGutters={true}
      >
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Coronavirus Epidemiology Model
            </Typography>
          </Toolbar>
        </AppBar>
        <Container
          maxWidth={false}
          disableGutters={true}
        >
          <Grid container spacing={0}>
            <Grid item xs={4} sm={2}>
              <Paper elevation={0} className={classes.paper}>Settings</Paper>
            </Grid>
            <Grid item xs={20} sm={10}>
              <Paper elevation={0} className={classes.paper}>
                <ResponsiveContainer
                  width='80%'
                  height={600}
                >
                  <LineChart
                    data={data}
                    margin={{
                      top: 5, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="numberOfCases" name="Number of Cases" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="numberOfDeaths" name="Number of Deaths" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="numberHospitalized" name="Number Hospitalized" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="numberInHospitalAtTheTime" name="Number in hospital at the time" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </ThemeProvider>
  );
}

export default App;
