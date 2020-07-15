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


export default function FacturacionTabla({facturados}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table" id="tabla-facturacion">
        <TableHead>
          <TableRow>
          <TableCell align="right">Fecha de Pago</TableCell>
            <TableCell align="right">Cedula</TableCell>
            <TableCell align="right">Genero</TableCell>
            <TableCell align="right">Consecutivo Credito</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Apellido</TableCell>
            <TableCell align="right">Monto Aprobado</TableCell>
            <TableCell align="right">Plataforma Web</TableCell>
            <TableCell align="right">Administracion</TableCell>
            <TableCell align="right">Interes</TableCell>
            <TableCell align="right">Interes por Mora</TableCell>
            <TableCell align="right">Cobranza 1</TableCell>
            <TableCell align="right">Cobranza</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {facturados.length === 0
            ? "No hay Información"
            : facturados.map((item, index) => (
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
          table="tabla-facturacion"
          filename="facturacion"
          sheet="FACTURACION"
          buttonText="Exportar a Excel"
        />
    </TableContainer>
  );
}
