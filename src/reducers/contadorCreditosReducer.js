import {
  VER_CONTADOR,
  VER_CONTADOR_EXITO,
  VER_CONTADOR_ERROR,
  EDITAR_CONTADOR_EXITO,
  OBTENER_CONTADOR_EDITAR
} from "../types";

const initialState = {
  error: false,
  loading: false,
  contador: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case VER_CONTADOR:
      return {
        ...state,
        loading: true,
      };
    case VER_CONTADOR_EXITO:    
      return {
        ...state,
        loading: false,
        contador: action.payload,
      };

    case EDITAR_CONTADOR_EXITO:      
      
      console.log("state.contador")
      console.log(state.contador)
      console.log(action.payload.id)
      console.log(state.contador.map((solicitud) =>
      solicitud.id === action.payload.id
        ? (solicitud = action.payload)
        : solicitud
    ),)
      return {
        ...state,
        contador: state.contador.map((solicitud) =>
          solicitud.id === action.payload.id
            ? (solicitud = action.payload)
            : solicitud
        ),
        
      };

    default:
      return state;
  }
}
