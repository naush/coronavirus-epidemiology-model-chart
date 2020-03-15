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
}));

function SafeGroupSize(props) {
  const classes = useStyles();

  const [options, setOptions] = useState({
    populationInMetropolitanArea: 300000,
    estimatedNumberOfCases: 35,
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
        <Grid item sm={3} className={classes.item}>
          <Paper elevation={0} className={clsx(classes.paper, classes.control)} square>
            <TextFieldWithLongLabel
              label='Population in Metropolitan Area'
              value={options.populationInMetropolitanArea}
              changeHandler={changeHandler('populationInMetropolitanArea')}
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
