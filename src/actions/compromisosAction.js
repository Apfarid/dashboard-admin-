import {
  CREAR_COMPROMISO,
  CREAR_COMPROMISO_EXITO,
  CREAR_COMPROMISO_ERROR,
  COMPROMISOS_GENERAL,
  COMPROMISOS_GENERAL_EXITO,
  COMPROMISOS_GENERAL_ERROR,
  CARGA_COMPROMISO_PARTICULAR,
  COMPROMISO_PARTICULAR_EXITO,
  COMPROMISO_PARTICULAR_ERROR,
} from "../types";
import ClienteAxios from "../config/axios";

export function crearCompromiso(informacion) {
  return async (dispatch) => {
    dispatch(CrearCompromiso());
    try {
      const respuesta = await ClienteAxios.post(
        `/credito/${informacion.idCliente}/acuerdo-pago/${informacion.id}`,
        informacion.acuerdo
      );
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

export function compromisosGeneral() {
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

export function compromisoParticular() {
  return async (dispatch) => {
    dispatch(inicioConsulta());
    try {
      const respuesta = await ClienteAxios.get(
        "/credito/:idCliente/acuerdoPago/:idCredito/:idAcuerdo"
      );
      dispatch(CompromisoParticularExito(respuesta));
    } catch (error) {
      console.log(error);
      dispatch(compromisoParticularError(true));
    }
  };
}

const inicioConsulta = () => ({
  type: CARGA_COMPROMISO_PARTICULAR,
});

const CompromisoParticularExito = (creditos) => ({
  type: COMPROMISO_PARTICULAR_EXITO,
  payload: creditos.data,
});

const compromisoParticularError = (error) => ({
  type: COMPROMISO_PARTICULAR_ERROR,
  payload: error,
});
