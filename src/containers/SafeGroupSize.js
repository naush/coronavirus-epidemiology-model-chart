import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextFieldWithLongLabel from './../components/TextFieldWithLongLabel';
import clsx from  'clsx';

import { SafeGroupSize as Calculator } from 'coronavirus-epidemiology-model';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import cities100000 from './../assets/cities100000.json';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  item: {
    width: '100%',
  },
  dashboard: {
    margin: theme.spacing(2),
  },
  figure: {
    [theme.breakpoints.down('sm')]: {
      fontSize: `${theme.spacing(12)}px`,
      lineHeight: `${theme.spacing(14)}px`,
    },

    [theme.breakpoints.up('sm')]: {
      fontSize: `${theme.spacing(36)}px`,
      lineHeight: `${theme.spacing(42)}px`,
    },
  },
  subtitle: {
    color: theme.palette.quinary.main,
  },
  control: {
    background: theme.palette.senary.main,
    margin: theme.spacing(2),
  },
  label: {
    fontWeight: 500,
    padding: theme.spacing(2, 0, 1),
    textAlign: 'left',

    '&:first-child': {
      padding: theme.spacing(0, 0, 1),
    },
  },
}));

function SafeGroupSize(props) {
  const classes = useStyles();
  const defaultCityPopulation = cities100000.find((city) => city.name === 'New York City').population;

  const [options, setOptions] = useState({
    populationInMetropolitanArea: defaultCityPopulation,
    estimatedNumberOfCases: 35,
  });

  const changeHandler = (attribute) => (e) => {
    setOptions({
      ...options,
      [attribute]: Number(e.target.value),
    });
  }

  const onChangeCity = (e, city) => {
    if (city) {
      setOptions({
        ...options,
        'populationInMetropolitanArea': city.population,
      });
    }
  }

  return (
    <Container
      maxWidth={false}
      disableGutters={true}
    >
      <Grid container spacing={0}>
        <Grid item sm={3} className={classes.item}>
          <Paper elevation={0} className={clsx(classes.paper, classes.control)} square>
            <Typography variant='body1' className={classes.label}>
              Metropolitan Area
            </Typography>
            <Autocomplete
              options={cities100000}
              getOptionLabel={option => option.name}
              style={{ width: 300 }}
              renderInput={params => {
                return (
                  <TextField {...params} placeholder='New York City' variant="outlined" />
                );
              }}
              onChange={onChangeCity}
            />
            <TextFieldWithLongLabel
              label='Estimated Number of Cases'
              value={options.estimatedNumberOfCases}
              changeHandler={changeHandler('estimatedNumberOfCases')}
            />
          </Paper>
        </Grid>
        <Grid item sm={9} className={classes.item}>
          <Paper elevation={0} className={classes.paper}>
            <Box className={classes.dashboard}>
              <Typography variant="body1">
                The Largest Safe Group Size
              </Typography>
              <Typography className={classes.figure} color="primary">
                {Calculator.calculate(options).toFixed(0)}
              </Typography>
              <Typography variant="body1" className={classes.subtitle}>
                * 95% chance you will not encounter someone with coronavirus.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SafeGroupSize;
