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
import { useDispatch, useSelector } from "react-redux";
import DatosListaSolicitudCreditoNuevo from './DatosListaConDocumetosCreditoNuevo'
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

  let creditosFiltrado = creditosFiltrados.filter(credito => 
    credito.solicitudCredito === true &&
    credito.rechazado === null &&
    credito.solicitarDocumentos === true &&
    credito.preAprobado === true &&
    credito.aprobado === null &&
    credito.desembolsado === null &&
    credito.cancelado === null &&
    credito.reFinanciado === null &&
    credito.desertado === null
  )

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
      title={"Pre-aprobación con Documentos"}
      data={clientes}
      columns={columns}
      options={options}
    />
  );
};

export default SolicitudesV;

