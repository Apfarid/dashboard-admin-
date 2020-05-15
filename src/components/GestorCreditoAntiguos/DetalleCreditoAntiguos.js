import React, { Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import clsx from "clsx";

import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from '@material-ui/core/Button';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

import Title from "../Title";

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
    '& > *': {
      margin: theme.spacing(1),
    },
    display:'flex',
    justifyContent:'center'
  },

  boton:{
    borderRadius:20,
  }





}));

export default function FormPropsTextFields() {
  const classes = useStyles();

  const [value, setValue] = React.useState("female");

  return (
    <Fragment>
      <form className={classes.root} autoComplete="off">
        <Title>Información crédito cédula: ##.###.###</Title>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <InputLabel id="filled-read-only-input">
                Nombre Cliente
              </InputLabel>
              <FilledInput
                id="filled-read-only-input"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <InputLabel id="filled-read-only-input">
                Fecha solicitud del Credito
              </InputLabel>
              <FilledInput
                id="filled-read-only-input"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <InputLabel id="filled-read-only-input">Cedula</InputLabel>
              <FilledInput
                id="filled-read-only-input"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
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
              <InputLabel id="filled-read-only-input">
                Monto Solicitado
              </InputLabel>
              <FilledInput
                id="filled-read-only-input"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
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
              <InputLabel id="filled-read-only-input">
                Plazo Solicitado
              </InputLabel>
              <FilledInput />
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
              <InputLabel id="filled-read-only-input">Banco</InputLabel>
              <FilledInput />
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
              <InputLabel id="filled-read-only-input">
                Numero de Cuenta
              </InputLabel>
              <FilledInput />
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
              <InputLabel id="filled-read-only-input">Medio de PAgo</InputLabel>
              <FilledInput />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} className={classes.form}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <InputLabel id="filled-read-only-input">
                Fecha Firma Cotnrato
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
            </FormControl>
          </Grid>

          <Grid item xs={12} className={classes.botones}>
            <Button variant="contained" color="primary" className={classes.boton}>
              Guardar
            </Button>
            <Button variant="contained" color="primary" className={classes.boton}>
              Imprimir
            </Button>
            <Button variant="contained" color="primary" className={classes.boton}>
              Guardar
            </Button>
            <Button variant="contained" color="primary" className={classes.boton}>
              REgresar
            </Button>

          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
}
