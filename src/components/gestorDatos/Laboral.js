import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import { Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  descripcion: {
    margin: 0,
  },
  title: {
    marginBottom: 30,
  },
}));

export default function Laboral() {
  const classes = useStyles();

  return (
    <Container>
      <Typography variant="h4" gutterBottom className={classes.title}>
        Información Laboral
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth className={classes.form} variant="filled">
            <h3 className={classes.descripcion}>Situación Actual:</h3>
            <p className={classes.descripcion}>Empleado</p>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth className={classes.form} variant="filled">
            <h3 className={classes.descripcion}>Nombre Empresa:</h3>
            <p className={classes.descripcion}>Social</p>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth className={classes.form} variant="filled">
            <h3 className={classes.descripcion}>Telefono:</h3>
            <p className={classes.descripcion}>2011203</p>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth className={classes.form} variant="filled">
            <h3 className={classes.descripcion}>NIT:</h3>
            <p className={classes.descripcion}>811029368</p>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth className={classes.form} variant="filled">
            <h3 className={classes.descripcion}>Cargo:</h3>
            <p className={classes.descripcion}>Auxiliar Administrativo</p>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth className={classes.form} variant="filled">
            <h3 className={classes.descripcion}>Ciudad:</h3>
            <p className={classes.descripcion}>Medellin</p>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth className={classes.form} variant="filled">
            <h3 className={classes.descripcion}>Eps:</h3>
            <p className={classes.descripcion}>Sura</p>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth className={classes.form} variant="filled">
            <h3 className={classes.descripcion}>Dirección</h3>
            <p className={classes.descripcion}>Calle 10</p>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth className={classes.form} variant="filled">
            <h3 className={classes.descripcion}>Fecha de Ingreso a la Empresa:</h3>
            <p className={classes.descripcion}>30- Mayo-2019</p>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
}
