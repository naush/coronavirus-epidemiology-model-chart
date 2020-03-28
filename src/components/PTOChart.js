import React  from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '25%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  paper: {
    textAlign: 'center',
    border: `2px ${theme.palette.senary.main} solid`,
    margin: '4px 4px 4px 0',
    padding: '4px',
  },
  overline: {
  },
  figure: {
    fontSize: theme.spacing(8),
    fontWeight: 500,
  },
}));

function PTOChart(props) {
  const {data} = props;
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.row}>
        <Box className={classes.column}>
          <Paper square elevation={0} className={classes.paper}>
            <Typography variant="overline" className={classes.overline}>
              Starting Balance
            </Typography>
          </Paper>
          <Paper square elevation={0} className={classes.paper}>
            <Typography variant="h6" className={classes.figure}>
              {data.start}
            </Typography>
          </Paper>
        </Box>
        <Box className={classes.column}>
          <Paper square elevation={0} className={classes.paper}>
            <Typography variant="overline" className={classes.overline}>
              Accrued
            </Typography>
          </Paper>
          <Paper square elevation={0} className={classes.paper}>
            <Typography variant="h6" className={classes.figure}>
              {data.accrued}
            </Typography>
          </Paper>
        </Box>
      </Box>
      <Box className={classes.row}>
        <Box className={classes.column}>
          <Paper square elevation={0} className={classes.paper}>
            <Typography variant="overline" style={{color: 'red'}} className={classes.overline}>
              Used
            </Typography>
          </Paper>
          <Paper square elevation={0} className={classes.paper}>
            <Typography variant="h6" style={{color: 'red'}} className={classes.figure}>
              {data.used}
            </Typography>
          </Paper>
        </Box>
        <Box className={classes.column}>
          <Paper square elevation={0} className={classes.paper}>
            <Typography variant="overline" style={{color: 'green'}} className={classes.overline}>
              Available
            </Typography>
          </Paper>
          <Paper square elevation={0} className={classes.paper}>
            <Typography variant="h6" style={{color: 'green'}} className={classes.figure}>
              {data.start + data.accrued - data.used}
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default PTOChart;
