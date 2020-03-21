import React, { Fragment } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
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
    textAlign: 'left',
    height: theme.spacing(5),
  },
}));

function NumberField(props) {
  const classes = useStyles();
  const {
    label,
    value,
    choices,
    changeHandler
  } = props;

  const formatChange = (e) => {
    changeHandler(e.target.value);
  };

  return (
    <Fragment>
      <Typography variant='body1' className={classes.label}>
        {label}
      </Typography>
      <Select
        value={value}
        onChange={formatChange}
        className={classes.field}
        variant="outlined"
        fullWidth
      >
        {
          choices.map((choice) => {
            return (
              <MenuItem value={choice} key={choice}>
                {choice.toUpperCase()}
              </MenuItem>
            );
          })
        }
      </Select>
    </Fragment>
  );
}

export default NumberField;
