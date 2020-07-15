import {
  VER_CLIENTES,
  VER_CLIENTES_EXITO,
  VER_CLIENTES_ERROR,
  OBTENER_CLIENTE_EDITAR,
  COMENZAR_EDICION_CLIENTE,
  CLIENTE_EDITADO_EXITO,
  EDICION_CLIENTE_EXITO,
  CLIENTE_EDITADO_ERROR,
} from "../types";

import ClienteAxios from "../config/axios";

export function cargaCliente() {
 
  return async (dispatch) => {
    dispatch(clienteInfor());
    try {
      const respuesta = await ClienteAxios.get("/clientes-admin");
      dispatch(cargarInformacionCliente(respuesta.data));

      
    } catch (error) {
      console.log(error);
      dispatch(CargaInformacionError(true));
    }
  };
}

const clienteInfor = () => ({
  type: VER_CLIENTES,
});

const cargarInformacionCliente = (respuesta) => ({
  type: VER_CLIENTES_EXITO,
  payload: respuesta,
});

const CargaInformacionError = (estado) => ({
  type: VER_CLIENTES_ERROR,
  payload: estado,
});

// Colocar producto en edición
export function obtenerInformacionEditar(cliente) {
  return (dispatch) => {
    dispatch(obtenerInformacionAction(cliente));
  };
}

const obtenerInformacionAction = (cliente) => ({
  type: OBTENER_CLIENTE_EDITAR,
  payload: cliente,
});

// Edita un registro en la api y state
export function editarInformacionAction(cliente) {
  console.log(cliente.id)
  return async (dispatch) => {
    console.log(cliente)
    try {
      await ClienteAxios.put(`/clientes-admin/${cliente.id}`, cliente);
      dispatch(editarInfoExito(cliente));
    } catch (error) {
      console.log(error);
      console.log("salio mal");

      dispatch(editarInfoError());
    }
  };
}

const editarInformacion = () => ({
  type: COMENZAR_EDICION_CLIENTE,
});

const editarInfoExito = (credito) => ({
  type: EDICION_CLIENTE_EXITO,
  payload: credito,
});

const editarInfoError = () => ({
  type: CLIENTE_EDITADO_ERROR,
  payload: true,
});
