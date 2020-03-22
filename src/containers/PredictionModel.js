import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import NumberField from './../components/NumberField';
import Chart from './../components/Chart';
import clsx from  'clsx';

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
      margin: theme.spacing(2),
    },

    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(40),
      width: theme.spacing(40),
    },
  },
  radio: {
    color: theme.palette.quinary.main,
  },
  control: {
    background: theme.palette.senary.main,
    margin: theme.spacing(2),
  },
  range: {
    margin: theme.spacing(0, 0, 1),
  },
}));

function PredictionModel(props) {
  const classes = useStyles();

  const [options, setOptions] = useState({
    range: 84,
    numberOfDaysPerDoubling: 7,
    numberOfDaysFromInfectionToDeath: 20,
    mortalityRate: 0.015,
    numberOfDaysFromInfectionToHospitalization: 12,
    hopistalizationRate: 0.2,
    numberOfDaysFromInjectionToOutOfHospital: 40,
  });

  const model = new Model(options);
  const days = Array.from(new Array(options.range), (_, day) => day + 1).filter((day) => day === 1 || day % 7 === 0);

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
          <Paper elevation={0} className={clsx(classes.paper, classes.control)} square>
            <NumberField
              label='Number of days per doubling'
              value={options.numberOfDaysPerDoubling}
              changeHandler={changeHandler('numberOfDaysPerDoubling')}
            />
            <NumberField
              label='Number of days from infection to death'
              value={options.numberOfDaysFromInfectionToDeath}
              changeHandler={changeHandler('numberOfDaysFromInfectionToDeath')}
            />
            <NumberField
              label='Mortality rate'
              value={options.mortalityRate}
              changeHandler={changeHandler('mortalityRate')}
            />
            <NumberField
              label='Number of days from infection to hospitalization'
              value={options.numberOfDaysFromInfectionToHospitalization}
              changeHandler={changeHandler('numberOfDaysFromInfectionToHospitalization')}
            />
            <NumberField
              label='Number of days from infection to out of hospital (average death or recovery)'
              value={options.numberOfDaysFromInjectionToOutOfHospital}
              changeHandler={changeHandler('numberOfDaysFromInjectionToOutOfHospital')}
            />
          </Paper>
        </Grid>
        <Grid item sm={9}>
          <Paper elevation={0} className={clsx(classes.paper, classes.chart)}>
            <Box>
              <FormControl className={classes.range}>
                <RadioGroup value={options.range} onChange={changeHandler('range')} row>
                  <FormControlLabel
                    value={7}
                    control={<Radio color='default' classes={{checked: classes.radio}} />}
                    label='1w'
                    labelPlacement='end'
                  />
                  <FormControlLabel
                    value={28}
                    control={<Radio color='default' classes={{checked: classes.radio}} />}
                    label='1m'
                    labelPlacement='end'
                  />
                  <FormControlLabel
                    value={84}
                    control={<Radio color='default' classes={{checked: classes.radio}} />}
                    label='3m'
                    labelPlacement='end'
                  />
                  <FormControlLabel
                    value={168}
                    control={<Radio color='default' classes={{checked: classes.radio}} />}
                    label='6m'
                    labelPlacement='end'
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Chart
              data={data}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PredictionModel;
