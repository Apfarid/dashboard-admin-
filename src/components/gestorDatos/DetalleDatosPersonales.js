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

import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

import { useDispatch, useSelector } from "react-redux";
import { formateador } from "../../Helper";
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
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {editarInformacionAction} from "../../actions/cliente"

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

  rootDatos: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  rootButton: {
    '& > *': {
      margin: theme.spacing(1),
 
    },
  },
}));

const fecha = format(new Date(), "MM/dd/yyyy");

const EditaCreditoS = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const cliente = useSelector((state) => state.cliente.clienteeditar[0]);
  const [clienteInfo, setClienteInfo] = useState({});

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    setClienteInfo(cliente);
  }, [cliente]);

  const handleDatosChange = e => {
    setClienteInfo({
      ...clienteInfo,
    [e.target.name]: e.target.value
    })
  }

  const actualizar = e => {
    e.preventDefault()
    Swal.fire({
      title: "¿Estas seguro de actualizar esta información?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, abandonar!",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.value) {
        dispatch(editarInformacionAction(clienteInfo));
       Swal.fire("¡Actualizado!", "Información Actualizada.", "success");
        props.history.push("/");
      }
    });
  }

  return (
    <form className={classes.root} onSubmit={actualizar}>
      <h1>{`${cliente.nombres} ${cliente.apellidos}`}</h1>
      <div className={classes.rootDatos}>
        <ExpansionPanel
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>
              Informacion Personal
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Nombres Completos"
                    variant="filled"
                    name="nombres"
                    value={clienteInfo.nombres}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Apellidos Completos"
                    variant="filled"
                    name="apellidos"
                    value={clienteInfo.apellidos}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Numero de Cedula"
                    variant="filled"
                    name="cedula"
                    value={clienteInfo.cedula}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Fecha de Expedicion"
                    variant="filled"
                    name="expedicionId"
                    value={clienteInfo.expedicionId}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Telefono Fijo"
                    variant="filled"
                    name="telefonoFijo"
                    value={clienteInfo.telefonoFijo}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Celular"
                    variant="filled"
                    name="celular"
                    //value={clienteInfo.telefonoFijo}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Ciudad"
                    variant="filled"
                    name="ciudad"
                    value={clienteInfo.ciudad}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Barrio"
                    variant="filled"
                    name="barrio"
                    value={clienteInfo.barrio}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Estrato"
                    variant="filled"
                    name="estrato"
                    value={clienteInfo.estrato}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Tipo de Vivienda"
                    variant="filled"
                    name="tipoVivienda"
                    value={clienteInfo.tipoVivienda}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Nivel de Estudios"
                    variant="filled"
                    name="nivelEstudio"
                    value={clienteInfo.nivelEstudio}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Genero"
                    variant="filled"
                    name="genero"
                    value={clienteInfo.genero}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Correo Electronico"
                    variant="filled"
                    name="email"
                    value={clienteInfo.email}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Banco"
                    variant="filled"
                    name="banco"
                    value={clienteInfo.banco}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Numero de Cuenta"
                    variant="filled"
                    name="numeroCuenta"
                    value={clienteInfo.numeroCuenta}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Tipo de Cuenta"
                    variant="filled"
                    name="tipoCuenta"
                    value={clienteInfo.tipoCuenta}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Tiene TC"
                    variant="filled"
                    name="preguntaTC"
                    value={clienteInfo.preguntaTC}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Ingresos Mensuales"
                    variant="filled"
                    name="ingresosMensuales"
                    value={clienteInfo.ingresosMensuales}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}>Como Empleado</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Nombres de la Empresa"
                    variant="filled"
                    name="nombreEmpresa"
                    value={clienteInfo.nombreEmpresa}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Nit"
                    variant="filled"
                    name="nit"
                    value={clienteInfo.nit}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Ciudad donde se encuenta ubicada la empresa"
                    variant="filled"
                    name="ciudadEmpresa"
                    value={clienteInfo.ciudadEmpresa}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Direccion de la empresa"
                    variant="filled"
                    name="direccionEmpresa"
                    value={clienteInfo.direccionEmpresa}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Telefono de la empresa"
                    variant="filled"
                    name="telefonoEmpresa"
                    value={clienteInfo.telefonoEmpresa}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Tipo de Contrato"
                    variant="filled"
                    name="tipoContrato"
                    value={clienteInfo.tipoContrato}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Cargo"
                    variant="filled"
                    name="cargo"
                    value={clienteInfo.cargo}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="EPS"
                    variant="filled"
                    name="eps"
                    value={clienteInfo.eps}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Fecha de Ingreso"
                    variant="filled"
                    name="fechaIngreso"
                    value={clienteInfo.fechaIngreso}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography className={classes.heading}>
              Como Independiente
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Nombres Comercial"
                    variant="filled"
                    name="nombreCompletoIndependiente"
                    value={clienteInfo.nombreCompletoIndependiente}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Ciudad de actividad Comercial"
                    variant="filled"
                    name="ciudadIndependiente"
                    value={clienteInfo.ciudadIndependiente}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Direccion Comercial"
                    variant="filled"
                    name="direccionIndependiente"
                    value={clienteInfo.direccionIndependiente}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Telefono Comercial"
                    variant="filled"
                    name="telefonoIndependiente"
                    value={clienteInfo.telefonoIndependiente}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Ingresos"
                    variant="filled"
                    name="ingresosIndependiente"
                    value={clienteInfo.ingresosIndependiente}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography className={classes.heading}>
              Como Desempleado
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Tiempo de Inactividad"
                    variant="filled"
                    name="tiempoDesempleado"
                    value={clienteInfo.tiempoDesempleado}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography className={classes.heading}>Como Pensionado</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Fondo Pensional"
                    variant="filled"
                    name="fondoPensional"
                    value={clienteInfo.fondoPensional}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Causa de la Pension"
                    variant="filled"
                    name="causaPension"
                    value={clienteInfo.causaPension}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Fecha de la Resolucion"
                    variant="filled"
                    name="fechaResolucion"
                    value={clienteInfo.fechaResolucion}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel6"}
          onChange={handleChange("panel6")}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography className={classes.heading}>Referencia Personal</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Nombres"
                    variant="filled"
                    name="nombreReferenciaPersonal"
                    value={clienteInfo.nombreReferenciaPersonal}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Apellidos"
                    variant="filled"
                    name="apellidoReferenciaPersonal"
                    value={clienteInfo.apellidoReferenciaPersonal}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Ciudad"
                    variant="filled"
                    name="ciudadReferenciaPersonal"
                    value={clienteInfo.ciudadReferenciaPersonal}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Telefono"
                    variant="filled"
                    name="telefonoReferenciaPersonal"
                    value={clienteInfo.telefonoReferenciaPersonal}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel7"}
          onChange={handleChange("panel7")}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography className={classes.heading}>
              Referencia Familiar
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Nombres"
                    variant="filled"
                    name="nombreReferenciaFamiliar"
                    value={clienteInfo.nombreReferenciaFamiliar}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Apellidos"
                    variant="filled"
                    name="apellidoReferenciaFamiliar"
                    value={clienteInfo.apellidoReferenciaFamiliar}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Ciudad"
                    variant="filled"
                    name="ciudadReferenciaFamiliar"
                    value={clienteInfo.ciudadReferenciaFamiliar}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Telefono"
                    variant="filled"
                    name="telefonoReferenciaFamiliar"
                    value={clienteInfo.telefonoReferenciaFamiliar}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} className={classes.form}>
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="filled"
                >
                  <TextField
                    id="filled-read-only-input"
                    label="Parentezco"
                    variant="filled"
                    name="parentezcoReferenciaFamiliar"
                    value={clienteInfo.parentezcoReferenciaFamiliar}
                    onChange={handleDatosChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      <br/><br/>
      <div className={classes.rootButton}>
      <Button variant="contained" color="secondary" component ={Link} to="/gestor-datos">
        Regresar
      </Button>
      <Button variant="contained" color="primary" type="submit">
        Guardar
      </Button>
      </div>
    </form>
  );
};

export default withRouter(EditaCreditoS);
