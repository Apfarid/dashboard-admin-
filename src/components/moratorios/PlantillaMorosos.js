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

const Plantilla = ({ solicitudEditable }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <form className={classes.root} autoComplete="off">
        <Title>
          Información crédito cédula:{" "}
          {formateador(solicitudEditable?.cliente?.cedula || "")}
        </Title>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <TextField
                id="filled-read-only-input"
                label="Nombre Completo"
                value={`${solicitudEditable?.cliente?.nombres || ""} ${
                  solicitudEditable?.cliente?.apellidos || ""
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
                value={solicitudEditable?.fechaSolicitado || ""}
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
                value={formateador(solicitudEditable?.cliente?.cedula) || 0}
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
                value={solicitudEditable?.fechaPreaprobado || ""}
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
                value={solicitudEditable?.id || ""}
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
                value={solicitudEditable?.fechaAprobado || ""}
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
                  formateador(solicitudEditable?.valorSolicitado) || ""
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
                value={solicitudEditable?.valorAprobado}
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
                value={solicitudEditable?.fechaCancelado || ""}
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
                value={`${solicitudEditable?.diasPrestamo} días`}
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
                value={solicitudEditable?.fechaDesembolsado || ""}
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
                value={`${solicitudEditable?.cliente.banco || ""}`}
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
                value={`${solicitudEditable?.vencimiento || ""}`}
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
                value={`${solicitudEditable?.cliente?.numeroCuenta}`}
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
                value={`${solicitudEditable?.fechaFirma ? "Sí" : "No" || ""}`}
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
                value={`${solicitudEditable?.fechaFirma || ""}`}
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
                value={`${formateador(
                  cobroAdministracion(solicitudEditable?.valorAprobado) -
                    solicitudEditable?.descuentoAdministracion
                )}`}
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
                value={`$ ${formateador(
                  cobroPlataforma(solicitudEditable.diasPrestamo) -
                    solicitudEditable.descuentoPlataforma
                )}`}
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
                label="Intereses"
                value={intereses(30, solicitudEditable.valorAprobado)}
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
    </Fragment>
  );
};

export default withRouter(Plantilla);
