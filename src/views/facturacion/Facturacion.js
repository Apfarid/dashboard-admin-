import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import clsx from "clsx";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { format, parse } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import Facturacion from "../informes/Facturacion";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { creditosGeneral } from "../../actions/creditoAction";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

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
    facturados: [],
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

    const facturados = data.filter(
      (credito) =>
        credito.fechaCancelado >= inicial && credito.fechaCancelado <= final
    );


    setInforme({
      ...informe,
      facturados 
    });
  };

  return (
    <Container className={classes.container}>
      <Grid container spacing={3}>
        {/* Detalle Creditos */}
        <Grid item xs={12}>
          <Paper>
            <h2 className={classes.titulo}>Informes Facturación:</h2>
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
                      label="Facturación"
                      {...a11yProps(0)}
                    />

                  </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                  <Facturacion facturados = {informe.facturados}/>
                </TabPanel>
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
