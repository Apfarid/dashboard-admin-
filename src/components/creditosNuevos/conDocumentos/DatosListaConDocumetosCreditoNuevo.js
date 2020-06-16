import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { formateador } from "../../../Helper";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { obtenerCreditoEditar } from "../../../actions/solicitudCreditoNuevoAction";

export default function (solicitud) {
    const dispatch = useDispatch();
    const history = useHistory(); // habilitar history para redirección

  const redireccionarEdicion = solicitud => {
    dispatch( obtenerCreditoEditar(solicitud) );
    console.log(solicitud);
    
    history.push(`/gestor-creditos/${solicitud.solicitud.clienteId}`)
    
}

  return (
    <TableRow>
      <TableCell align="center">{solicitud.solicitud.id}</TableCell>
      <TableCell align="center">
        {formateador(solicitud.solicitud.cliente.cedula)}
      </TableCell>
      <TableCell align="center">
        {solicitud.solicitud.cliente.nombres}
      </TableCell>
      <TableCell align="center">
        $ {formateador(solicitud.solicitud.valorSolicitado)}
      </TableCell>
      <TableCell align="center">
        <button
          type="button"
          onClick={() => redireccionarEdicion(solicitud)}
          className="btn btn-primary mr-2"
        >
          Editar
        </button>
      </TableCell>
    </TableRow>
  );
}
