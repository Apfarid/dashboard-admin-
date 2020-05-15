import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Link from '@material-ui/core/Link';
import Title from "../Title";
import { Link as Lino } from "react-router-dom";

class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        ["22222", "c001", "$100.000", "15", "Aprobada"],
        ["22222", "c06", "$200.000", "15", "Aprobada"],
        ["22222", "c098", "$300.000", "15", "Aprobada"],
        ["22222", "c040", "$400.000", "15", "Aprobada"],
        ["22222", "c041", "$500.000", "15", "Aprobada"],
        ["22222", "c065", "$600.000", "15", "Aprobada"],
        ["22222", "c060", "$700.000", "15", "Aprobada"],
        ["22222", "c006", "$600.000", "15", "Aprobada"],
        ["22222", "c060", "$400.000", "15", "Aprobada"],
      ],
    };
  }
  const 

  render() {
    const columns = [
      {
        name: "Cedula",
        options: {
          filter: true,
          sort: false,
        },
      },

      {
        name: "Consecutivo",
        options: {
          filter: true,
        },
      },
      {
        label: "Monto",
        name: "Title",
        options: {
          filter: false,
        },
      },
      {
        name: "Plazo",
        options: {
          filter: false,
        },
      },
      {
        name: "Estado de Solicitud",
        options: {
          filter: false,
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
              <Link
                component="button"
                variant="body2"
                component={Lino}
                to="/detalle-cliente-antiguop"
              >
                <EditIcon  
                  color="primary"
                />
              </Link>
            );
          },
        },
      },
      {
        name: "Delete",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <IconButton>
                <DeleteIcon
                  buttom
                  aria-label="delete"
                  disabled
                  color="primary"
                  onClick={() => {
                    const { data } = this.state;
                    data.shift();
                    this.setState({ data });
                  }}
                />
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
        title={"Solicitud Clientes Antiguos"}
        data={this.state.data}
        columns={columns}
        options={options}
      />
    );
  }
}

export default Example;


/**
 *  React.useEffect(() => {
    const consultarAPI = async () => {
      //obtener pedidos
      const resultados = await clienteAxios.get("/solicitud-credito");
      setState({
        ...state,
        data:resultados.data
      })
      

    };
  
    consultarAPI();
  }, []);
 */