import React, { useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ReactComponent as Grains } from './../assets/images/grains.svg';
import { ReactComponent as Protein } from './../assets/images/protein.svg';
import { ReactComponent as Vegetables } from './../assets/images/vegetables.svg';
import { ReactComponent as Fruits } from './../assets/images/fruits.svg';
import { ReactComponent as Dairy } from './../assets/images/dairy.svg';
import { ReactComponent as Oils } from './../assets/images/oils.svg';

import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import NumberField from './../components/NumberField';
import SelectField from './../components/SelectField';
import Instruction from './../components/Instruction';
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
  category: {
    border: `1px ${theme.palette.primary.main} solid`,
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    position: 'relative',
    width: '100%',
  },
  categoryLabel: {
    textTransform: 'capitalize',
    textDecoration: 'underline',
  },
  categoryIcon: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    position: 'absolute',
    bottom: theme.spacing(1),
    left: theme.spacing(1),
  },
  categoryUnit: {
    textAlign: 'right',
    color: theme.palette.primary.main,
  },
  instructionText: {
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
  const icons = {
    'grains': Grains,
    'protein': Protein,
    'vegetables': Vegetables,
    'fruits': Fruits,
    'dairy': Dairy,
    'oils': Oils,
  };
  const links = {
    'grains': 'https://www.choosemyplate.gov/eathealthy/grains',
    'protein': 'https://www.choosemyplate.gov/eathealthy/protein-foods',
    'vegetables': 'https://www.choosemyplate.gov/eathealthy/vegetables',
    'fruits': 'https://www.choosemyplate.gov/eathealthy/fruits',
    'dairy': 'https://www.choosemyplate.gov/eathealthy/dairy',
    'oils': 'https://www.choosemyplate.gov/eathealthy/oils',
  };

  const instruction = (
    <Instruction
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
          { isMobile && instruction }
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
              changeHandler={changeHandler('age')}
            />
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
          { !isMobile && instruction }
          <Paper elevation={0} className={classes.paper}>
            <Grid container>
              {
                categories.map((category) => {
                  const fontSize = theme.spacing(24);
                  const lineHeight = theme.spacing(32);
                  const days = category.days.toFixed(0);
                  const numberOfDigits = days.toString().length;
                  const Icon = icons[category.name];
                  const link = links[category.name];
                  var color = theme.palette.primary.main;

                  if (days <= 0) {
                    color = theme.palette.senary.main;
                  } else if (days <= 3) {
                    color = theme.palette.primary.light;
                  }

                  return (
                    <Grid item className={classes.category} sm={3} xs={10} key={category.name}>
                      <Typography className={classes.categoryLabel} variant="h6">
                        <Link target='_blank' href={link}>
                          {category.name}
                        </Link>
                      </Typography>
                      <Typography style={{
                        color: color,
                        fontSize: `${fontSize / numberOfDigits}px`,
                        lineHeight: `${lineHeight}px`,
                      }}>
                        {days}
                      </Typography>
                      <Typography className={classes.categoryUnit} variant="h6">
                        Days Left
                      </Typography>
                      <Icon className={classes.categoryIcon} />
                    </Grid>
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
