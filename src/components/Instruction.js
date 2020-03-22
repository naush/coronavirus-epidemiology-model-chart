import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'left',
    borderBottom: `2px ${theme.palette.senary.main} solid`,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,

    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(2, 2, 1, 1),
    },

    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0, 2),
    },
  },
  text: {
    fontSize: 20,

    '& a': {
      textDecoration: 'underline',
    },
  },
}));

function Instruction(props) {
  const classes = useStyles();
  const { text } = props;

  return (
    <Paper elevation={0} className={classes.root} square>
      <Typography className={classes.text}>
        {text}
      </Typography>
    </Paper>
  );
}

export default Instruction;
