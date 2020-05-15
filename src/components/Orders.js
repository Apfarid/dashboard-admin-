import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date,consecutivo, name, shipTo, paymentMethod, amount) {
  return { id, date, consecutivo, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, 'c001', '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', '16 Mar, 2019', 312.44),

];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Historico Crédito Cédula: ##.###.###</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Consecutivo</TableCell>
            <TableCell>Fecha Realizado</TableCell>
            <TableCell>Fecha de Aprobacion</TableCell>
            <TableCell>Fecha de Cancelado</TableCell>
            <TableCell>Monto</TableCell>
            <TableCell>Monto Cancelado</TableCell>
            <TableCell>Plazo</TableCell>
            <TableCell align="center">Estado</TableCell>
          </TableRow>
        </TableHead>
   {     /*
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        */}
      </Table>
    </React.Fragment>
  );
}