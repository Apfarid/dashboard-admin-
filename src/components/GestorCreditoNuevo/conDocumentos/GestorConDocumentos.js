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
import { formateador } from "../../../Helper";
import { useHistory } from "react-router-dom";
import { obtenerCreditoEditar } from "../../../actions/solicitudCreditoNuevoAction";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



const SolicitudesV = () => {
  const classes = useStyles();

  const cantidadCreditos = useSelector(
    (state) => state.solicitudCreditosNuevos.solicitudes
  );
  console.log(cantidadCreditos);
  

  let creditosFiltrados = cantidadCreditos.filter(
    (credito) =>
    credito.solicitarDocumentos === true  
    && credito.solicitudCredito === true 
    && credito.aprobado === null
  );

  const solicitudesDispatch = useDispatch();

  useEffect(() => {
    const solicitudesNuevas = () => solicitudesDispatch(solicitudNuevos());
    solicitudesNuevas();
  }, []);

  const dispatch = useDispatch();
  const history = useHistory(); // habilitar history para redirección

  const redireccionarEdicion = (solicitud) => {
    
    dispatch(obtenerCreditoEditar(solicitud));
console.log(solicitud.clienteId)
    history.push(`preaprobado-con-documentos/${solicitud.clienteId}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">cedula</TableCell>
            <TableCell align="center">Nombres</TableCell>
            <TableCell align="center">Monto Pre Aprobado</TableCell>
            <TableCell align="center">Plazo</TableCell>
            <TableCell align="center">botones</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {creditosFiltrados.length === 0
            ? "No hay productos"
            : creditosFiltrados.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">
                    {item.cliente.nombres} {item.cliente.apellidos}
                  </TableCell>
                  <TableCell align="center">{item.valorAprobado}</TableCell>
                  <TableCell align="center">
                    {item.diasPrestamo}{" "}
                    {item.diasPrestamo <= 1 ? "días" : "día"}
                  </TableCell>
                  <TableCell align="center">
                    <button
                      type="button"
                      onClick={() => redireccionarEdicion(item)}
                      className="btn btn-primary mr-2"
                    >
                      Editar
                    </button>
                  </TableCell>
                </TableRow>
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




 