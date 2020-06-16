import React, { useState, useEffect } from "react";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";

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

const PreaprobadosconDocumentos = () => {
  const classes = item();
  const [numero, setNumero] = useState([]);

  const cantidadCreditos = useSelector(
    (state) => state.solicitudCreditosNuevos.solicitudes
  );

  useEffect(() => {
    let conDocumentos = cantidadCreditos.filter((solicitud) => {
      if (
        solicitud.solicitudCredito === true &&
        solicitud.rechazado === null &&
        solicitud.solicitarDocumentos === false &&
        solicitud.preAprobado === true &&
        solicitud.aprobado === null &&
        solicitud.desembolsado === null &&
        solicitud.cancelado === null &&
        solicitud.reFinanciado === null &&
        solicitud.desertado === null
      ) {
        return solicitud;
      }
    });

    const conDocumentosFN = () => {
      setNumero({
        ...numero,
        conDocumentos,
      });
    };

    conDocumentosFN();
  }, [cantidadCreditos]);

  let t = numero.conDocumentos ? numero.conDocumentos.length : 0;

  return (
    <Link
      className={classes.a}
      underline={"none"}
      component="button"
      component={Lino}
      to="gestor-nuevo-credito/preaprobado-sin-documentos"
    >
      <div className={classes.group}>
      <HourglassEmptyIcon className={classes.icon} />
        <p>
          Pre-Aprobacion <br />
          Sin Documentos
        </p>
      </div>
      <span className={classes.span}>{t}</span>
    </Link>
  );
};

export default PreaprobadosconDocumentos;
