import React, { Fragment, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import clienteAxios from "../../config/axios";
import Title from "../Title";
import { withRouter } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Modal from '../Modal'

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

const FormPropsTextFields = (props) => {
  const [Credito, setCredito] = useState({ 
    


  }

    
  );

  const [Cliente, setCliente] = useState([{
    cedula:'',
    nombres:'',
  }]);

  const { id } = props.match.params;
  const classes = useStyles();

  const consultarAPI = async () => {
    const credito = await clienteAxios.get(`/gestor-credito/${id}`);

    setCredito(credito.data[0]);
    setCliente(credito.data[1]);
  };

  console.log(Cliente);

  useEffect(() => {
    consultarAPI();
  }, [Credito, Cliente]);

  const Actualizar = e => {
    e.preventDefault()

    //const credito = await clienteAxios.get(`/gestor-credito/${id}`);
  }

  return (
    <Fragment>
      <form className={classes.root} autoComplete="off" onSubmit={Actualizar}>
        <Title>Información crédito cédula: {Cliente.cedula}</Title>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <TextField
                id="filled-read-only-input"
                label="Nombre Completo"
                value={`${Cliente.nombres} ${Cliente.apellidos}`}
                InputProps={{
                  //readOnly: true,
                  disabled:true
                }}
                variant="filled"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <InputLabel id="filled-read-only-input">
                Fecha solicitud del Credito
              </InputLabel>
              <FilledInput id="filled-read-only-input" />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
            <TextField
                id="filled-read-only-inputq"
                label="Cedula"
                value={`${Cliente.cedula}`}
                InputProps={{
                  disabled:true
                }}
                variant="filled"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <InputLabel id="filled-read-only-input">
                Fecha Pre-aprobado
              </InputLabel>
              <FilledInput />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <InputLabel id="filled-read-only-input">Consecutivo</InputLabel>
              <FilledInput />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <InputLabel id="filled-read-only-input">
                Fecha Aprobado
              </InputLabel>
              <FilledInput />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
            <TextField
                id="filled-read-only-inputq"
                label="Monto Solicitado"
                value={Credito.valorPrestamo}
                InputProps={{
                  disabled:true
                }}
                variant="filled"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
            <FormControl fullWidth className={classes.margin} variant="filled">
              <InputLabel id="filled-read-only-input">
                Monto Aprobado
              </InputLabel>
              <FilledInput />
            </FormControl>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <InputLabel id="filled-read-only-input">
                Fecha de Desembolso
              </InputLabel>
              <FilledInput />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
            <TextField
                id="filled-read-only-inputq"
                label="Plazo Solicitado"
                value={`${Credito.diasPrestamo} días`}
                InputProps={{
                  disabled:true
                }}
                variant="filled"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <InputLabel id="filled-read-only-input">
                Fecha de Cancelacion
              </InputLabel>
              <FilledInput />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
            <TextField
                id="filled-read-only-inputq"
                label="Banco"
                value={`${Cliente.banco}`}
                InputProps={{
                  disabled:true
                }}
                variant="filled"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <InputLabel id="filled-read-only-input">
                Fecha Limite de Pago
              </InputLabel>
              <FilledInput />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
            <TextField
                id="filled-read-only-inputq"
                label="Numero de Cuenta"
                value={`${Cliente.numeroCuenta}`}
                InputProps={{
                  disabled:true
                }}
                variant="filled"
              />
           
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <InputLabel id="filled-read-only-input">
                Firmo Contrato
              </InputLabel>
              <FilledInput />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <InputLabel id="filled-read-only-input">Medio de Pago</InputLabel>
              <FilledInput />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <InputLabel id="filled-read-only-input">
                Fecha Firma Contrato
              </InputLabel>
              <FilledInput />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Estado:</FormLabel>
              <RadioGroup aria-label="gender" name="gender1">
                <div className={classes.radio}>
                  <FormControlLabel
                    value="Solicitado"
                    control={<Radio />}
                    label="Solicitado"
                  />
                  <FormControlLabel
                    value="Rechazado"
                    control={<Radio />}
                    label="Rechazado"
                  />
                  <FormControlLabel
                    value="Pre-Aprobado"
                    control={<Radio />}
                    label="Pre-Aprobado"
                  />
                  <FormControlLabel
                    value="Aprobado"
                    control={<Radio />}
                    label="Aprobado"
                  />
                  <FormControlLabel
                    value="Desembolsado"
                    control={<Radio />}
                    label="Desembolsado"
                  />
                  <FormControlLabel
                    value="Cancelado"
                    control={<Radio />}
                    label="Cancelado"
                  />
                </div>
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                Requiere Adjuntar Archivos:
              </FormLabel>
              <RadioGroup aria-label="gender" name="gender1">
                <div className={classes.radio}>
                  <FormControlLabel
                    value="si"
                    control={<Radio />}
                    label="Solicitar Documentos"
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio />}
                    label="No Solicitar Documentos"
                  />
                </div>
              </RadioGroup>
              <Modal/>
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

export default withRouter(FormPropsTextFields);
