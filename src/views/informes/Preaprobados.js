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

export default function SimpleTable({preAprobados}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table" id="tabla-preAprobados">
        <TableHead>
          <TableRow align="right">
          <TableCell>Fecha de Pre-Aprobacion</TableCell>
            <TableCell align="right">Cedula</TableCell>
            <TableCell align="right">Genero</TableCell>
            <TableCell align="right">Consecutivo Credito</TableCell>
            <TableCell align="right">Monto Solicitado</TableCell>
            <TableCell align="right">Cupo</TableCell>
            <TableCell align="right">Se Solicito Documento</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {preAprobados.length === 0
            ? "No hay Información"
            : preAprobados.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell align="center">{item.fechaPreaprobado}</TableCell>
                  <TableCell align="center">{item.cliente.cedula}</TableCell>
                  <TableCell align="center">{item.cliente.genero}</TableCell>
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">{item.valorSolicitado}</TableCell>
                  <TableCell align="center">{item.valorAprobado}</TableCell>
                  <TableCell align="center">{item.solicitarDocumentos ? "Sí" : "No"}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <ReactHTMLTableToExcel
          className={classes.boton}
          id="test-table-xls-button"
          table="tabla-preAprobados"
          filename="pre-aprobados"
          sheet="PRE_APROBADOS"
          buttonText="Exportar a Excel"
        />
    </TableContainer>
  );
}
