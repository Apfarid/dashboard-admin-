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

export default function TablaDesembolsados({desembolsado}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table" id="tabla-desembolsados">
        <TableHead>
          <TableRow>
          <TableCell align="right">Fecha de Desembolso</TableCell>
            <TableCell align="right">Cedula</TableCell>
            <TableCell align="right">Genero</TableCell>
            <TableCell align="right">Consecutivo Credito</TableCell>
            <TableCell align="right">Monto Aprobado</TableCell>
            <TableCell align="right">Plazo</TableCell>
            <TableCell align="right">Banco</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {desembolsado.length === 0
            ? "No hay Información"
            : desembolsado.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell align="center">{item.fechaDesembolsado}</TableCell>
                  <TableCell align="center">{item.cliente.cedula}</TableCell>
                  <TableCell align="center">{item.cliente.genero}</TableCell>
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">{item.valorAprobado}</TableCell>
                  <TableCell align="center">{item.diasPrestamo}</TableCell>
                  <TableCell align="center">{item.cliente.banco}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <ReactHTMLTableToExcel
          className={classes.boton}
          id="test-table-xls-button"
          table="tabla-desembolsados"
          filename="desembolsados"
          sheet="DESEMBOLSADOS"
          buttonText="Exportar a Excel"
        />
    </TableContainer>
  );
}
