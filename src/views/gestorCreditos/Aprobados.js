import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Aprobados from "../../components/GestorCreditoNuevo/conDocumentos/Aprobados";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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

export default function GestorCreditos() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaperDos = clsx(classes.paper, classes.fixedHeightDos);
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Aprobados />
        </Grid>
      </Grid>
    </Container>
  );
}
