import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  label: {
    fontWeight: 500,
    padding: theme.spacing(2, 0, 1),
    textAlign: 'left',

    '&:first-child': {
      marginTop: 0,
    },
  },
}));

function TextFieldWithLongLabel(props) {
  const classes = useStyles();
  const {
    label,
    value,
    changeHandler
  } = props;

  return (
    <Fragment>
      <Typography variant='body1' className={classes.label}>
        {label}
      </Typography>
      <TextField
        type="number"
        defaultValue={value}
        onChange={changeHandler}
        InputLabelProps={{ shrink: true, }}
        variant="outlined"
        fullWidth
      />
    </Fragment>
  );
}

export default TextFieldWithLongLabel;
