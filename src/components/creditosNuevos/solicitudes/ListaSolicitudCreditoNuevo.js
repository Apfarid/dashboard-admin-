/*
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

 */

import React, { useState, Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import HistoryIcon from "@material-ui/icons/History";
import  { formateador } from "../../../Helper";
import InfoIcon from "@material-ui/icons/Info";
import { Link as Lino } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { solicitudNuevos } from "../../../actions/solicitudCreditoNuevoAction";
import { useDispatch, useSelector } from "react-redux";
import DatosListaSolicitudCreditoNuevo from './DatosListaSolicitudCreditoNuevo'
import { obtenerCreditoEditar } from "../../../actions/solicitudCreditoNuevoAction";

const SolicitudesV = () => {
  const history = useHistory(); // habilitar history para redirección
  const [clientes, setClientes] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setClientes(data);
  }, []);

  const creditosFiltrados = useSelector(
    (state) => state.solicitudCreditosNuevos.solicitudes
  );

  console.log(creditosFiltrados);
  

  let creditosFiltrado = creditosFiltrados.filter(credito => credito.solicitudCredito === true && credito.solicitarDocumentos === null)

  let data = creditosFiltrado.map((dato) => {
    return {
      id: dato.id,
      clienteId: dato.clienteId,
      cedula: dato.cliente.cedula,
      nombre: dato.cliente.nombres + " " + dato.cliente.apellidos,
      valorSolicitado: `$ ${formateador(dato.valorSolicitado)}`,
    };
  });

  const redireccionarEdicion = (solicitud) => {
    const credito = creditosFiltrados.filter(
      (item) => item.clienteId === solicitud
    );
    dispatch(obtenerCreditoEditar(credito));
    history.push(`/gestor-creditos/${solicitud}`);
  };

  const columns = [
    {
      label: "Codigo",
      name: "clienteId",
      show: "hiddem",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: "Consecutivo",
      name: "id",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      label: "Cedula",
      name: "cedula",
      options: {
        filter: true,
      },
    },
    {
      label: "Nombre",
      name: "nombre",
      options: {
        filter: true,
      },
    },
    {
      label: "Monto Solicitado",
      name: "valorSolicitado",
      options: {
        filter: true,
      },
    },

    {
      name: "Gestionar",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton
              aria-label="Editar"
              onClick={() => redireccionarEdicion(tableMeta.rowData[0])}
            >
              <EditIcon buttom aria-label="Editar" disabled color="primary" />
            </IconButton>
          );
        },
      },
    },
  ];

  const options = {
    filter: true,
    download: false,
    filterType: "dropdown",
    responsive: "scroll",
    print: false,
    page: 2,
    onColumnSortChange: (changedColumn, direction) =>
      console.log("changedColumn: ", changedColumn, "direction: ", direction),
    onChangeRowsPerPage: (numberOfRows) =>
      console.log("numberOfRows: ", numberOfRows),
    onChangePage: (currentPage) => console.log("currentPage: ", currentPage),
  };

  return (
    <MUIDataTable
      title={"Consulta Claves"}
      //data={informacionCliente.map( cliente => [cliente.cedula, cliente.nombres, cliente.apellidos])}
      data={clientes}
      columns={columns}
      options={options}
    />
  );
};

export default SolicitudesV;
