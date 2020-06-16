import {combineReducers} from 'redux'
import contadorCreditosReducer from './contadorCreditosReducer'
import solicitudCreditosNuevosReducer from './solicitudCreditoNuevoReducer'

export default combineReducers({
    numeroCreditos: contadorCreditosReducer,
    solicitudCreditosNuevos: solicitudCreditosNuevosReducer
})