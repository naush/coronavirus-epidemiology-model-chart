import React, { useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import NumberField from './../components/NumberField';
import Headline from './../components/Headline';
import Link from '@material-ui/core/Link';

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
  figure: {
    [theme.breakpoints.down('sm')]: {
      fontSize: `${theme.spacing(12)}px`,
      lineHeight: `${theme.spacing(14)}px`,
    },

    [theme.breakpoints.up('sm')]: {
      fontSize: `${theme.spacing(36)}px`,
      lineHeight: `${theme.spacing(40)}px`,
    },
  },
  subtitle: {
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
  field: {
    background: '#fff',
  },
}));

function SafeGroupSize(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const defaultCityPopulation = cities100000.find((city) => city.name === 'New York City').population;

  const [options, setOptions] = useState({
    cityName: 'New York City',
    populationInMetropolitanArea: defaultCityPopulation,
    estimatedNumberOfCases: 3000,
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
        cityName: city.name,
        populationInMetropolitanArea: city.population,
      });
    }
  }

  const headline = (
    <Headline
      text={
        <React.Fragment>
          We define a safe group size as the minimum number of people in a gathering where there is at least a 95% chance you will not encounter someone with coronavirus. Find out what your safe group size is by choosing a metropolitan area, and use either the <Link target='_blank' href='https://coronavirus.jhu.edu/map.html'>Coronavirus Map by Johns Hopkins</Link> or the <Link href='/prediction_model'>Prediction Model</Link> to find the number of confirmed cases.
        </React.Fragment>
      }
    />
  );

  return (
    <Container
      maxWidth={false}
      disableGutters={true}
    >
      <Grid container spacing={0}>
        <Grid item sm={3} className={classes.item}>
          {isMobile && headline}
          <Paper elevation={0} className={clsx(classes.paper, classes.control)} square>
            <Typography variant='body1' className={classes.label}>
              Metropolitan Area
            </Typography>
            <Autocomplete
              options={cities100000}
              getOptionLabel={option => option.name}
              style={{ width: 300 }}
              className={classes.field}
              size="small"
              renderInput={params => {
                return (
                  <TextField
                    {...params}
                    placeholder={options.cityName}
                    variant="outlined"
                  />
                );
              }}
              onChange={onChangeCity}
            />
            <NumberField
              label='Estimated Number of Cases'
              value={options.estimatedNumberOfCases}
              changeHandler={changeHandler('estimatedNumberOfCases')}
            />
          </Paper>
        </Grid>
        <Grid item sm={9} className={classes.item}>
          {!isMobile && headline}
          <Paper elevation={0} className={classes.paper}>
            <Box>
              <Typography variant="h6" className={classes.subtitle}>
                In {options.cityName}, with an estimated population of {Number(options.populationInMetropolitanArea).toLocaleString('en-US')}, your safe group size is:
              </Typography>
              <Typography className={classes.figure} color="primary">
                {Calculator.calculate(options).toFixed(0)}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SafeGroupSize;
