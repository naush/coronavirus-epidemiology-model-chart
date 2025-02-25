import React  from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { DatePicker } from '@material-ui/pickers';

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
import Link from '@material-ui/core/Link';

import Headline from './../components/Headline';
import NumberField from './../components/NumberField';
import ToggleField from './../components/ToggleField';
import PTOChart from './../components/PTOChart';
import clsx from  'clsx';
import PTOEngine from 'pto-engine';
import PTOState from '../lib/PTOState';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  mobile: {
    padding: theme.spacing(2),
    width: '100%',
  },
  content: {
    margin: theme.spacing(2, 3),
    width: '80%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actions: {
    padding: theme.spacing(2, 0, 0, 2),
    margin: theme.spacing(3, 2, 4, 1),
    borderTop: `2px ${theme.palette.senary.main} solid`,
    width: '80%',
    textAlign: 'right',
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
  text: {
    fontSize: 20,

    '& a': {
      textDecoration: 'underline',
    },
  },
  headlineText: {
    fontWeight: 500,

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3),
      color: theme.palette.primary.main,
    },
  },
  headlineRoot: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      borderBottom: 0,
      margin: theme.spacing(0),
      padding: theme.spacing(2, 0),
    },
  },
}));

function PTOCalculator(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const savedOptions = PTOState.load();
  const [options, setOptions] = React.useState(savedOptions);

  const saveOptions = (attribute, value) => {
    const newOptions = {
      ...options,
      [attribute]: value,
    };
    setOptions(newOptions);
    PTOState.save(newOptions);
  }

  const handleToggleChange = (attribute) => (e, value) => {
    saveOptions(attribute, value);
  }

  const handleChange = (attribute) => (value) => {
    saveOptions(attribute, value);
  }

  const engineOptions = {
    from: options.from,
    to: options.to,
    amount: options.amount,
    period: options.frequency,
    accrualDate: options.frequency === 'biweekly' ? 14 : 1,
    cap: options.cap,
  };

  if (options.reset === 'annually') {
    engineOptions.resetPeriod = 'annually';
    engineOptions.resetDate = 1;
  }

  const data = {
    start: options.start,
    accrued: PTOEngine.calculate(engineOptions),
    used: options.used,
    unit: options.unit,
  };

  const steps = [
    {
      label: 'Introduction',
      content: (
        <Paper elevation={0} square>
          <Typography className={classes.text}>
            As we brace for an economic downturn, now would be a good time to review your company PTO policy and the cashout option upon termination. Fill out the questionnaire below to calculate your PTO balance.
          </Typography>
          <br />
          <Typography className={classes.text}>
            You may also want to read the <Link target='_blank' href='https://www.congress.gov/bill/116th-congress/house-bill/6201'>Families First Coronavirus Response Act (H.R. 6201)</Link> that was passed by Congress and signed into law by the President on March 18 to know your rights. A summary of the bill by Paychex can be read <Link target='_blank' href='https://www.paychex.com/newsroom/news-releases/paychex-helps-business-families-first-act'>here</Link>.
          </Typography>
        </Paper>
      ),
    },
    {
      label: 'Tell us about your company PTO Policy',
      content: (
        <Paper elevation={0} square>
          <Box className={classes.field}>
            <Typography variant="h6" className={classes.question}>
              Does it accrue by hours or days?
            </Typography>
            <Paper elevation={0} square className={classes.answer}>
              <ToggleField
                value={options.unit}
                changeHandler={handleToggleChange('unit')}
                options={[
                  {label: 'Hour', value: 'hour'},
                  {label: 'Day', value: 'day'}
                ]}
              />
            </Paper>
          </Box>
          <Box className={classes.field}>
            <Typography variant="h6" className={classes.question}>
              How often does it accrue?
            </Typography>
            <Paper elevation={0} square className={classes.answer}>
              <ToggleField
                value={options.frequency}
                changeHandler={handleToggleChange('frequency')}
                options={[
                  {label: 'Weekly', value: 'weekly'},
                  {label: 'Biweekly', value: 'biweekly'},
                  {label: 'Semimonthly', value: 'semimonthly'},
                  {label: 'Monthly', value: 'monthly'},
                ]}
              />
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
              What is the accrual cap?
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
              <ToggleField
                value={options.reset}
                changeHandler={handleToggleChange('reset')}
                options={[
                  {label: 'Never', value: 'never'},
                  {label: 'Annually', value: 'annually'},
                ]}
              />
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
      label: 'Your PTO Balance',
      content: (
        <Paper elevation={0} square>
          <Typography className={classes.text}>
            Below is a summary of your PTO balance (in {options.unit}s) by the end of your current cycle.
          </Typography>
          <br />
          <PTOChart
            data={data}
          />
        </Paper>
      ),
    },
  ];

  const handleNext = () => {
    saveOptions('activeStep', options.activeStep + 1);
  };

  const handleBack = () => {
    saveOptions('activeStep', options.activeStep - 1);
  };

  const step = steps[options.activeStep];

  const headline = (
    <Headline
      text={step.label}
      classes={{
        text: classes.headlineText,
        root: classes.headlineRoot,
      }}
    />
  );

  if (isMobile) {
    return (
      <Container
        maxWidth={false}
        disableGutters={true}
        className={classes.root}
      >
        <Grid container spacing={0} className={classes.mobile}>
          {
            steps.map((step, index) => {
              return (
                <React.Fragment key={step.label}>
                  <Headline
                    text={`${index + 1}. ${step.label}`}
                    classes={{
                      text: classes.headlineText,
                      root: classes.headlineRoot,
                    }}
                  />
                  {step.content}
                </React.Fragment>
              );
            })
          }
        </Grid>
      </Container>
    );
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
              <Stepper activeStep={options.activeStep} orientation="vertical">
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
                disabled={options.activeStep === 0}
                onClick={handleBack}
                className={classes.button}
                variant="outlined"
              >
                Back
              </Button>
              <Button
                disabled={options.activeStep === steps.length - 1}
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
