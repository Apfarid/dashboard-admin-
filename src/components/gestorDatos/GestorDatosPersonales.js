import React, { useState, Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import HistoryIcon from "@material-ui/icons/History";
import Title from "../Title";
import InfoIcon from "@material-ui/icons/Info";
import { Link as Lino } from "react-router-dom";
import Link from "@material-ui/core/Link";
import clienteAxios from "../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { obtenerInformacionEditar } from "../../actions/cliente";
import { useHistory } from "react-router-dom";

const GestorDatosPersonales = () => {
  const history = useHistory(); // habilitar history para redirección
  const dispatch = useDispatch();
  const [informacionCliente, setInformacionCliente] = useState([]);

  const clienteInfo = useSelector((state) => state.cliente.clientes);

  console.log(clienteInfo.usuario);

  let listaCliente = clienteInfo.map((cliente) => {
    return {
      id: cliente.id,
      cedula: cliente?.cedula,
      nombres: cliente?.nombres,
      apellidos: cliente?.apellidos,
      correo: cliente?.usuario?.email,
    };
  });

  console.log(clienteInfo);

  const redireccionarEdicion = (id) => {
    const cliente = clienteInfo.filter((cliente) => cliente.id === id);
    dispatch(obtenerInformacionEditar(cliente));
    history.push(`informacion-personal/${id}`);
  };

  useEffect(() => {
    setInformacionCliente(listaCliente);
  }, []);

  const columns = [
    {
      label: "Codigo",
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
        sort: false,
      },
    },

    {
      label: "Nombres",
      name: "nombres",
      options: {
        filter: true,
      },
    },
    {
      label: "Apellidos",
      name: "apellidos",
      options: {
        filter: true,
      },
    },
    {
      label: "Correo",
      name: "correo",
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
      title={"Gestor de Datos Personales"}
      data={informacionCliente.map((cliente) => [
        cliente.id,
        cliente.cedula,
        cliente.nombres,
        cliente.apellidos,
        cliente.correo,
      ])}
      columns={columns}
    />
  );
};

export default GestorDatosPersonales;
