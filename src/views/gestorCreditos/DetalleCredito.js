import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DetalleCreditoNuevo from "../../components/GestorCreditoNuevo/DetalleCreditoNuevo";

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
    height: 300,
  },
  fixedHeightDos: {
    height: 600,
  },
}));

export default function GestorCreditos() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaperDos = clsx(classes.paper, classes.fixedHeightDos);
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Detalle Creditos */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper>
            <DetalleCreditoNuevo />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
