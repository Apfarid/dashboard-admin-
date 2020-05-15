import React, { useState, Fragment, useEffect } from 'react';
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
import clienteAxios from '../../config/axios'

const GestorDatosPersonales = () => {
  
  const [informacionCliente, setInformacionCliente] = useState([]);
  const consultarAPI = async () => {
    const cliente = await clienteAxios.get('/clientes')
    setInformacionCliente(cliente.data);
    
  }
  
  useEffect( ()=>{
    consultarAPI()
    
    
  },[informacionCliente])


  
  





  const [clientes, setClientes] = useState(
    [
      ["****", "***** ", "******", "*******", "******"],

    ]
  );



  
  


  const columns = [
    {
      name: "Cedula",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: "consecutivo",
      options: {
        filter: true,
      },
    },
    {
      name: "Clave Corta",
      options: {
        filter: true,
      },
    },

    {
      name: "Clave Larga",
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

    {
      name: "Informacion",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Fragment>
              <Link
                component="button"
                variant="body2"
                //component={Lino}
                //to="informacion-personal"
              >
                <InfoIcon
                  buttom
                  aria-label="delete"
                  disabled
                  color="primary"
                />
              </Link>
              <Link
                component="button"
                variant="body2"
                //component={Lino}
                //to="/historico-cliente"
              >
                <HistoryIcon
                  buttom
                  aria-label="delete"
                  disabled
                  color="primary"
                />
              </Link>
            </Fragment>
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
        title={"Gestor de Claves"}
        //data={informacionCliente.map( cliente => [cliente.cedula, cliente.nombres, cliente.apellidos])}
        data={clientes}
        columns={columns}
        options={options}
      />
  );
};

export default GestorDatosPersonales;