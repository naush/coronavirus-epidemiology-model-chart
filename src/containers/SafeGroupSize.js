import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';

import TextFieldWithLongLabel from './../components/TextFieldWithLongLabel';
import Footer from './../components/Footer';

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
          <Paper elevation={0} className={classes.paper}>
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
            <Footer />
          </Paper>
        </Grid>
        <Grid item sm={9} className={classes.item}>
          <Paper elevation={0} className={classes.paper}>
            <Typography variant="overline">
              The Largest Safe Group Size
            </Typography>
            <Typography variant="h1" color="primary">
              {Calculator.calculate(options).toFixed(0)}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SafeGroupSize;
