import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  
  boton: {
    margin: 10
  },
});

export default function Solicitado({solicitados}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table" id="tabla-solicitudes">
        <TableHead>
          <TableRow>
          <TableCell align="center">Fecha de Solicitud</TableCell>
            <TableCell align="center">Cedula</TableCell>
            <TableCell align="center">Genero</TableCell>
            <TableCell align="center">Consecutivo Credito</TableCell>
            <TableCell align="center">Monto Solicitado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {solicitados.length === 0
            ? "No hay Información"
            : solicitados.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell align="center">{item.fechaSolicitado}</TableCell>
                  <TableCell align="center">{item.cliente.cedula}</TableCell>
                  <TableCell align="center">{item.cliente.genero}</TableCell>
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">{item.valorSolicitado}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <ReactHTMLTableToExcel
          className={classes.boton}
          id="test-table-xls-button"
          table="tabla-solicitudes"
          filename="solicitudes"
          sheet="SOLICITUDES"
          buttonText="Exportar a Excel"
        />
    </TableContainer>
  );
}
