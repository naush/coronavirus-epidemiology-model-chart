import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';

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
  },
}));

function NumberField(props) {
  const classes = useStyles();
  const {
    label,
    value,
    changeHandler,
    min,
    max,
    fullWidth,
    unit,
  } = props;

  const formatChange = (e) => {
    const value = Number(e.target.value);
    changeHandler(value);
  };

  return (
    <Fragment>
      {label && (
        <Typography variant='body1' className={classes.label}>
          {label}
        </Typography>
      )}
      <TextField
        type="number"
        defaultValue={value}
        onChange={formatChange}
        InputLabelProps={{ shrink: true, }}
        className={classes.field}
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: unit === undefined ? null : <InputAdornment position="end">{unit}</InputAdornment>,
        }}
        inputProps={{
          min: min || 0,
          max: max || Number.MAX_SAFE_INTEGER,
        }}
        fullWidth={fullWidth === undefined ? true : fullWidth}
      />
    </Fragment>
  );
}

export default NumberField;
