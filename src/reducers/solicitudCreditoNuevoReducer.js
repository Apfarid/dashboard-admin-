import {
  VER_CREDITOS_NUEVOS,
  VER_CREDITOS_NUEVOS_EXITO,
  VER_CREDITOS_NUEVOS_ERROR,
  OBTENER_CREDITO_EDITAR,
  COMENZAR_EDICION_CREDITO,
  CREDITO_EDITADO_EXITO,
  CREDITO_EDITADO_ERROR,
} from "../types";

const initialState = {
  error: false,
  loading: false,
  solicitudes: [],
  cosa: null,
  creditoeditar: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case VER_CREDITOS_NUEVOS:
      return {
        ...state,
        loading: true,
      };
    case VER_CREDITOS_NUEVOS_EXITO:
      return {
        ...state,
        loading: false,
        creditoeditar: null,
        solicitudes: action.payload,
      };
    case VER_CREDITOS_NUEVOS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case OBTENER_CREDITO_EDITAR:
      return {
        ...state,
        creditoeditar: action.payload,
      };
    case CREDITO_EDITADO_EXITO:
      return {
        ...state,
        creditoeditar: null,
        solicitudes: state.solicitudes.map((solicitud) =>
          solicitud.id === action.payload.id
            ? (solicitud = action.payload)
            : solicitud
        ),
      };

    default:
      return state;
  }
}
