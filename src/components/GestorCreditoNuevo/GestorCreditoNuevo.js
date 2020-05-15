import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CreateIcon from '@material-ui/icons/Create';
import Link from "@material-ui/core/Link";
import Title from "../Title";
import { Link as Lino } from "react-router-dom";
import clienteAxios from "../../config/axios";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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

  const [state, setState] = useState([
    ["22222", "c001", "$100.000", "15", "Aprobada"],
  ]);
  //console.log(state);

  useEffect(() => {
    const consultarAPI = async () => {
      //obtener pedidos
      const resultados = await clienteAxios.get("/solicitud-credito");

      setState(resultados.data);
      console.log(resultados);

      /* setState({
        ...state,
        data:resultados.data
      })
      */
    };

    consultarAPI();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Consecutivo</TableCell>
            <TableCell align="center">Monto</TableCell>
            <TableCell align="center">Plazo</TableCell>
            <TableCell align="center">Estado de Solicitud</TableCell>
            <TableCell align="center">botones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state[0].map((item) => (
            <TableRow key={item.id}>
              <TableCell align="center">{item.id}</TableCell>
              <TableCell align="center">{item.id}</TableCell>
              <TableCell align="center">{item.valorPrestamo}</TableCell>
              <TableCell align="center">{item.diasPrestamo}</TableCell>
              <TableCell align="center">{item.id}</TableCell>
              <TableCell align="center">
              <Link
                component="button"
                variant="body2"
                component={Lino}
                to={`/gestor-creditos/${item.clienteId}`}
              >
                <CreateIcon  
                  color="primary"
                />
              </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

//["cedula", "consecutivo", "$monto", "dias", "estado"],
export default SolicitudesV;

/**
 *
 */
