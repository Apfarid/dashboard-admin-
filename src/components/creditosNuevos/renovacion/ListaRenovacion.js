import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CreateIcon from "@material-ui/icons/Create";
import Link from "@material-ui/core/Link";
import { Link as Lino } from "react-router-dom";
import clienteAxios from "../../../config/axios";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { solicitudNuevos } from "../../../actions/solicitudCreditoNuevoAction";
import { useDispatch, useSelector } from "react-redux";
import DatosListaSolicitudCreditoNuevo from './DatosListaRenovacion'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


const ListaConDocumentosCreditoNuevo = () => {
  const classes = useStyles();

  const creditosFiltrados = useSelector(
    (state) => state.solicitudCreditosNuevos.solicitudes
  );

  let creditosFiltrado = creditosFiltrados.filter(credito => 
    credito.solicitudCredito === true &&
    credito.rechazado === null &&
    credito.solicitarDocumentos !== null &&
    credito.preAprobado === true &&
    credito.aprobado === true &&
    credito.desembolsado === true &&
    credito.cancelado === null &&
    credito.reFinanciado === true &&
    credito.desertado === null
  )


  const conDocumentosDispatch = useDispatch();

  useEffect(() => {
    const solicitudesNuevas = () => conDocumentosDispatch(solicitudNuevos());
    solicitudesNuevas();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">cedula</TableCell>
            <TableCell align="center">Nombres</TableCell>
            <TableCell align="center">Monto Solicitado</TableCell>
            <TableCell align="center">botones</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {creditosFiltrado.length === 0
            ? "No hay Solicitudes"
            : creditosFiltrado.map((solicitud) => (
                <DatosListaSolicitudCreditoNuevo solicitud={solicitud} key={solicitud.id} />
              ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default ListaConDocumentosCreditoNuevo;

/**
 *
 */
