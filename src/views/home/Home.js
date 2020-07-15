import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Filter from "../../components/Filter";
import Chart from "../../components/Chart";
import DisplayNuevos from "../../components/displaynuevos/DisplayCreditosHome";
import { solicitudNuevos } from "../../actions/solicitudCreditoNuevoAction";
import { cargaFirma } from "../../actions/contadorCreditosActions";
import { cargaCliente } from "../../actions/cliente";
import { useDispatch } from "react-redux";

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
    height: 340,
  },
  fixedHeightDos: {
    height: 300,
  },
}));

export default function Home() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaperDos = clsx(classes.paper, classes.fixedHeightDos);

  const numeroCreditosDispatch = useDispatch();
  const solicitudesDispatch = useDispatch();
  const clientesDispatch = useDispatch();

  useEffect(() => {
    const contarCreditos = () => numeroCreditosDispatch(cargaFirma());
    contarCreditos();

    const solicitudesNuevas = () => solicitudesDispatch(solicitudNuevos());
    solicitudesNuevas();

    const clientes = () => clientesDispatch(cargaCliente());
    clientes();
  }, []);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Creditos Nuevos */}
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>
            <DisplayNuevos titulo={"Créditos Nuevos"} />
          </Paper>
        </Grid>
        {/* Creditos Viejos */}
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>
            <DisplayNuevos titulo={"Créditos Antiguos"} />
          </Paper>
        </Grid>
        {/* Chart */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={fixedHeightPaperDos}>
            <Filter />
            <Chart />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
