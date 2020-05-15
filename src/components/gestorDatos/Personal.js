import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {},

  form: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row", 
  },
  descripcion:{
    margin: 0
  },
  title:{
    marginBottom: 30
  }
}));

export default function Personal() {
  const classes = useStyles();

  return (
    <Container>
      <Typography variant="h4" gutterBottom className={classes.title}>
        Información Personal
      </Typography>

      <Grid container spacing={3}>

        <Grid item xs={12} sm={12} md={6} >
          <FormControl fullWidth className={classes.form} variant="filled">
            <h3 className={classes.descripcion}>Tipo de Identificación:</h3>
            <p className={classes.descripcion}>Cédula de Ciudadania</p>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth className={classes.form} variant="filled">
            <h3 className={classes.descripcion}>Cédula:</h3>
            <p className={classes.descripcion}>123456789</p>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth className={classes.form} variant="filled">
            <h3 className={classes.descripcion}>Fecha de Expedición:</h3>
            <p className={classes.descripcion}>27-Jul-2011</p>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth className={classes.form} variant="filled">
            <h3 className={classes.descripcion}>Nombres Apellidos:</h3>
            <p className={classes.descripcion}>Juan Andres Paz</p>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth className={classes.form} variant="filled">
            <h3 className={classes.descripcion}>Ciudad:</h3>
            <p className={classes.descripcion}>Medellín</p>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth className={classes.form} variant="filled">
            <h3 className={classes.descripcion}>Barrio:</h3>
            <p className={classes.descripcion}>Belén</p>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth className={classes.form} variant="filled">
            <h3 className={classes.descripcion}>Correo Electronico.</h3>
            <p className={classes.descripcion}>juanpaz@gmail.com</p>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth className={classes.form} variant="filled">
            <h3 className={classes.descripcion}>Sexo.</h3>
            <p className={classes.descripcion}>Masculino</p>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth className={classes.form} variant="filled">
            <h3 className={classes.descripcion}>Tipo de Vivienda</h3>
            <p className={classes.descripcion}>Familiar</p>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth className={classes.form} variant="filled">
            <h3 className={classes.descripcion}>Estrato:</h3>
            <p className={classes.descripcion}>1</p>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth className={classes.form} variant="filled">
            <h3 className={classes.descripcion}>Nivel de Estudios:</h3>
            <p className={classes.descripcion}>Profesional</p>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormControl fullWidth className={classes.form} variant="filled">
            <h3 className={classes.descripcion}>Estado Civil:</h3>
            <p className={classes.descripcion}>Casado</p>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
}
