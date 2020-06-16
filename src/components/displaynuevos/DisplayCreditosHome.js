import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Grid, Divider } from "@material-ui/core";
import AssignmentTwoToneIcon from "@material-ui/icons/AssignmentTwoTone";
import AssignmentLateTwoToneIcon from "@material-ui/icons/AssignmentLateTwoTone";
import AssignmentTurnedInTwoToneIcon from "@material-ui/icons/AssignmentTurnedInTwoTone";
import AssignmentReturnedTwoToneIcon from "@material-ui/icons/AssignmentReturnedTwoTone";
import Container from "@material-ui/core/Container";
import Title from "../Title";
import { Link as Lino } from "react-router-dom";
import clienteAxios from "../../config/axios";
import MarkunreadMailboxIcon from "@material-ui/icons/MarkunreadMailbox";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { useSelector } from "react-redux";
import ReplayIcon from "@material-ui/icons/Replay";
import PreaprobadosconDocumentos from "./PreaprobadosconDocumentos";
import PreaprobadosSinDocumentos from "./PreaprobadosSinDocumentos";
import SolicitudesContador from "./SolicitudesContador";
import AprobadoContador from "./AprobadoContador";
import RenovacionContador from "./RenovacionContador";

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
    //width: 300,
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

/**diasPrestamo(pin):20
valorSolicitado(pin):540000
fechaDesembolso(pin):null
plataforma(pin):21000
administracion(pin):34000
interes(pin):7484.412000000001
interesMoratorio(pin):null
impuesto(pin):10450
valorAprobado(pin):600000
firmaCorta(pin):"3CGk01Aex"
firmaLarga(pin):"0adea78c-70e5-47e3-82d1-1b41dba61d30"
fechaFirma(pin):null
creacionFirma(pin):null
solicitudCredito(pin):true
reFinanciado(pin):null
rechazado(pin):null
preAprobado(pin):true
aprobado(pin):true
desembolsado(pin):true
cancelado(pin):null
fechaRechazado(pin):null
fechaPreaprobado(pin):"2020-05-31"
fechaDesembolsado(pin):"2020-05-31"
fechaSolicitado(pin):"2020-05-31"
fechaAprobado(pin):"2020-05-31"
fechaCancelado(pin):null
solicitarDocumentos(pin):"si"
clienteId(pin):2 */

export default function DisplayCreditosHome({ titulo }) {
  const classes = useStyles();

  const cantidadCreditos = useSelector(
    (state) => state.solicitudCreditosNuevos.solicitudes
  );
  

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
