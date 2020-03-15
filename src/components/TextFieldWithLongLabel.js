import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

function TextFieldWithLongLabel(props) {
  const {
    label,
    value,
    changeHandler
  } = props;

  return (
    <Fragment>
      <Typography variant='overline'>
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
