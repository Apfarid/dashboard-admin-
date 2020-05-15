import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  root: {},

  form: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: "0 20px",
  },
}));

export default function Referencias() {
  const classes = useStyles();

  

  return (
    <Container>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Grid item xs={12} sm={12} md={6}>
            <Grid ListTile className={classes.form}>
              Referencia Familiar{" "}
            </Grid>
            <FormControl fullWidth className={classes.form} variant="filled">
              <h3>Nombre Completo:</h3>
              <p>Camilo Yepez</p>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormControl fullWidth className={classes.form} variant="filled">
              <h3>Ciudad:</h3>
              <p>Medellin</p>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormControl fullWidth className={classes.form} variant="filled">
              <h3>Teléfono:</h3>
              <p>3128199712</p>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FormControl fullWidth className={classes.form} variant="filled">
              <h3>Parentezco:</h3>
              <p>Primo</p>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      <Grid Container>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Grid item xs={12} sm={12} md={6}>
              <Grid ListTile className={classes.form}>
                Referencia Personal{" "}
              </Grid>
              <FormControl fullWidth className={classes.form} variant="filled">
                <h3>Nombre Completo:</h3>
                <p>Anderson Yepez</p>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <FormControl fullWidth className={classes.form} variant="filled">
                <h3>Ciudad:</h3>
                <p>Medellin</p>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <FormControl fullWidth className={classes.form} variant="filled">
                <h3>Teléfono:</h3>
                <p>3128199712</p>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <FormControl fullWidth className={classes.form} variant="filled">
                <h3>Parentezco:</h3>
                <p>Primo</p>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
