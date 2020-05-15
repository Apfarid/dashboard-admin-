import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl";
import { Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
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

export default function Financiera() {
  const classes = useStyles();


  return (
    
      <Container>
    <Typography variant="h4" gutterBottom className={classes.title}>
      Información Financiera
    </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} >
          <FormControl fullWidth className={classes.form} variant="filled">
            <h3 className={classes.descripcion}>Tarjeta de Crédito:</h3>
            <p className={classes.descripcion}>Si</p>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} >
          <FormControl fullWidth className={classes.form} variant="filled">
            <h3 className={classes.descripcion}>Ingresos Mensuales:</h3>
            <p className={classes.descripcion}>1´000.000</p>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} >
          <FormControl fullWidth className={classes.form} variant="filled">
            <h3 className={classes.descripcion}>Banco:</h3>
            <p className={classes.descripcion}>Bancolombia</p>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} >
          <FormControl fullWidth className={classes.form} variant="filled">
            <h3 className={classes.descripcion}>Tipo de Cuenta:</h3>
            <p className={classes.descripcion}>Ahorros</p>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} >
          <FormControl fullWidth className={classes.form} variant="filled">
            <h3 className={classes.descripcion}>Número de Cuenta</h3>
            <p className={classes.descripcion}>0123456789</p>
          </FormControl>
        </Grid>
        
        
        </Grid>
      </Container>

    
  );
}