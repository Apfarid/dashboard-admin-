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
import PlantillaMorosos from "./PlantillaMorosos";
import Descuentos from "./Descuentos";

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

const PlanPagos = ({ history, solicitudEditable, planPagos }) => {
  const compromisoDispatch = useDispatch();
  const classes = useStyles();
  const [acuerdo, setAcuerdo] = useState({
    fechaApagarUno: planPagos?.fechaApagarUno,
    valorUno: planPagos?.valorUno,
    observacionUno: planPagos?.observacionUno,
    fechaApagarDos: planPagos?.fechaApagarDos,
    valorDos: planPagos?.valorDos,
    observacionDos: planPagos?.observacionDos,
    fechaApagarTres: planPagos?.fechaApagarTres,
    valorTres: planPagos?.valorTres,
    observacionTres: planPagos?.observacionTres,
    fechaApagarCuatro: planPagos?.fechaApagarCuatro,
    valorCuatro: planPagos?.valorCuatro,
    observacionCuatro: planPagos?.observacionCuatro,
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

      id: solicitudEditable.id,
      idCliente: solicitudEditable.cliente.id,
    };

    compromisoDispatch(crearCompromiso(informacion));
    history.push("/");
  };

  return (
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
  );
};

export default withRouter(PlanPagos);
