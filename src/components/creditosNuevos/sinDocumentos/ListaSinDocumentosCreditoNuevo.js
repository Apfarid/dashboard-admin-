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
      clienteId: dato.clienteId,
      id: dato.id,
      cedula: dato.cliente.cedula,
      nombre: dato.cliente.nombres + " " + dato.cliente.apellidos,
      valorAprobado: `$ ${formateador(dato.valorAprobado)}`,
      firmado: dato.firmaCorta ? "Sí" : "No",
    };
  });

  const redireccionarEdicion = (solicitud) => {
    const credito = creditosFiltrado.filter(
      (credito) => credito.clienteId === solicitud
    );
    dispatch(obtenerCreditoEditar(credito));
    history.push(
      `/gestor-nuevo-credito/preaprobado-con-documentos/${solicitud}`
    );
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
      name: "Información",
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
      title={"Solicitud de Creditos sin Documentación"}
      data={clientes}
      columns={columns}
      options={options}
    />
  );
};

export default GestorDatosPersonales;
