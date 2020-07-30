import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { uuid } from "uuidv4";
import NumberFormat from "react-number-format";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

import Title from "../Title";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

import { useDispatch, useSelector } from "react-redux";
import {
  formateador,
  cobroPlataforma,
  cobroAdministracion,
  intereses,
} from "../../Helper";
import {
  solicitudNuevos,
  editarCreditoAction,
} from "../../actions/solicitudCreditoNuevoAction";
import FormGroup from "@material-ui/core/FormGroup";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import Checkbox from "@material-ui/core/Checkbox";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import shortid from "shortid";
import format from "date-fns/format";

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
}));

let fecha = new Date();
fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());

fecha = format(new Date(fecha), "MM/dd/yyyy");

const EditaCredito = (props) => {
  const classes = useStyles();

  const [credito, setCredito] = useState({});

  const solicitudEditable = useSelector(
    (state) => state.solicitudCreditosNuevos.creditoeditar[0]
  );

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setCredito(solicitudEditable);
  }, [solicitudEditable]);

  const Actualizar = (e) => {
    e.preventDefault();

    if (credito?.valorAprobado === "" || credito?.valorAprobado <= 1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El campo Monto aprobado no debe estar vacio!",
      });
      return;
    }

    if (
      credito?.solicitarDocumentos === true &&
      credito?.preAprobado === null
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No puedes solicitar documentos sin pre aprobar",
      });
      return;
    }

    dispatch(editarCreditoAction(credito));

    history.push("/");
  };

  const handleChangeRadio = (e) => {
    if (e.target.checked === true) {
      setCredito({
        ...credito,
        solicitarDocumentos: true,
        fechaPreaprobado: fecha,
        preAprobado: true,
      });
    } else {
      setCredito({
        ...credito,
        solicitarDocumentos: null,
        fechaPreaprobado: null,
        preAprobado: null,
      });
    }
  };

  const handleChange = (e) => {
    if (e.target.checked === true) {
      switch (e.target.name) {
        case "preAprobado":
          setCredito({
            ...credito,
            fechaPreaprobado: fecha,
            [e.target.name]: e.target.checked,
          });
          break;
        case "rechazado":
          setCredito({
            ...credito,
            fechaRechazado: fecha,
            [e.target.name]: e.target.checked,
          });
          break;
        case "aprobado":
          setCredito({
            ...credito,
            firmaLarga: uuid(),
            firmaCorta: shortid.generate(),
            fechaAprobado: fecha,
            [e.target.name]: e.target.checked,
          });
          break;
        case "desembolsado":
          setCredito({
            ...credito,
            fechaDesembolsado: fecha,
            [e.target.name]: e.target.checked,
          });
          break;
        case "cancelado":
          let dias = differenceInCalendarDays(
            new Date(),
            new Date(credito?.fechaDesembolsado)
          );
          setCredito({
            ...credito,
            fechaCancelado: fecha,
            administracion: cobroAdministracion(credito?.valorAprobado),
            plataforma: cobroPlataforma(credito?.diasPrestamo),
            intereses: intereses(dias, credito?.valorAprobado),
            antiguo: true,
            [e.target.name]: e.target.checked,
          });
          break;
      }
    } else {
      switch (e.target.name) {
        case "preAprobado":
          setCredito({
            ...credito,
            fechaPreaprobado: null,
            [e.target.name]: null,
          });
          break;
        case "rechazado":
          setCredito({
            ...credito,
            fechaRechazado: null,
            [e.target.name]: null,
          });
          break;
        case "aprobado":
          setCredito({
            ...credito,
            firmaLarga: null,
            firmaCorta: null,
            fechaAprobado: null,
            [e.target.name]: null,
          });
          break;
        case "desembolsado":
          setCredito({
            ...credito,
            fechaDesembolsado: null,
            [e.target.name]: null,
          });
          break;
        case "cancelado":
          setCredito({
            ...credito,
            fechaCancelado: null,
            plataforma: null,
            intereses: null,
            administracion: null,
            antiguo: null,
            [e.target.name]: null,
          });
          break;
      }
    }
  };

  const handleChangeMonto = (e) => {
    setCredito({
      ...credito,
      [e.target.name]: e.target.value,
    });
  };

  const cedula = credito?.cliente?.cedula || 0;
  const nombre = credito?.cliente?.nombres || "";
  const apellido = credito?.cliente?.apellidos || "";
  const valosSolicitado = credito?.valorSolicitado || "";
  const banco = credito?.cliente?.banco;
  const cuenta = credito?.cliente?.numeroCuenta;

  return (
    <Fragment>
      <form className={classes.root} autoComplete="off" onSubmit={Actualizar}>
        <Title>Información crédito cédula: {formateador(cedula)}</Title>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <TextField
                id="filled-read-only-input"
                label="Nombre Completo"
                value={`${nombre} ${apellido}`}
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
                label="Cedula"
                value={formateador(cedula)}
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
                value={credito?.fechaPreaprobado || ""}
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
                value={credito?.fechaAprobado || ""}
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
                value={`$ ${formateador(valosSolicitado)}`}
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
                value={credito?.valorAprobado}
                onChange={handleChangeMonto}
                name="valorAprobado"
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  disabled:
                    solicitudEditable?.valorAprobado !== null ? true : false,
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <TextField
                id="filled-read-only-inputq"
                label="Fecha de Cancelación"
                value={credito?.fechaCancelado || ""}
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
                value={credito?.fechaDesembolsado || ""}
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
                value={`${banco}`}
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
                value={`${cuenta}`}
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
                variant="outlined"
                label="Medio de Pago"
                value={credito?.medioPago}
                onChange={handleChangeMonto}
                name="medioPago"
                id="formatted-numberformat-input"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Boolean(credito?.solicitudCredito)}
                    disabled={Boolean(solicitudEditable?.solicitudCredito)}
                    onChange={handleChange}
                    name="solicitudCredito"
                    color="primary"
                  />
                }
                label="Solicitado"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Boolean(credito?.rechazado)}
                    disabled={Boolean(solicitudEditable?.rechazado)}
                    onChange={handleChange}
                    name="rechazado"
                    color="primary"
                  />
                }
                label="Rechazado"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Boolean(credito?.preAprobado)}
                    disabled={Boolean(solicitudEditable?.preAprobado)}
                    onChange={handleChange}
                    name="preAprobado"
                    color="primary"
                  />
                }
                label="Pre-Aprobado"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Boolean(credito?.aprobado)}
                    disabled={Boolean(solicitudEditable?.aprobado)}
                    onChange={handleChange}
                    name="aprobado"
                    color="primary"
                  />
                }
                label="Aprobado"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Boolean(credito?.desembolsado)}
                    disabled={Boolean(solicitudEditable?.desembolsado)}
                    onChange={handleChange}
                    name="desembolsado"
                    color="primary"
                  />
                }
                label="Desembolsado"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Boolean(credito?.cancelado)}
                    disabled={Boolean(solicitudEditable?.cancelado)}
                    onChange={handleChange}
                    name="cancelado"
                    color="primary"
                  />
                }
                label="Cancelado"
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Requisitos</FormLabel>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Boolean(credito?.solicitarDocumentos)}
                    disabled={Boolean(solicitudEditable?.solicitarDocumentos)}
                    onChange={handleChangeRadio}
                    name="solicitarDocumentos"
                    color="primary"
                  />
                }
                label="Solicitar documentos:"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} className={classes.botones}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.boton}
            >
              Guardar
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.boton}
            >
              Imprimir
            </Button>

            <Button
              variant="contained"
              color="primary"
              className={classes.boton}
            >
              Regresar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default withRouter(EditaCredito);
