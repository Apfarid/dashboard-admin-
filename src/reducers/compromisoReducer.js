import {
  CREAR_COMPROMISO,
  CREAR_COMPROMISO_EXITO,
  CREAR_COMPROMISO_ERROR,

  COMPROMISOS_GENERAL,
  COMPROMISOS_GENERAL_EXITO,
  COMPROMISOS_GENERAL_ERROR,
} from "../types";

const initialState = {
  loading: null,
  acuerdos: [],
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREAR_COMPROMISO:
      return {
        ...state,
        loading: true,
      };
    case CREAR_COMPROMISO_EXITO:
      return {
        ...state,
        loading: false,
        acuerdos: action.payload,
      };

    case COMPROMISOS_GENERAL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
