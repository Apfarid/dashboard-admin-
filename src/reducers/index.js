import {combineReducers} from 'redux'
import contadorCreditosReducer from './contadorCreditosReducer'
import solicitudCreditosNuevosReducer from './solicitudCreditoNuevoReducer'
import clienteReducer from './clienteReducer'
import creditosReducer from './creditoReducer'
import compromisosReducer from './compromisoReducer'

export default combineReducers({
    numeroCreditos: contadorCreditosReducer,
    solicitudCreditosNuevos: solicitudCreditosNuevosReducer,
    Creditos: creditosReducer,
    Compromisos : compromisosReducer,
    cliente: clienteReducer,
})