import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Divider } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Title from "../Title";
import { useSelector } from "react-redux";
import PreaprobadosconDocumentos from "./PreaprobadosconDocumentos";
import PreaprobadosSinDocumentos from "./PreaprobadosSinDocumentos";
import SolicitudesContador from "./SolicitudesContador";
import AprobadoContador from "./AprobadoContador";
import RenovacionContador from "./RenovacionContador";
import ClienteAxios from '../../config/axios'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

  linkContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  },

  concepto: {
    display: "flex",
  },
  icon: {},
  titleConcept: {},

  number: {},

  containerLink: {},

  row: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  solicitud: {
    borderRight: "1px solid red",
    paddingnRight: 50,
  },

  span: {},
  a: {
    display: "flex",
    justifyContent: "space-between",
    margin: 9,
    width: "100%",
    alignItems: "center",
    fontSize: 15,
  },

  span: {
    marginRight: 5,
    fontWeight: "bold",
    fontSize: 20,
    display: "flex",
  },

  icon: {
    fontSize: 40,
    marginLeft: 10,
  },
  group: {
    display: "flex",
    alignItems: "center",
  },
});
export default function DisplayCreditosHome({ titulo }) {
  const classes = useStyles();
  const [creditos, setCreditos] = useState([]);
  
  const cargarCreditos = async () => {
    const respuesta = await ClienteAxios.get("/credito/solicitudes/nuevos");    
    setCreditos(respuesta.data.solicitudNuevos)
  }

  const cantidadCreditos = useSelector(
    (state) => state.solicitudCreditosNuevos.solicitudes
  );

  useEffect (() => {
    cargarCreditos()
  },[]) 

  return (
    <Container>
      <Title>{titulo}</Title>
      <br />
      <Grid Container className={classes.box}>
        <div className={classes.row}>
          <Grid item xs={12}>
            <div className={classes.contenido}>
              <SolicitudesContador />
            </div>
          </Grid>
          <Grid item xs={12}>
            <AprobadoContador />
          </Grid>
        </div>
        <Divider />
        <div className={classes.row}>
          <Grid item xs={12}>
            <PreaprobadosSinDocumentos />
          </Grid>
          <Grid item xs={12}>
            <PreaprobadosconDocumentos />
          </Grid>
        </div>

        <Divider />

        <div className={classes.row}>
          <Grid item xs={6}>
            <div className={classes.contenido}>
              <RenovacionContador />
            </div>
          </Grid>
        </div>
      </Grid>
    </Container>
  );
}
