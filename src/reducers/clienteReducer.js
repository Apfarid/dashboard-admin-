import {
  VER_CLIENTES,
  VER_CLIENTES_EXITO,
  VER_CLIENTES_ERROR,
  OBTENER_CLIENTE_EDITAR,
  COMENZAR_EDICION_CLIENTE,

  CLIENTE_EDITADO_EXITO,
  CLIENTE_EDITADO_ERROR,
} from "../types";

const initialState = {
  error: false,
  loading: false,
  clientes: {},
  clienteeditar: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case VER_CLIENTES:
      return {
        ...state,
        loading: true,
      };
    case VER_CLIENTES_EXITO:
      return {
        ...state,
        loading: false,
        clienteeditar: null,
        clientes: action.payload,
      };
    case VER_CLIENTES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case OBTENER_CLIENTE_EDITAR:
      return {
        ...state,
        clienteeditar: action.payload,
      };
    case COMENZAR_EDICION_CLIENTE:
      return {
        ...state,
        clienteeditar: null,
        clientes: state.clientes.map((solicitud) =>
          solicitud.id === action.payload.id
            ? (solicitud = action.payload)
            : solicitud
        ),
      };

    default:
      return state;
  }
}
