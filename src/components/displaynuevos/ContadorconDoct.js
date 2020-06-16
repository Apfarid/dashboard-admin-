import React from "react";
import MarkunreadMailboxIcon from "@material-ui/icons/MarkunreadMailbox";
import { makeStyles } from "@material-ui/core/styles";
import { Link as Lino } from "react-router-dom";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import Link from "@material-ui/core/Link";
import { useSelector } from "react-redux";


const item = makeStyles({
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

const ContadorconDoct = ({ numero }) => {
  const classes = item();

  const cantidadCreditos = useSelector(
    (state) => state.solicitudCreditosNuevos.solicitudes
  );
  
  let conDocumentos = cantidadCreditos.filter(solicitud => {
    if (
      solicitud.solicitudCredito === true &&
      solicitud.rechazado === null &&
      solicitud.solicitarDocumentos === true &&
      solicitud.preAprobado === true &&
      solicitud.aprobado === null &&
      solicitud.desembolsado === null &&
      solicitud.cancelado === null &&
      solicitud.reFinanciado === null &&
      solicitud.desertado === null
    ) {
      return true
    }
  })

    return (
    <Link
      className={classes.a}
      underline={"none"}
      component="button"
      component={Lino}
      to="/gestor-nuevo-credito/preaprobado-con-documentos"
    >
      <div className={classes.group}>
        <HourglassFullIcon className={classes.icon} />
        <p>
          Pre-Aprobacion <br />
          con Documentos
        </p>
      </div>
      <span className={classes.span}>{conDocumentos.length}</span>
    </Link>
  );
};

export default ContadorconDoct;
