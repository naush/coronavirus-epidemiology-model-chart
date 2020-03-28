import React, { useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Category from './../components/Category';
import Container from '@material-ui/core/Container';
import NumberField from './../components/NumberField';
import SelectField from './../components/SelectField';
import Headline from './../components/Headline';
import FoodGroup from './../models/FoodGroup';
import clsx from  'clsx';

import { InventoryDays } from 'emergency-food-guide';

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
  control: {
    margin: theme.spacing(2),
    background: theme.palette.senary.main,
  },
  label: {
    fontWeight: 500,
    padding: theme.spacing(2, 0, 1),
    textAlign: 'left',

    '&:first-child': {
      padding: theme.spacing(0, 0, 1),
    },
  },
  headlineText: {
    fontSize: 20,

    '& a': {
      textDecoration: 'underline',
    },
  },
}));

function EmergencyFoodGuide(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const person = {gender: 'f', age: 30};
  const groups = FoodGroup.all([person])

  const defaults = {
    gender: person.gender,
    age: person.age,
    grains: groups.grains.quantity,
    protein: groups.protein.quantity,
    vegetables: groups.vegetables.quantity,
    fruits: groups.fruits.quantity,
    dairy: groups.dairy.quantity,
    oils: groups.oils.quantity,
  };

  const [options, setOptions] = useState(defaults);

  const changeHandler = (attribute) => (value) => {
    setOptions({
      ...options,
      [attribute]: value,
    });
  }

  const people = [{gender: options.gender, age: options.age},];
  const stock = [
    {name: 'grains', quantity: options.grains},
    {name: 'protein', quantity: options.protein},
    {name: 'vegetables', quantity: options.vegetables},
    {name: 'fruits', quantity: options.fruits},
    {name: 'dairy', quantity: options.dairy},
    {name: 'oils', quantity: options.oils},
  ];
  const inventoryDays = new InventoryDays();
  const categories = inventoryDays.calculate(stock, people);

  const headline = (
    <Headline
      text={
        <React.Fragment>
          Find out how many days your food will last by entering your gender, age and how much you have in stock for each food group. Our calculations are based on the daily recommended intakes provided by <Link target='_blank' href='https://www.choosemyplate.gov/resources/MyPlatePlan'>ChooseMyPlate</Link>, a project of the U.S. Department of Agriculture.
        </React.Fragment>
      }
    />
  );

  return (
    <Container
      maxWidth={false}
      disableGutters={true}
      className={classes.root}
    >
      <Grid container spacing={0} className={classes.root}>
        <Grid item sm={3} className={classes.item}>
          { isMobile && headline }
          <Paper elevation={0} className={clsx(classes.paper, classes.control)} square>
            <SelectField
              label='Gender'
              choices={[{label: 'Female', value: 'f'}, {label: 'Male', value: 'm'}]}
              value={options.gender}
              changeHandler={changeHandler('gender')}
            />
            <NumberField
              label='Age'
              value={options.age}
              min={2}
              max={200}
              changeHandler={changeHandler('age')}
              unit="years"
            />
            <NumberField
              label='Grains'
              value={options.grains}
              changeHandler={changeHandler('grains')}
              unit="oz"
            />
            <NumberField
              label='Protein'
              value={options.protein}
              changeHandler={changeHandler('protein')}
              unit="oz"
            />
            <NumberField
              label='Vegetable'
              value={options.vegetables}
              changeHandler={changeHandler('vegetables')}
              unit="cups"
            />
            <NumberField
              label='Fruits'
              value={options.fruits}
              changeHandler={changeHandler('fruits')}
              unit="cups"
            />
            <NumberField
              label='Dairy'
              value={options.dairy}
              changeHandler={changeHandler('dairy')}
              unit="cups"
            />
            <NumberField
              label='Oils'
              value={options.oils}
              changeHandler={changeHandler('oils')}
              unit="teaspoons"
            />
          </Paper>
        </Grid>
        <Grid item sm={9} className={classes.item}>
          { !isMobile && headline }
          <Paper elevation={0} className={classes.paper}>
            <Grid container>
              {
                categories.map((category) => {
                  return (
                    <Category
                      key={category.name}
                      category={category}
                      group={groups[category.name]}
                    />
                  );
                })
              }
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default EmergencyFoodGuide;
