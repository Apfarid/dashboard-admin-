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
import DatosListaSolicitudCreditoNuevo from './DatosListaSolicitudCreditoNuevo'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const SolicitudesV = () => {
  const classes = useStyles();

  const creditosFiltrados = useSelector(
    (state) => state.solicitudCreditosNuevos.solicitudes
  );

  let creditosFiltrado = creditosFiltrados.filter(credito => credito.solicitudCredito === true && credito.solicitarDocumentos === null)


  const solicitudesDispatch = useDispatch();

  useEffect(() => {
    const solicitudesNuevas = () => solicitudesDispatch(solicitudNuevos());
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

//["cedula", "consecutivo", "$monto", "dias", "estado"],
export default SolicitudesV;

/**
 *
 */
