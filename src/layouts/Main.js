import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Navigator from './../components/Navigator';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
}));

function Main(props) {
  const classes = useStyles();

  return (
    <Container
      maxWidth={false}
      disableGutters={true}
    >
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Navigator />
          <Typography variant="h6" className={classes.title}>
            Coronavirus Epidemiology Model
          </Typography>
        </Toolbar>
      </AppBar>
      {props.children}
    </Container>
  );
}

export default Main;
