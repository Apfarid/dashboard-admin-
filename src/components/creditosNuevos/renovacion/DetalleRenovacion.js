import React, { Fragment, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { uuid } from "uuidv4";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import NumberFormat from "react-number-format";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

import Title from "../../Title";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

import { useDispatch, useSelector } from "react-redux";
import { formateador } from "../../../Helper";
import {
  solicitudNuevos,
  editarCreditoAction,
} from "../../../actions/solicitudCreditoNuevoAction";
import { contadorCreditos } from "../../../actions/contadorCreditosActions";
import { format } from "date-fns";
import { green } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";

import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { useHistory, Link } from "react-router-dom";
import Swal from "sweetalert2";
import shortid from "shortid";

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

const fecha = format(new Date(), "MM/dd/yyyy");

const EditaCredito = (props) => {
  const classes = useStyles();

  const [credito, setCredito] = useState({});

  const solicitudEditable = useSelector(
    (state) => state.solicitudCreditosNuevos.creditoeditar[0])

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setCredito(solicitudEditable);
  }, [solicitudEditable]);

  console.log(solicitudEditable);

  const Actualizar = (e) => {
    e.preventDefault();
    const fechaDesembolsado = new Date()

    if (credito.valorAprobado === "" || credito.valorAprobado <= 1) {

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El campo Monto aprobado no debe estar vacio!",
      });
      return;
    }

    Swal.fire({
      title: "¿Estas seguro que deseas Renobar este credito",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Renovar!",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.value) {

        dispatch(editarCreditoAction({fechaDesembolsado}));
        Swal.fire("Renobado!", "Podrás hacer seguimiento a este credito en los informes de Gestión", "success");
        history.push("/");
 
      }
    });


    

  };

  const handleChangeRadio = (e) => {
    setCredito({
      ...credito,
      solicitarDocumentos: e.target.value,
    });
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
          setCredito({
            ...credito,
            fechaCancelado: fecha,
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
            antiguo: false,
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

  return (
    <Fragment>
      <form className={classes.root} autoComplete="off" onSubmit={Actualizar}>
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
                onChange={handleChangeMonto}
                name="valorAprobado"
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  disabled:
                    solicitudEditable.valorAprobado !== null ? true : false,
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
                variant="outlined"
                label="Medio de Pago"
                value={credito.medioPago}
                onChange={handleChangeMonto}
                name="medioPago"
                id="formatted-numberformat-input"
                InputProps={{
                  disabled: true,
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Boolean(credito.solicitudCredito)}
                    disabled={Boolean(solicitudEditable.solicitudCredito)}
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
                    checked={Boolean(credito.rechazado)}
                    disabled={true}
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
                    checked={Boolean(credito.preAprobado)}
                    disabled={Boolean(solicitudEditable.preAprobado)}
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
                    checked={Boolean(credito.aprobado)}
                    disabled={Boolean(solicitudEditable.aprobado)}
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
                    checked={Boolean(credito.desembolsado)}
                    disabled={Boolean(solicitudEditable.desembolsado)}
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
                    checked={Boolean(credito.cancelado)}
                    disabled={true}
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
              <FormLabel component="legend">
                Requiere Adjuntar Archivos:
              </FormLabel>
              <RadioGroup
                aria-label="documentos"
                name="solicitarDocumentos"
                onChange={handleChangeRadio}
                value={credito.solicitarDocumentos}
              >
                <div className={classes.radio}>
                  <FormControlLabel
                    value={true}
                    checked={
                      solicitudEditable.preAprobado !== null
                        ? credito.solicitarDocumentos === true
                        : credito.solicitarDocumentos === "true"
                    }
                    disabled={
                      solicitudEditable.preAprobado !== null ? true : false
                    }
                    control={<Radio />}
                    label="Solicitar Documentos"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    checked={
                      solicitudEditable.preAprobado !== null
                        ? credito.solicitarDocumentos === false
                        : credito.solicitarDocumentos === "false"
                    }
                    disabled={
                      solicitudEditable.preAprobado !== null ? true : false
                    }
                    label="No Solicitar Documentos"
                  />
                </div>
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} className={classes.botones}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.boton}
            >
              Renovar
            </Button>
          
            <Button
              variant="contained"
              color="primary"
              className={classes.boton}
              component = {Link}
              to="/gestor-nuevo-credito/renovacion"
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
