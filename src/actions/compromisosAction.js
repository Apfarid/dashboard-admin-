import {
  CREAR_COMPROMISO,
  CREAR_COMPROMISO_EXITO,
  CREAR_COMPROMISO_ERROR,

  COMPROMISOS_GENERAL,
  COMPROMISOS_GENERAL_EXITO,
  COMPROMISOS_GENERAL_ERROR,
} from "../types";
import ClienteAxios from "../config/axios";

export function crearCompromiso(informacion) {
  return async (dispatch) => {
    dispatch(CrearCompromiso());
    try {
      const respuesta = await ClienteAxios.post(`/credito/${informacion.idCliente}/acuerdo-pago/${informacion.id}`, informacion.acuerdo);
      dispatch(CompromisoCreado(informacion));
    } catch (error) {
      console.log(error);
      dispatch(ErrorCompromiso(true));
    }
  };
}

const CrearCompromiso = () => ({
  type: CREAR_COMPROMISO,
});

const CompromisoCreado = (creditos) => ({
  type: CREAR_COMPROMISO_EXITO,
  payload: creditos,
});

const ErrorCompromiso = (error) => ({
  type: CREAR_COMPROMISO_ERROR,
  payload: error,
});


export function creditosGeneral() {
  return async (dispatch) => {
    dispatch(CargaCreditosG());
    try {
      const respuesta = await ClienteAxios.get("/credito/generales");
      dispatch(CreditosCargados(respuesta));
    } catch (error) {
      console.log(error);
      dispatch(ErrorCargaCreditos(true));
    }
  };
}

const CargaCreditosG = () => ({
  type: COMPROMISOS_GENERAL,
});

const CreditosCargados = (creditos) => ({
  type: COMPROMISOS_GENERAL_EXITO,
  payload: creditos.data,
});

const ErrorCargaCreditos = (error) => ({
  type: COMPROMISOS_GENERAL_ERROR,
  payload: error,
});
