import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    border: `2px ${theme.palette.senary.main} solid`,
    margin: theme.spacing(2),
    padding: theme.spacing(2, 0, 0),
    position: 'relative',
  },
  label: {
    textTransform: 'capitalize',
    textDecoration: 'underline',
  },
  icon: {
    width: theme.spacing(24),
    height: theme.spacing(32),
  },
  remaining: {
    color: theme.palette.primary.main,
  },
}));

function Category(props) {
  const classes = useStyles();
  const theme = useTheme();

  const {
    category,
    group,
  } = props;

  const Icon = group.icon;
  const link = group.link;
  var days = category.days;
  var borderColor = theme.palette.senary.main;

  if (days <= 0) {
    borderColor = theme.palette.quinary.main;
  } else if (days === Infinity) {
    days = 0;
  }
  return (
    <Grid
      item
      className={classes.root}
      style={{borderColor: borderColor}}
      sm={3}
      xs={10}
      key={category.name}
    >
      <Typography
        className={classes.remaining}
        variant="h6"
      >
        <Link className={classes.label} target='_blank' href={link}>
          {category.name}
        </Link>: {days.toFixed(0)} day{Number(days) === 1 ? '' : 's'} left
      </Typography>
      <Link target='_blank' href={link}>
        <Icon className={classes.icon} />
      </Link>
    </Grid>
  );
}

export default Category;
