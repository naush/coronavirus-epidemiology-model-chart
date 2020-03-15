import React, { useState } from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Container from '@material-ui/core/Container';

import TextField from '@material-ui/core/TextField';

import Link from '@material-ui/core/Link';

import { Model } from 'coronavirus-epidemiology-model';

import clsx from  'clsx';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

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
  chart: {
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(70),
      width: theme.spacing(140),
      margin: theme.spacing(4, 4, 0, 0),
    },

    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(35),
      width: theme.spacing(35),
    },
  },
  footer: {
    padding: theme.spacing(2, 0, 0),
  },
}));

function TextFieldWithLongLabel(props) {
  const {
    label,
    value,
    changeHandler
  } = props;

  return (
    <React.Fragment>
      <Typography variant='overline'>
        {label}
      </Typography>
      <TextField
        type="number"
        defaultValue={value}
        onChange={changeHandler}
        InputLabelProps={{ shrink: true, }}
        variant="outlined"
        fullWidth
      />
    </React.Fragment>
  );
}

function App() {
  const classes = useStyles();

  const [options, setOptions] = useState({
    numberOfDaysPerDoubling: 7,
    numberOfDaysFromInfectionToDeath: 20,
    mortalityRate: 0.015,
    numberOfDaysFromInfectionToHospitalization: 12,
    hopistalizationRate: 0.2,
    numberOfDaysFromInjectionToOutOfHospital: 40,
  });

  const model = new Model(options);
  const days = Array.from(new Array(84), (_, day) => day + 1).filter((day) => day % 7 === 0);

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

  const changeHandler = (attribute) => (e) => {
    setOptions({
      ...options,
      [attribute]: Number(e.target.value),
    });
  }

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
            <Grid item sm={3}>
              <Paper elevation={0} className={classes.paper}>
                <TextFieldWithLongLabel
                  label='Number of days per doubling'
                  value={options.numberOfDaysPerDoubling}
                  changeHandler={changeHandler('numberOfDaysPerDoubling')}
                />
                <TextFieldWithLongLabel
                  label='Number of days from infection to death'
                  value={options.numberOfDaysFromInfectionToDeath}
                  changeHandler={changeHandler('numberOfDaysFromInfectionToDeath')}
                />
                <TextFieldWithLongLabel
                  label='Mortality rate'
                  value={options.mortalityRate}
                  changeHandler={changeHandler('mortalityRate')}
                />
                <TextFieldWithLongLabel
                  label='Number of days from infection to hospitalization'
                  value={options.numberOfDaysFromInfectionToHospitalization}
                  changeHandler={changeHandler('numberOfDaysFromInfectionToHospitalization')}
                />
                <TextFieldWithLongLabel
                  label='Number of days from infection to out of hospital (average death or recovery)'
                  value={options.numberOfDaysFromInjectionToOutOfHospital}
                  changeHandler={changeHandler('numberOfDaysFromInjectionToOutOfHospital')}
                />
                <Box className={classes.footer}>
                  <Typography>
                    Source: <Link color="primary" target="_blank" href="https://www.sleepphones.com/Coronavirus-predictions-mortality-rate">SleepPhones</Link>.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item sm={9}>
              <Paper elevation={0} className={clsx(classes.paper, classes.chart)}>
                <ResponsiveContainer>
                  <LineChart
                    data={data}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip labelFormatter={(day) => `Day ${day}`} />
                    <Legend />
                    <Line type="monotone" dataKey="numberOfCases" name="Number of Cases" stroke={theme.palette.primary.main} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="numberOfDeaths" name="Number of Deaths" stroke={theme.palette.secondary.main} />
                    <Line type="monotone" dataKey="numberHospitalized" name="Number Hospitalized" stroke={theme.palette.secondary.main} />
                    <Line type="monotone" dataKey="numberInHospitalAtTheTime" name="Number in hospital at the time" stroke={theme.palette.secondary.main} />
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
