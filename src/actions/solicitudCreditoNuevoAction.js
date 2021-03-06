import {
  VER_CREDITOS_NUEVOS,
  VER_CREDITOS_NUEVOS_EXITO,
  VER_CREDITOS_NUEVOS_ERROR,
  OBTENER_CREDITO_EDITAR,
  COMENZAR_EDICION_CREDITO,
  CREDITO_EDITADO_EXITO,
  CREDITO_EDITADO_ERROR,
  VER_CREDITOS_GENERAL,
  VER_CREDITOS_GENERAL_EXITO,
  VER_CREDITOS_GENERAL_ERROR,
} from "../types";
import ClienteAxios from "../config/axios";
import Swal from "sweetalert2";

export function solicitudNuevos() {
  return async (dispatch) => {
    dispatch(solicitudCreditos());
    try {
      const respuesta = await ClienteAxios.get("/credito/solicitudes/nuevos");
      dispatch(cargaSolicitudesExito(respuesta.data.solicitudNuevos));
    } catch (error) {
      console.log(error);
      dispatch(cargaSolicitudesError(true));
    }
  };
}

const solicitudCreditos = () => ({
  type: VER_CREDITOS_NUEVOS,
});

const cargaSolicitudesExito = (respuesta) => ({
  type: VER_CREDITOS_NUEVOS_EXITO,
  payload: respuesta,
});

const cargaSolicitudesError = (estado) => ({
  type: VER_CREDITOS_NUEVOS_ERROR,
  payload: estado,
});

// Colocar producto en edición
export function obtenerCreditoEditar(credito) {
  return (dispatch) => {
    dispatch(obtenerCreditoAction(credito));
  };
}

const obtenerCreditoAction = (credito) => ({
  type: OBTENER_CREDITO_EDITAR,
  payload: credito,
});

// Edita un registro en la api y state
export function editarCreditoAction(credito) {
  console.log(credito.id);
  return async (dispatch) => {
    dispatch(editarCredito());
    try {
      const respuesta = await ClienteAxios.put(
        `/credito-admin/${credito.clienteId}`,
        credito
      );
      dispatch(editarCreditoExito(credito));
      Swal.fire("Aplicado!", respuesta.data.mensaje, "success");
    } catch (error) {
      console.log(error);
      console.log("salio mal");

      dispatch(editarCreditoError());
    }
  };
}

const editarCredito = () => ({
  type: COMENZAR_EDICION_CREDITO,
});

const editarCreditoExito = (credito) => ({
  type: CREDITO_EDITADO_EXITO,
  payload: credito,
});

const editarCreditoError = () => ({
  type: CREDITO_EDITADO_ERROR,
  payload: true,
});
