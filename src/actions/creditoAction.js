import {
  CREDITOS_GENERAL,
  CREDITOS_GENERAL_EXITO,
  CREDITOS_GENERAL_ERROR,
} from "../types";
import ClienteAxios from "../config/axios";

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
  type: CREDITOS_GENERAL,
});

const CreditosCargados = (creditos) => ({
  type: CREDITOS_GENERAL_EXITO,
  payload: creditos.data,
});

const ErrorCargaCreditos = (error) => ({
  type: CREDITOS_GENERAL_ERROR,
  payload: error,
});
