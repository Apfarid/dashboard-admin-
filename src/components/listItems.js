import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Link } from "react-router-dom";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ExposureIcon from "@material-ui/icons/Exposure";
import AssessmentIcon from '@material-ui/icons/Assessment';

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Inicio" />
    </ListItem>

    <ListItem button component={Link} to="/gestor-creditos">
      <ListItemIcon>
        <AttachMoneyIcon />
      </ListItemIcon>
      <ListItemText primary="Gestor de Creditos" />
    </ListItem>

    <ListItem button component={Link} to="/gestor-datos">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Gestor de Datos" />
    </ListItem>

    <ListItem button component={Link} to="/gestor-claves">
      <ListItemIcon>
        <VpnKeyIcon />
      </ListItemIcon>
      <ListItemText primary="Gestor de Claves" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>INFORMES</ListSubheader>

    <ListItem button component={Link} to="/informes">
      <ListItemIcon>
        <AssessmentIcon />
      </ListItemIcon>
      <ListItemText primary="Gestión" />
    </ListItem>

    <ListItem button component={Link} to="/facturacion">
      <ListItemIcon>
        <ExposureIcon />
      </ListItemIcon>
      <ListItemText primary="Facturacion" />
    </ListItem>
  </div>
);
