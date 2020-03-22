import React from 'react';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

function Credits(props) {
  const classes = useStyles();

  return (
    <Container
      maxWidth={false}
      disableGutters={true}
    >
      <Paper elevation={0} className={classes.paper}>
        <List component='nav' className={classes.root} aria-label='contacts'>
          <ListItem button>
            <ListItemIcon>
              <DoneOutlineIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography variant='h6'>
                <Link target='_blank' href='https://www.sleepphones.com/Coronavirus-predictions-mortality-rate'>
                  Updates on the Coronavirus Pandemic
                </Link> by Dr. Wei-Shin Lai
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DoneOutlineIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography variant='h6'>
                <Link target='_blank' href='https://www.choosemyplate.gov/'>
                  ChooseMyPlate
                </Link> from the U.S. Department of Agriculture
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DoneOutlineIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography variant='h6'>
                <Link target='_blank' href='http://download.geonames.org/export/dump/'>
                  All cities with a population of > 15000
                </Link> from <Link target='_blank' href='http://www.geonames.org/'>GeoNames</Link>
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DoneOutlineIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography variant='h6'>
                Icons made by <Link href="https://www.flaticon.com/authors/dinosoftlabs">DinosoftLabs</Link> from <Link href="https://www.flaticon.com/">www.flaticon.com</Link>
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
}

export default Credits;
