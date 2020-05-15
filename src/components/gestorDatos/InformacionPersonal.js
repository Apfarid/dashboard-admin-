import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Personal from "./Personal";
import Financiera from "./Financiera";
import Laboral from "./Laboral";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Referencias from "./Referencias";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: "inline-block",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    margin: "0 auto",
    position: "relative",
  },
  fixedHeight: {
    height: 240,
  },
  fixedHeightDos: {
    height: 300,
  },
}));

function getSteps() {
  return ["Personal", "Financiera", "Laboral", "Referencias"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Personal />;
    case 1:
      return <Financiera />;
    case 2:
      return <Laboral />;
    case 3:
      return <Referencias />;
    default:
      return "Unknown step";
  }
}

export default function HorizontalNonLinearStepper() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaperDos = clsx(classes.paper, classes.fixedHeightDos);

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Creditos Nuevos */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={classes.paper}>
            <div className={classes.root}>
              <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepButton
                      onClick={handleStep(index)}
                      completed={completed[index]}
                    >
                      {label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
              <div>
                {allStepsCompleted() ? (
                  <div>
                    <Typography className={classes.instructions}>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Button onClick={handleReset}>Reset</Button>
                  </div>
                ) : (
                  <div>
                    <Typography className={classes.instructions}>
                      {getStepContent(activeStep)}
                    </Typography>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                      >
                        Anterior
                      </Button>
                      {activeStep !== steps.length &&
                        (completed[activeStep] ? (
                          <Typography
                            variant="caption"
                            className={classes.completed}
                          >
                            Step {activeStep + 1} already completed
                          </Typography>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleComplete}
                          >
                            {completedSteps() === totalSteps() - 1
                              ? "Siguiente"
                              : "Regresar"}
                          </Button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
