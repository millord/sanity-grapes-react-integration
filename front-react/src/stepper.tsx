import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

function getSteps() {
  return ['Designing', 'Create your site', 'Visit your site!'];
}

function getStepContent(stepIndex: number) {
  switch (stepIndex) {
    case 0:
      return 'Build an amizing site...';
    case 1:
      return "It's time to create your work";
    case 2:
      return 'Go and see it!';
    default:
      return 'Unknown stepIndex';
  }
}


export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [done, setDone] = React.useState(false)
  const [templateData, setTemplateData] = React.useState({
    html:'',
    css: ''
 })
  const steps = getSteps();

  const handleNext = () => {
    setTemplateData({
      html: localStorage.getItem('gjs-html'),
      css: localStorage.getItem('gjs-css')
  })
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
   console.log("temmplatedata",templateData)
   console.log(activeStep)
    if(activeStep === 1) {
       axios.post(`http://localhost:8000/create/`,{templateData})
  
    }
  
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  
   

  return (
    <div className={classes.root} >
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography variant="h6"
            style={{margin:8, marginTop: -40}}
            className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
                
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? <a className="offbutton" href="http://localhost:8000/" target="_blank">Finish</a> : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
