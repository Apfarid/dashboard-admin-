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
import { useSelector } from "react-redux";

const GestorDatosPersonales = () => {

  const [clientes, setClientes] = useState([ ]);

  const firmas = useSelector((state) => state.numeroCreditos.contador);

  let data = firmas.map((dato) => {
    return {
      Cedula: dato.cliente.cedula,
      consecutivo: dato.id,
      nombre: dato.cliente.nombres + " " + dato.cliente.apellidos,
      claveCorta: dato.firmaCorta,
      claveLarga: dato.firmaLarga,
      fechaCreacion: dato.fechaFirma,
    };
  });

  useEffect(() => {
    setClientes(data);
  }, []);

  const columns = [
    {
      name: "Cedula",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      label:"Consecutivo",
      name: "consecutivo",
      options: {
        filter: true,
      },
    },
    {
      label:"Nombre",
      name: "nombre",
      options: {
        filter: true,
      },
    },
    {
      label:"Clave Corta",
      name: "claveCorta",
      options: {
        filter: true,
      },
    },

    {
      label:"Clave Larga",
      name: "claveLarga",
      options: {
        filter: true,
      },
    },

    {
      name: "Fecha de Creacion",
      options: {
        filter: true,
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
