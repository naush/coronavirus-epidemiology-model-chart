import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
  },
}));

function ToggleField(props) {
  const classes = useStyles();

  const {
    value,
    changeHandler,
    options,
  } = props;

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={changeHandler}
      size="small"
      className={classes.root}
    >
      {
        options.map((option) => {
          return (
            <ToggleButton
              key={option.value}
              value={option.value}
            >
              {option.label}
            </ToggleButton>
          );
        })
      }
    </ToggleButtonGroup>
  );
};

export default ToggleField;
