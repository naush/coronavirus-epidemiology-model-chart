import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import NumberField from './../components/NumberField';
import SelectField from './../components/SelectField';
import clsx from  'clsx';

import { InventoryDays, Consumption } from 'emergency-food-guide';

const useStyles = makeStyles(theme => ({
  root: {
    height: '500px',
  },
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

function EmergencyFoodGuide(props) {
  const classes = useStyles();

  const defaultPerson = {gender: 'f', age: 34};
  const defaultConsumption = new Consumption([defaultPerson]).ofDay(7);
  const defaults = {
    gender: defaultPerson.gender,
    age: defaultPerson.age,
    grains: defaultConsumption.find((category) => category.name === 'grains').quantity,
    protein: defaultConsumption.find((category) => category.name === 'protein').quantity,
    vegetables: defaultConsumption.find((category) => category.name === 'vegetables').quantity,
    fruits: defaultConsumption.find((category) => category.name === 'fruits').quantity,
    dairy: defaultConsumption.find((category) => category.name === 'dairy').quantity,
    oils: defaultConsumption.find((category) => category.name === 'oils').quantity,
  };

  const [options, setOptions] = useState(defaults);

  const changeHandler = (attribute) => (value) => {
    setOptions({
      ...options,
      [attribute]: value,
    });
  }

  const people = [
    {gender: options.gender, age: options.age},
  ];
  const inventoryDays = new InventoryDays();
  const stock = [
    {name: 'grains', quantity: options.grains},
    {name: 'protein', quantity: options.protein},
    {name: 'vegetables', quantity: options.vegetables},
    {name: 'fruits', quantity: options.fruits},
    {name: 'dairy', quantity: options.dairy},
    {name: 'oils', quantity: options.oils},
  ];
  const categories = inventoryDays.calculate(stock, people);

  return (
    <Container
      maxWidth={false}
      disableGutters={true}
      className={classes.root}
    >
      <Grid container spacing={0} className={classes.root}>
        <Grid item sm={3} className={classes.item}>
          <Paper elevation={0} className={clsx(classes.paper, classes.control)} square>
            <SelectField
              label='Your Gender'
              choices={['f', 'm']}
              value={options.gender}
              changeHandler={changeHandler('gender')}
            />
            <NumberField
              label='Your Age'
              value={options.age}
              changeHandler={changeHandler('age')}
            />
          </Paper>
          <Paper elevation={0} className={clsx(classes.paper, classes.control)} square>
            <NumberField
              label='Grains (ounce)'
              value={options.grains}
              changeHandler={changeHandler('grains')}
            />
            <NumberField
              label='Protein (ounce)'
              value={options.protein}
              changeHandler={changeHandler('protein')}
            />
            <NumberField
              label='Vegetables (cup)'
              value={options.vegetables}
              changeHandler={changeHandler('vegetables')}
            />
            <NumberField
              label='Fruits (cup)'
              value={options.fruits}
              changeHandler={changeHandler('fruits')}
            />
            <NumberField
              label='Dairy (cup)'
              value={options.dairy}
              changeHandler={changeHandler('dairy')}
            />
            <NumberField
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

export default EmergencyFoodGuide;
