import {
  CREDITOS_GENERAL,
  CREDITOS_GENERAL_EXITO,
  CREDITOS_GENERAL_ERROR,
} from "../types";

const initialState = {
  loading: null,
  creditosGenerales: [],
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREDITOS_GENERAL:
      return {
        ...state,
        loading: true,
      };
    case CREDITOS_GENERAL_EXITO:
      return {
        ...state,
        loading: false,
        creditosGenerales: action.payload,
      };

    case CREDITOS_GENERAL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
