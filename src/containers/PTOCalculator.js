import React  from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { DatePicker } from '@material-ui/pickers';
import startOfYear from 'date-fns/startOfYear'
import endOfYear from 'date-fns/endOfYear'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import Headline from './../components/Headline';
import NumberField from './../components/NumberField';
import PTOChart from './../components/PTOChart';
import clsx from  'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  content: {
    margin: theme.spacing(2, 3),
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actions: {
    padding: theme.spacing(2, 0, 0, 2),
    margin: theme.spacing(3, 2, 4, 1),
    borderTop: `2px ${theme.palette.senary.main} solid`,
  },
  field: {
    margin: theme.spacing(0, 0, 2),
  },
  question: {
  },
  answer: {
    margin: theme.spacing(2, 2, 2, 0),
  },
  date: {
    display: 'block',
    margin: theme.spacing(0, 0, 2),
  },
}));

function PTOCalculator(props) {
  const classes = useStyles();
  const theme = useTheme();
  const now = new Date();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeStep, setActiveStep] = React.useState(0);
  const [options, setOptions] = React.useState({
    unit: 'hour',
    frequency: 'fortnightly',
    amount: 4.62,
    cap: 264,
    reset: 'never',
    from: startOfYear(now),
    to: endOfYear(now),
    start: 0,
    used: 0,
  });

  const handleToggleChange = (attribute) => (e, value) => {
    setOptions({
      ...options,
      [attribute]: value,
    });
  }

  const handleChange = (attribute) => (value) => {
    setOptions({
      ...options,
      [attribute]: value,
    });
  }

  const data = {
    start: options.start,
    accrued: 15,
    used: options.used,
    unit: options.unit,
  };

  const steps = [
    {
      label: 'Tell us about your company PTO Policy',
      content: (
        <Paper elevation={0} square>
          <Box className={classes.field}>
            <Typography variant="h6" className={classes.question}>
              Does it use hours or days?
            </Typography>
            <Paper elevation={0} square className={classes.answer}>
              <ToggleButtonGroup
                value={options.unit}
                exclusive
                onChange={handleToggleChange('unit')}
                size="small"
              >
                <ToggleButton value="hour">
                  Hour
                </ToggleButton>
                <ToggleButton value="day">
                  Day
                </ToggleButton>
              </ToggleButtonGroup>
            </Paper>
          </Box>
          <Box className={classes.field}>
            <Typography variant="h6" className={classes.question}>
              How often does it accrue?
            </Typography>
            <Paper elevation={0} square className={classes.answer}>
              <ToggleButtonGroup
                value={options.frequency}
                exclusive
                onChange={handleToggleChange('frequency')}
                size="small"
              >
                <ToggleButton value="weekly">
                  Weekly
                </ToggleButton>
                <ToggleButton value="fortnightly">
                  Fornightly
                </ToggleButton>
                <ToggleButton value="monthly">
                  Monthly
                </ToggleButton>
              </ToggleButtonGroup>
            </Paper>
          </Box>
          <Box className={classes.field}>
            <Typography variant="h6" className={classes.question}>
              How much does it accrue each time?
            </Typography>
            <Paper elevation={0} square className={classes.answer}>
              <NumberField
                key="amount"
                value={options.amount}
                changeHandler={handleChange('amount')}
                fullWidth={false}
                unit={`${options.unit}s`}
              />
            </Paper>
          </Box>
          <Box className={classes.field}>
            <Typography variant="h6" className={classes.question}>
              What is the cap?
            </Typography>
            <Paper elevation={0} square className={classes.answer}>
              <NumberField
                key="cap"
                value={options.cap}
                changeHandler={handleChange('cap')}
                fullWidth={false}
                unit={`${options.unit}s`}
              />
            </Paper>
          </Box>
          <Box className={classes.field}>
            <Typography variant="h6" className={classes.question}>
              When does it reset?
            </Typography>
            <Paper elevation={0} square className={classes.answer}>
              <ToggleButtonGroup
                value={options.reset}
                exclusive
                onChange={handleToggleChange('reset')}
                size="small"
              >
                <ToggleButton value="never">
                  Never
                </ToggleButton>
                <ToggleButton value="annually">
                  Annually
                </ToggleButton>
              </ToggleButtonGroup>
            </Paper>
          </Box>
        </Paper>
      ),
    },
    {
      label: 'Tell us about your current PTO Cycle',
      content: (
        <Paper elevation={0} square>
          <Box className={classes.field}>
            <Typography variant="h6" className={classes.question}>
              When does it start and end?
            </Typography>
            <Paper elevation={0} square className={classes.answer}>
              <DatePicker
                autoOk
                className={classes.date}
                value={options.from}
                maxDate={options.to}
                format="yyyy/MM/dd"
                onChange={handleChange('from')}
                inputVariant="outlined"
                inputProps={{
                  size: "small",
                }}
                label="From"
              />
              <DatePicker
                className={classes.date}
                autoOk
                value={options.to}
                minDate={options.from}
                format="yyyy/MM/dd"
                onChange={handleChange('to')}
                inputVariant="outlined"
                label="To"
              />
            </Paper>
          </Box>
          <Box className={classes.field}>
            <Typography variant="h6" className={classes.question}>
              What was the starting balance?
            </Typography>
            <Paper elevation={0} square className={classes.answer}>
              <NumberField
                key="start"
                value={options.start}
                changeHandler={handleChange('start')}
                fullWidth={false}
                unit={`${options.unit}s`}
              />
            </Paper>
          </Box>
          <Box className={classes.field}>
            <Typography variant="h6" className={classes.question}>
              How many {options.unit}s have you used?
            </Typography>
            <Paper elevation={0} square className={classes.answer}>
              <NumberField
                key="used"
                value={options.used}
                changeHandler={handleChange('used')}
                fullWidth={false}
                unit={`${options.unit}s`}
              />
            </Paper>
          </Box>
        </Paper>
      ),
    },
    {
      label: 'See your PTO Balance',
      content: (
        <Paper elevation={0} square>
          <PTOChart
            data={data}
          />
        </Paper>
      ),
    },
  ];

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const step = steps[activeStep];

  const headline = (
    <Headline
      text={
        <React.Fragment>
          Calculate your PTO balance.
        </React.Fragment>
      }
    />
  );

  if (isMobile) {
    return null;
  } else {
    return (
      <Container
        maxWidth={false}
        disableGutters={true}
        className={classes.root}
      >
        <Grid container spacing={0} className={classes.root}>
          <Grid item sm={3} className={classes.item}>
            <Paper elevation={0} className={clsx(classes.paper, classes.control)} square>
              <Stepper activeStep={activeStep} orientation="vertical">
                {
                  steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel>{step.label}</StepLabel>
                      <StepContent />
                    </Step>
                  ))
                }
              </Stepper>
            </Paper>
          </Grid>
          <Grid item sm={9} className={classes.item}>
            {headline}
            <Paper elevation={0} className={classes.content}>
              {step.content}
            </Paper>
            <Paper square elevation={0} className={classes.actions}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
                variant="outlined"
              >
                Back
              </Button>
              <Button
                disabled={activeStep === steps.length - 1}
                color="primary"
                onClick={handleNext}
                className={classes.button}
                variant="outlined"
              >
                Next
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default PTOCalculator;
