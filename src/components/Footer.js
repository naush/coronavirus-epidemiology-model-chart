import React from 'react';

import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 0, 0),
  },
}));

function Footer(props) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography>
        Source: <Link color="primary" target="_blank" href="https://www.sleepphones.com/Coronavirus-predictions-mortality-rate">SleepPhones</Link>.
      </Typography>
    </Box>
  );
}

export default Footer;
