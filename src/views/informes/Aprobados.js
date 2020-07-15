import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  boton: {
    margin: 10
  },
});

export default function SimpleTable({ aprobado }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table" id="tabla-aprobados">
        <TableHead>
          <TableRow>
            <TableCell align="center">Fecha de Aprobacion</TableCell>
            <TableCell align="center">Cedula</TableCell>
            <TableCell align="center">Genero</TableCell>
            <TableCell align="center">Consecutivo Credito</TableCell>
            <TableCell align="center">Cupo</TableCell>
            <TableCell align="center">Plazo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {aprobado.length === 0
            ? "No hay Información"
            : aprobado.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell align="center">{item.fechaAprobado}</TableCell>
                  <TableCell align="center">{item.cliente.cedula}</TableCell>
                  <TableCell align="center">{item.cliente.genero}</TableCell>
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">{item.valorAprobado}</TableCell>
                  <TableCell align="center">{item.diasPrestamo}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <ReactHTMLTableToExcel
          className={classes.boton}
          id="test-table-xls-button"
          table="tabla-aprobados"
          filename="aprobados"
          sheet="APROBADOS"
          buttonText="Exportar a Excel"
        />
    </TableContainer>
  );
}
