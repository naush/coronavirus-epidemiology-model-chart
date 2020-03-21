import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextFieldWithLongLabel from './../components/TextFieldWithLongLabel';
import clsx from  'clsx';

import { InventoryDays } from 'emergency-food-guide';

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

function EmnergencyFoodGuide(props) {
  const classes = useStyles();

  const [options, setOptions] = useState({
    gender: 'f',
    age: 34,
    grains: 0,
    protein: 0,
    vegetables: 0,
    fruits: 0,
    dairy: 0,
    oils: 0,
  });

  const changeHandler = (attribute) => (e) => {
    setOptions({
      ...options,
      [attribute]: Number(e.target.value),
    });
  }

  const inventoryDays = new InventoryDays();
  const stock = [
    {name: 'grains', quantity: options.grains},
    {name: 'protein', quantity: options.protein},
    {name: 'vegetables', quantity: options.vegetables},
    {name: 'fruits', quantity: options.fruits},
    {name: 'dairy', quantity: options.dairy},
    {name: 'oils', quantity: options.oils},
  ];
  const people = [
    {gender: options.gender, age: options.age},
  ];
  const categories = inventoryDays.calculate(stock, people);

  return (
    <Container
      maxWidth={false}
      disableGutters={true}
    >
      <Grid container spacing={0}>
        <Grid item sm={3} className={classes.item}>
          <Paper elevation={0} className={clsx(classes.paper, classes.control)} square>
            <TextFieldWithLongLabel
              label='Your Gender'
              value={options.gender}
              changeHandler={changeHandler('gender')}
            />
            <TextFieldWithLongLabel
              label='Your Age'
              value={options.age}
              changeHandler={changeHandler('age')}
            />
          </Paper>
          <Paper elevation={0} className={clsx(classes.paper, classes.control)} square>
            <TextFieldWithLongLabel
              label='Grains (ounce)'
              value={options.grains}
              changeHandler={changeHandler('grains')}
            />
            <TextFieldWithLongLabel
              label='Protein (ounce)'
              value={options.protein}
              changeHandler={changeHandler('protein')}
            />
            <TextFieldWithLongLabel
              label='Vegetables (cup)'
              value={options.vegetables}
              changeHandler={changeHandler('vegetables')}
            />
            <TextFieldWithLongLabel
              label='Fruits (cup)'
              value={options.fruits}
              changeHandler={changeHandler('fruits')}
            />
            <TextFieldWithLongLabel
              label='Dairy (cup)'
              value={options.dairy}
              changeHandler={changeHandler('dairy')}
            />
            <TextFieldWithLongLabel
              label='Oils (teaspoon)'
              value={options.oils}
              changeHandler={changeHandler('oils')}
            />
          </Paper>
        </Grid>
        <Grid item sm={9} className={classes.item}>
          <Paper elevation={0} className={classes.paper}>
            <Box className={classes.dashboard}>
              {
                categories.map((category) => {
                  return (
                    <React.Fragment key={category.name}>
                      <Typography variant="body1">
                        {category.name}
                      </Typography>
                      <Typography className={classes.figure} color="primary">
                        {category.days}
                      </Typography>
                    </React.Fragment>
                  );
                })
              }
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default EmnergencyFoodGuide;
