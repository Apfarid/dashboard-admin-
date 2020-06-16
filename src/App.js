import React from "react";

import { BrowserRouter as Router, Switch, Route  } from "react-router-dom";

import Home from "./views/home/Home";
import DetalleCreditoNuevo from "./views/gestorCreditos/DetalleCredito";
import GestorCreditoNuevo from "./views/gestorCreditos/GestorCreditos";
import GestorCreditoConDocumento from "./views/gestorCreditos/GestorCreditosConDocumentos"
import GestorCreditoAprobados from "./views/gestorCreditos/Aprobados"
import GestorCreditosGeneral from "./views/gestorCreditos/gestorGeneral/GestorCreditosGeneral"
import Sidebar from "./components/layout/Sideba";
import GestorDatosPersonales from "./views/gestorDatos/GestorDatos";
import InformacionPersonal from "./views/gestorDatos/InformacionPersonal";
import GestorCreditos from "./views/gestorCreditos/DetalleCredito";
import GestorCreditoSinDocumento from "./views/gestorCreditos/sinDocumentos/GestorCreditosSinDocumentos";
import GestorCreditoRenovacion from "./views/gestorCreditos/renovacion/GestorCreditosSinDocumentos";
import Detalle from "./views/gestorCreditos/DetalleTotal";
import DetalleAntiguo from "./components/GestorCreditoAntiguos/DetalleCreditoAntiguos";
import Historico from "./components/Orders";
import Informes from "./views/informes/VistaInformes";
import Claves from "./views/gestorClaves/GestorClavesV";
import Facturacion from "./views/facturacion/Facturacion";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import VistaConDocumentos from './views/gestorCreditos/VistaConDocumentos'
import VistaSinDocumentos from './views/gestorCreditos/sinDocumentos/VistaSinDocumentos'
import VistaRenovacion from './views/gestorCreditos/renovacion/VistaRenovacion'
import VistaDatos from './views/gestorDatos/GestorDatos'


import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#0074bc",
      },
      secondary: {
        main: "#ffde2e",
      },
      textSecondary: {
        main: "#4caf50",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Router >
        <Provider store={store}>
          <Sidebar>
            <Switch>              
              <Route exact path="/" component={Home} />
              <Route exact path="/gestor-nuevo-credito/solicitudes-nuevos"component={GestorCreditoNuevo}/>
              <Route exact path="/gestor-nuevo-credito/aprobados"component={GestorCreditoAprobados}/>
              <Route exact path="/gestor-datos" component={GestorDatosPersonales}/>
              
              <Route exact path="/gestor-creditos" component={Detalle} />
              <Route path="/gestor-creditos/:id" component={GestorCreditos}/>

              <Route exact path="/gestor-nuevo-credito/preaprobado-con-documentos"component={GestorCreditoConDocumento}/>
              <Route path="/gestor-nuevo-credito/preaprobado-con-documentos/:id" component={VistaConDocumentos}/>
              
              <Route exact path="/gestor-nuevo-credito/preaprobado-sin-documentos"component={GestorCreditoSinDocumento}/>
              <Route path="/gestor-nuevo-credito/preaprobado-sin-documentos/:id" component={VistaSinDocumentos}/>
  
              <Route exact path="/gestor-nuevo-credito/renovacion"component={GestorCreditoRenovacion}/>
              <Route path="/gestor-nuevo-credito/renovacion/:id" component={VistaRenovacion}/>

              <Route exact path="/gestor-creditos-general"component={GestorCreditosGeneral}/>
              
              
              <Route exact path="/informacion-personal/:id" component={InformacionPersonal}/>
              <Route exact path="/informacion-personal" component={VistaDatos}/>

              <Route exact path="/detalle" component={DetalleCreditoNuevo} />
              <Route exact path="/detalle-credito" component={DetalleAntiguo} />
              <Route exact path="/historico-cliente" component={Historico} />
              <Route exact path="/informes" component={Informes} />
              <Route exact path="/gestor-claves" component={Claves} />
              <Route exact path="/facturacion" component={Facturacion} />
            </Switch>
          </Sidebar>
        </Provider>
      </Router>
    </ThemeProvider>
  );
};
export default App;
