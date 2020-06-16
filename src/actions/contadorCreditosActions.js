import {
  VER_CONTADOR,
  VER_CONTADOR_EXITO,
  VER_CONTADOR_ERROR,
  EDITAR_CONTADOR_EXITO,
  OBTENER_CONTADOR_EDITAR,
  VER_FIRMA
} from "../types";
import ClienteAxios from "../config/axios";

export function cargaFirma() {
  return async (dispatch) => {
    dispatch(cargaCreditos());
    try {
      const respuestaContador = await ClienteAxios.get("/firmas");
      dispatch(cargaExitoContador(respuestaContador.data.creditos));
      console.log("entre");
      
    } catch (error) {
      console.log(error);
      dispatch(cargaError(true));
    }
  };
}

const cargaCreditos = () => ({
  type: VER_CONTADOR,
});

const cargaExitoContador = (respuestaContador) => ({
  type: VER_CONTADOR_EXITO,
  payload: respuestaContador,
});

const cargaError = (estado) => ({
  type: VER_CONTADOR_ERROR,
  payload: estado,
});

export function editarPanel(credito) {
  console.log(credito);
  
  return (dispatch) => {
    dispatch(actualizacionPanel(credito));
  };
}

const actualizacionPanel = (credito) => ({
  type: EDITAR_CONTADOR_EXITO,
  payload: credito,
});
