import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from './views/home/Home'
import GestorCreditoNuevo from './views/gestorCreditos/GestorCreditos'
import DetalleCreditoNuevo from './views/gestorCreditos/DetalleCredito'

import Sidebar from "./components/layout/Sideba";
import GestorDatosPersonales from "./views/gestorDatos/GestorDatos";
import InformacionPersonal from './views/gestorDatos/InformacionPersonal'
import GestorCreditos from './views/gestorCreditos/DetalleCredito'
import Detalle from './views/gestorCreditos/DetalleTotal'
import DetalleAntiguo from './components/GestorCreditoAntiguos/DetalleCreditoAntiguos'
import Historico from './components/Orders'
import Informes from './views/informes/VistaInformes'
import Claves from './views/gestorClaves/GestorClavesV'

const App = () => {
  return (
    <Router>
      <Sidebar>
        <Switch>
        <Route exact path="/" component = {Home}/>
        <Route exact path="/gestor-nuevo-credito" component = {GestorCreditoNuevo}/>
        <Route exact path="/gestor-datos" component = {GestorDatosPersonales}/>
        <Route exact path="/gestor-creditos/:id" component = {GestorCreditos}/>
        <Route exact path="/gestor-creditos" component = {Detalle}/>

        <Route exact path="/detalle" component = {DetalleCreditoNuevo}/>
        <Route exact path="/informacion-personal" component = {InformacionPersonal}/>
        <Route exact path="/detalle-credito" component = {DetalleAntiguo}/>
        <Route exact path="/historico-cliente" component = {Historico}/>
        <Route exact path="/informes" component = {Informes}/>
        <Route exact path="/gestor-claves" component = {Claves}/>
        


        </Switch>
      </Sidebar>
    </Router>
  );
};
export default App;
