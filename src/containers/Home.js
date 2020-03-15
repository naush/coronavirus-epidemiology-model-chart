import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import clsx from  'clsx';

import Container from '@material-ui/core/Container';

import TextFieldWithLongLabel from './../components/TextFieldWithLongLabel';
import Chart from './../components/Chart';

import { Model } from 'coronavirus-epidemiology-model';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  chart: {
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(60),
      width: theme.spacing(120),
      margin: theme.spacing(4, 4, 0, 0),
    },

    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(35),
      width: theme.spacing(35),
    },
  },
}));

function Home(props) {
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
          </Paper>
        </Grid>
        <Grid item sm={9}>
          <Paper elevation={0} className={clsx(classes.paper, classes.chart)}>
            <Chart
              data={data}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
