import {combineReducers} from 'redux'
import contadorCreditosReducer from './contadorCreditosReducer'
import solicitudCreditosNuevosReducer from './solicitudCreditoNuevoReducer'
import clienteReducer from './clienteReducer'

export default combineReducers({
    numeroCreditos: contadorCreditosReducer,
    solicitudCreditosNuevos: solicitudCreditosNuevosReducer,
    cliente: clienteReducer
})