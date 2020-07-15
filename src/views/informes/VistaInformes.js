import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import clsx from "clsx";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import HelpIcon from "@material-ui/icons/Help";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { format } from "date-fns";
import GestorCreditoNuevo from "../../components/GestorCreditoNuevo/GestorCreditoNuevo";
import GestorCreditoAntiguo from "../../components/GestorCreditoAntiguos/GestorCreditoAntiguos";
import DateFnsUtils from "@date-io/date-fns";
import Tabla from "./Tabla";
import Aprobados from "./Aprobados";
import Cancelados from "./Cancelados";
import Desembolsados from "./Desembolsados";
import Preaprobados from "./Preaprobados";
import Rechazados from "./Rechazados";
import Vencidos from "./Vencidos";
import Facturacion from "./Facturacion";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { creditosGeneral } from "../../actions/creditoAction";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const [inicialDate, setInicialDate] = React.useState(new Date());
  const [finalDate, setFinalDate] = React.useState(new Date());

  const handleInicialDateChange = (e) => {
    setInicialDate(e);
  };

  const handleFinalDateChange = (e) => {
    setFinalDate(e);
  };

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
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
    height: 300,
  },
  fixedHeightDos: {
    height: 600,
  },
  tab: {
    margin: "0 auto",
  },
  onetab: {},

  boton: {
    margin: " 0 auto",
  },
  contenedorBoton: {
    display: "flex",
    marginBottom: 20,
  },
  titulo: {
    margin: "0 0 20px 30px",
    paddingTop: " 20px",
  },
}));

export default function Informes(props) {
  const classes = useStyles();
  const creditosDispatch = useDispatch();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaperDos = clsx(classes.paper, classes.fixedHeightDos);
  const [mostrar, setMostrar] = useState(false);
  const [value, setValue] = useState(0);
  const [informe, setInforme] = useState({
    vencidos: [],
    rechazados: [],
    solicitados: [],
    preAprobados: [],
    aprobados: [],
    desembolsados: [],
    cancelados: [],
  });

  useEffect(() => {
    const creditos = () => creditosDispatch(creditosGeneral());
    creditos();
  }, []);

  const data = useSelector((state) => state.Creditos.creditosGenerales);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [inicialDate, setInicialDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date());

  const handleInicialDateChange = (e) => {
    setInicialDate(e);
  };

  const handleFinalDateChange = (e) => {
    setFinalDate(e);
  };

  const filtro = (e) => {
    e.preventDefault();

    let inicial = format(inicialDate, "yyyy-MM-dd");
    let final = format(finalDate, "yyyy-MM-dd");

    const rechazados = data.filter(
      (credito) =>
        credito.fechaRechazado >= inicial && credito.fechaRechazado <= final
    );

    const solicitados = data.filter(
      (credito) =>
        credito.fechaSolicitado >= inicial && credito.fechaSolicitado <= final
    );

    const preAprobados = data.filter(
      (credito) =>
        credito.fechaPreaprobado >= inicial && credito.fechaPreaprobado <= final
    );

    const aprobado = data.filter(
      (credito) =>
        credito.fechaAprobado >= inicial && credito.fechaAprobado <= final
    );

    const desembolsado = data.filter(
      (credito) =>
        credito.fechaDesembolsado >= inicial &&
        credito.fechaDesembolsado <= final
    );

    const cancelado = data.filter(
      (credito) =>
        credito.fechaCancelado >= inicial && credito.fechaCancelado <= final
    );

    const vencidos = data.filter( // POR CORREGIR
      (credito) =>
        credito.fechaCancelado >= inicial && credito.fechaCancelado <= final
    );

    setInforme({
      ...informe,
      rechazados: rechazados,
      solicitados: solicitados,
      preAprobados: preAprobados,
      vencidos: vencidos,
      aprobado,
      desembolsado,
      cancelado,
    });
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Detalle Creditos */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper>
            <h2 className={classes.titulo}>Informes:</h2>
            <form onSubmit={filtro}>
              <Grid container justify="space-around">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Fecha Inicial"
                      format="MM/dd/yyyy"
                      name="inicial"
                      value={inicialDate}
                      className={classes.inicial}
                      onChange={handleInicialDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>

                  <Grid>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Fecha Final"
                      name="final"
                      format="MM/dd/yyyy"
                      value={finalDate}
                      className={classes.inicial}
                      onChange={handleFinalDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
                <Grid item xs={12} className={classes.contenedorBoton}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.boton}
                    onClick={() => setMostrar(true)}
                  >
                    Generar Informes
                  </Button>
                </Grid>
              </Grid>
            </form>

            {mostrar && (
              <div className={classes.root}>
                <AppBar position="static" color="default">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    className={classes.tab}
                    aria-label="scrollable force tabs example"
                  >
                    <Tab
                      className="onetab"
                      label="Vencidos"
                      {...a11yProps(0)}
                    />

                    <Tab
                      className="onetab"
                      label="Rechazados"
                      {...a11yProps(1)}
                    />

                    <Tab
                      className="onetab"
                      label="Solicitados"
                      {...a11yProps(2)}
                    />

                    <Tab
                      className="onetab"
                      label="Pre-aprobados"
                      {...a11yProps(3)}
                    />

                    <Tab
                      className="onetab"
                      label="Aprobados"
                      {...a11yProps(4)}
                    />

                    <Tab
                      className="onetab"
                      label="Desembolsados"
                      {...a11yProps(5)}
                    />

                    <Tab
                      className="onetab"
                      label="Cancelados"
                      {...a11yProps(6)}
                    />
                  </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                  <Vencidos vencidos = {informe.vencidos}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Rechazados rechazados = {informe.rechazados}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Tabla  solicitados = {informe.solicitados}/>
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <Aprobados aprobado = {informe.aprobado} />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <Preaprobados preAprobados ={informe.preAprobados} />
                </TabPanel>
                <TabPanel value={value} index={5}>
                  <Desembolsados desembolsado = {informe.desembolsado}/>
                </TabPanel>
                <TabPanel value={value} index={6}>
                  <Cancelados cancelados = {informe.cancelado}/>
                </TabPanel>
                <TabPanel value={value} index={7}>
                  <Facturacion />
                </TabPanel>
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
