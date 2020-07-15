import React, { Fragment, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { uuid } from "uuidv4";
import NumberFormat from "react-number-format";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Divider from "@material-ui/core/Divider";

import Title from "../Title";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  solicitudNuevos,
  editarCreditoAction,
} from "../../actions/solicitudCreditoNuevoAction";
import { format } from "date-fns";

import { useHistory, Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  formateador,
  cobroPlataforma,
  cobroAdministracion,
  intereses,
} from "../../Helper";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { crearCompromiso } from "../../actions/compromisosAction";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$ "
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
  },

  descuentos: {
    display: "flex",
    justifyContent: "center",
  },

  radio: {
    display: "flex",
    flexWrap: "wrap",
    alignContent: "center",
  },
  botones: {
    "& > *": {
      margin: theme.spacing(1),
    },
    display: "flex",
    justifyContent: "center",
  },

  boton: {
    borderRadius: 20,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 700,
  },
  modalForm: {
    width: "600px important!",
  },
  compromisos: {
    width: 700,
    margin: "0 auto",
  },
  label: {
    margin: "0 15px",
  },
}));

const fecha = format(new Date(), "MM/dd/yyyy");

const Compromisos = (props) => {
  const classes = useStyles();

  const [credito, setCredito] = useState({});
  const [acuerdo, setAcuerdo] = useState({
    fechaApagarUno: null,
    valorUno: 0,
    observacionUno: "",
    fechaApagarDos: null,
    valorDos: 0,
    observacionDos: "",
    fechaApagarTres: null,
    valorTres: 0,
    observacionTres: "",
    fechaApagarCuatro: null,
    valorCuatro: 0,
    observacionCuatro: "",
  });

  const solicitudEditable = useSelector(
    (state) => state.solicitudCreditosNuevos.creditoeditar[0]
  );
  const [plan, setPlan] = useState([]);

  const planPagos = useSelector((state) => state.Compromisos.acuerdos);
  const history = useHistory();
  const dispatch = useDispatch();
  const compromisoDispatch = useDispatch();

  useEffect(() => {
    setCredito(solicitudEditable);
    setPlan([planPagos]);
  }, [solicitudEditable]);

  const conPlan = plan.filter(
    (plan) => plan.id === credito.id && plan.acuerdo.valorUno !== 0
  );
  const [descuentos, setDescuentos] = useState({
    plataforma: solicitudEditable.descuentoPlataforma,
    administracion: solicitudEditable.descuentoAdministracion,
  });

  const handleFechaApagarUnoChange = (date) => {
    setAcuerdo({
      ...acuerdo,
      fechaApagarUno: date,
    });
  };
  const handleFechaApagarDosChange = (date) => {
    setAcuerdo({
      ...acuerdo,
      fechaApagarDos: date,
    });
  };
  const handleFechaApagarTercerChange = (date) => {
    setAcuerdo({
      ...acuerdo,
      fechaApagarTres: date,
    });
  };

  const handleFechaApagarCuartoChange = (date) => {
    setAcuerdo({
      ...acuerdo,
      fechaApagarCuatro: date,
    });
  };

  const handleCompromisosChange = (e) => {
    setAcuerdo({
      ...acuerdo,
      [e.target.name]: e.target.value,
    });
  };

  const handleDescuentosChange = (e) => {
    setDescuentos({
      ...descuentos,
      [e.target.name]: e.target.value,
    });
  };

  let dias = differenceInCalendarDays(
    new Date(),
    new Date(credito.fechaDesembolsado)
  );
  let interes = intereses(5, credito.valorAprobado);

  const aplicarDescuento = (e) => {
    e.preventDefault();
    let datos = {
      descuentoPlataforma: descuentos.plataforma,
      descuentoAdministracion: descuentos.administracion,
      id: credito.clienteId,
    };

    if (
      descuentos.plataforma <= solicitudEditable.plataforma ||
      descuentos.administracion <= solicitudEditable.administracion
    ) {
      Swal.fire({
        icon: "error",
        title:
          "El descuento no puede ser superior al valor inicialmente pactado.",
      });
    }
    dispatch(editarCreditoAction(datos));
    Swal.fire("Aplicado!", "Descuento aplicado exitosamente", "success");
    history.push("/");
  };

  const enviarCompromiso = (e) => {
    e.preventDefault();
    let informacion = {
      acuerdo: acuerdo,
      fechaApagarUno: acuerdo.fechaApagarUno,
      valorUno: parseInt(acuerdo.valorUno),
      observacionUno: acuerdo.observacionUno,
      fechaApagarDos: acuerdo.fechaApagarDos,
      valorDos: parseInt(acuerdo.valorDos),
      observacionDos: acuerdo.observacionDos,
      fechaApagarTres: acuerdo.fechaApagarTres,
      valorTres: parseInt(acuerdo.valorTres),
      observacionTres: acuerdo.observacionTres,

      id: credito.id,
      idCliente: credito.cliente.id,
    };

    compromisoDispatch(crearCompromiso(informacion));
    history.push("/");
  };

  return (
    <Fragment>
      <form className={classes.root} autoComplete="off">
        <Title>
          Información crédito cédula:{" "}
          {formateador(solicitudEditable.cliente.cedula || "")}
        </Title>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <TextField
                id="filled-read-only-input"
                label="Nombre Completo"
                value={`${solicitudEditable.cliente.nombres || ""} ${
                  solicitudEditable.cliente.apellidos || ""
                }`}
                InputProps={{
                  disabled: true,
                }}
                variant="filled"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <TextField
                id="filled-read-only-input"
                label="Fecha solicitud del Credito"
                value={solicitudEditable.fechaSolicitado || ""}
                InputProps={{
                  disabled: true,
                }}
                variant="filled"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <TextField
                id="filled-read-only-inputq"
                label="Cedula"
                value={formateador(solicitudEditable.cliente.cedula) || ""}
                InputProps={{
                  disabled: true,
                }}
                variant="filled"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <TextField
                id="filled-read-only-input"
                label="Fecha Pre-aprobado"
                value={credito.fechaPreaprobado || ""}
                InputProps={{
                  //readOnly: true,
                  disabled: true,
                }}
                variant="filled"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <TextField
                id="filled-read-only-input"
                label="Consecutivo"
                value={solicitudEditable.id || ""}
                InputProps={{
                  //readOnly: true,
                  disabled: true,
                }}
                variant="filled"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <TextField
                id="filled-read-only-input"
                label="Fecha Aprobado"
                value={credito.fechaAprobado || ""}
                InputProps={{
                  //readOnly: true,
                  disabled: true,
                }}
                variant="filled"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <TextField
                id="filled-read-only-inputq"
                label="Monto Solicitado"
                value={`$ ${
                  formateador(solicitudEditable.valorSolicitado) || ""
                }`}
                InputProps={{
                  disabled: true,
                }}
                variant="filled"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin}>
              <TextField
                variant="outlined"
                label="Monto Aprobado"
                value={credito.valorAprobado}
                name="valorAprobado"
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  disabled: true,
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <TextField
                id="filled-read-only-inputq"
                label="Fecha de Cancelación"
                value={credito.fechaCancelado || ""}
                InputProps={{
                  disabled: true,
                }}
                variant="filled"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <TextField
                id="filled-read-only-inputq"
                label="Plazo Solicitado"
                value={`${solicitudEditable.diasPrestamo} días`}
                InputProps={{
                  disabled: true,
                }}
                variant="filled"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <TextField
                id="filled-read-only-inputq"
                label="Fecha de Desembolso"
                value={credito.fechaDesembolsado || ""}
                InputProps={{
                  disabled: true,
                }}
                variant="filled"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <TextField
                id="filled-read-only-inputq"
                label="Banco"
                value={`${solicitudEditable.cliente.banco || ""}`}
                InputProps={{
                  disabled: true,
                }}
                variant="filled"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <TextField
                id="filled-read-only-inputq"
                label="Fecha limite de pago"
                value={`${solicitudEditable.vencimiento || ""}`}
                InputProps={{
                  disabled: true,
                }}
                variant="filled"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <TextField
                id="filled-read-only-inputq"
                label="Numero de Cuenta"
                value={`${solicitudEditable.cliente.numeroCuenta}`}
                InputProps={{
                  disabled: true,
                }}
                variant="filled"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <TextField
                id="filled-read-only-inputq"
                label="¿Firmó contrato?"
                value={`${solicitudEditable.fechaFirma ? "Sí" : "No" || ""}`}
                InputProps={{
                  disabled: true,
                }}
                variant="filled"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <TextField
                id="filled-read-only-inputq"
                label="Fecha Contrato"
                value={`${solicitudEditable.fechaFirma || ""}`}
                InputProps={{
                  disabled: true,
                }}
                variant="filled"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <TextField
                id="filled-read-only-inputq"
                label="Administracion"
                value={`${cobroAdministracion(credito.valorAprobado)}`}
                InputProps={{
                  disabled: true,
                }}
                variant="filled"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <TextField
                id="filled-read-only-inputq"
                label="Plataforma"
                value={cobroPlataforma(credito.diasPrestamo)}
                InputProps={{
                  disabled: true,
                }}
                variant="filled"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              {/**          let dias = differenceInCalendarDays(new Date(), new Date(credito.fechaDesembolsado))
          setCredito({
            ...credito,
            fechaCancelado: fecha,
            administracion: cobroAdministracion(credito.valorAprobado),
            plataforma: cobroPlataforma(credito.diasPrestamo),
            intereses: intereses(dias, credito.valorAprobado ),
            antiguo: true,
            [e.target.name]: e.target.checked,
          }); */}
              <TextField
                id="filled-read-only-inputq"
                label="Intereses"
                value={formateador(intereses(5, credito.valorAprobado))}
                InputProps={{
                  disabled: true,
                }}
                variant="filled"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <TextField
                id="filled-read-only-inputq"
                label="Intereses por Mora"
                value={`${solicitudEditable.fechaFirma || ""}`}
                InputProps={{
                  disabled: true,
                }}
                variant="filled"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <TextField
                id="filled-read-only-inputq"
                label="Primera Cobranza"
                value={`${solicitudEditable.fechaFirma || ""}`}
                InputProps={{
                  disabled: true,
                }}
                variant="filled"
              />
            </FormControl>
          </Grid>
        </Grid>
      </form>
      <br />
      <Divider />
      <br />
      <br />

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Descuentos</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <form className={classes.descuentos} onSubmit={aplicarDescuento}>
            <Grid container>
              <Grid>
                <TextField
                  className={classes.label}
                  label="Plataforma"
                  value={descuentos.plataforma}
                  onChange={handleDescuentosChange}
                  name="plataforma"
                  id="formatted-numberformat-input"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    disabled: descuentos.plataforma,
                  }}
                />
              </Grid>
              <br />
              <Grid>
                <TextField
                  className={classes.label}
                  label="Administracion"
                  value={descuentos.administracion}
                  onChange={handleDescuentosChange}
                  name="administracion"
                  id="formatted-numberformat-input"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    disabled: descuentos.administracion,
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.botones}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.boton}
              >
                Aplicar
              </Button>
            </Grid>
          </form>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Compromisos de Pagos
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <form className={classes.compromisos} onSubmit={enviarCompromiso}>
            <h2>Primer Compromiso:</h2>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className={classes.label}
                margin="normal"
                id="date-picker-dialog"
                label="Fecha Primer Pago"
                name="fechaApagarUno"
                format="MM/dd/yyyy"
                value={acuerdo.fechaApagarUno}
                onChange={handleFechaApagarUnoChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            <TextField
              className={classes.label}
              label="Monto"
              value={acuerdo.valorUno}
              onChange={handleCompromisosChange}
              name="valorUno"
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
            />

            <TextField
              id="filled-multiline-flexible"
              label="Observaciones"
              multiline
              rowsMax={4}
              name="observacionUno"
              value={acuerdo.observacionUno}
              onChange={handleCompromisosChange}
            />
            <h2>Segundo Compromiso:</h2>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className={classes.label}
                margin="normal"
                id="date-picker-dialog"
                label="Fecha Segundo Pago"
                format="MM/dd/yyyy"
                value={acuerdo.fechaApagarDos}
                onChange={handleFechaApagarDosChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            <TextField
              className={classes.label}
              label="Monto"
              value={acuerdo.valorDos}
              onChange={handleCompromisosChange}
              name="valorDos"
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
            />

            <TextField
              id="filled-multiline-flexible"
              label="Observaciones"
              multiline
              rowsMax={4}
              value={acuerdo.observacionDos}
              onChange={handleCompromisosChange}
              name="observacionDos"
            />
            <h2>Tercer Compromiso:</h2>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className={classes.label}
                margin="normal"
                id="date-picker-dialog"
                label="Fecha Tercer Pago"
                format="MM/dd/yyyy"
                value={acuerdo.fechaApagarTres}
                onChange={handleFechaApagarTercerChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            <TextField
              className={classes.label}
              label="Monto"
              value={acuerdo.valorTres}
              onChange={handleCompromisosChange}
              name="valorTres"
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumberFormatCustom,
                disabled: true,
              }}
            />

            <TextField
              id="filled-multiline-flexible"
              label="Observaciones"
              multiline
              onChange={handleCompromisosChange}
              rowsMax={4}
              name="observacionTres"
              value={acuerdo.observacionTres}
            />
            <h2>Cuarto Compromiso:</h2>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className={classes.label}
                margin="normal"
                id="date-picker-dialog"
                label="Fecha Cuarto Pago"
                format="MM/dd/yyyy"
                value={acuerdo.fechaApagarCuatro}
                onChange={handleFechaApagarCuartoChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            <TextField
              className={classes.label}
              label="Monto"
              value={acuerdo.valorCuatro}
              onChange={handleCompromisosChange}
              name="valorCuatro"
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
            />

            <TextField
              id="filled-multiline-flexible"
              label="Observaciones"
              multiline
              onChange={handleCompromisosChange}
              rowsMax={4}
              name="observacionCuatro"
              value={acuerdo.observacionCuatro}
            />

            <br />
            <br />
            <Grid item xs={12} className={classes.botones}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.boton}
              >
                Aplicar
              </Button>

              <Button
                variant="contained"
                color="primary"
                className={classes.boton}
                component={Link}
                to="/gestor-nuevo-credito/renovacion"
              >
                Regresar
              </Button>
            </Grid>
          </form>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Fragment>
  );
};

export default withRouter(Compromisos);
