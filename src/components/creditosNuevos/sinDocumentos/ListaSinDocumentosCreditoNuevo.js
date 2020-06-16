/*import React, { Fragment, useState, useEffect } from "react";
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
import DatosListaSolicitudCreditoNuevo from './DatosListaSinDocumetosCreditoNuevo'

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
    credito.solicitarDocumentos === false &&
    credito.preAprobado === true &&
    credito.aprobado === null &&
    credito.desembolsado === null &&
    credito.cancelado === null &&
    credito.reFinanciado === null &&
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

 */

import React, { useState, Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import HistoryIcon from "@material-ui/icons/History";
import Helper, { formateador } from "../../../Helper";
import InfoIcon from "@material-ui/icons/Info";
import { Link as Lino } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { obtenerCreditoEditar } from "../../../actions/solicitudCreditoNuevoAction";
import { useDispatch, useSelector } from "react-redux";

const GestorDatosPersonales = () => {
  const history = useHistory(); // habilitar history para redirección
  const [clientes, setClientes] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setClientes(data);
  }, []);



  const creditosFiltrados = useSelector(
    (state) => state.solicitudCreditosNuevos.solicitudes
  );

  let creditosFiltrado = creditosFiltrados.filter(
    (credito) =>
      credito.solicitudCredito === true &&
      credito.rechazado === null &&
      credito.solicitarDocumentos === false &&
      credito.preAprobado === true &&
      credito.aprobado === null &&
      credito.desembolsado === null &&
      credito.cancelado === null &&
      credito.reFinanciado === null &&
      credito.desertado === null
  );

  let data = creditosFiltrado.map((dato) => {
    return {
      clienteId : dato.clienteId,
      id: dato.id,
      cedula: dato.cliente.cedula,
      nombre: dato.cliente.nombres + " " + dato.cliente.apellidos,
      valorAprobado: `$ ${formateador(dato.valorAprobado)}`,
      firmado: dato.firmaCorta ? "Sí" : "No",
    };
  });

  const redireccionarEdicion = (solicitud) => {
    console.log(solicitud)
    const credito = creditosFiltrado.filter( credito => credito.clienteId === solicitud)
    console.log(credito);
    
    dispatch(obtenerCreditoEditar(credito));
    history.push(
      `/gestor-nuevo-credito/preaprobado-con-documentos/${solicitud}`
    );
  };





  const columns = [
    {
      label: "Codigo",
      name: "clienteId",
      show:"hiddem",
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
      name: "valorAprobado",
      options: {
        filter: true,
      },
    },

    {
      label: "Contrato Firmado",
      name: "firmado",
      options: {
        filter: true,
      },
    },

    {
        name: "Edit",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            
            // Here you can render a more complex display.
            // You're given access to tableMeta, which has
            // the rowData (as well as the original object data).
            // See the console for a detailed look at this object.
            
            console.log('customBodyRender');
            console.dir(tableMeta);
            console.log(value);
            
            return value;
          }
        },
      },

    {
      name: "Informacion",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton aria-label="Editar" onClick={() => redireccionarEdicion(tableMeta.rowData[0])}>
              <InfoIcon buttom aria-label="Editar" disabled color="primary" />
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

export default GestorDatosPersonales;
