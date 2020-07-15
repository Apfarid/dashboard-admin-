import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Link } from "react-router-dom";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ExposureIcon from "@material-ui/icons/Exposure";
import AssessmentIcon from "@material-ui/icons/Assessment";

import { makeStyles } from "@material-ui/core/styles";

import TimerOffIcon from "@material-ui/icons/TimerOff";
import FindReplaceIcon from "@material-ui/icons/FindReplace";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Inicio" />
    </ListItem>

    <ListItem button component={Link} to="/gestor-creditos-general">
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

    <ListItem button component={Link} to="/moratorios">
      <ListItemIcon>
        <TimerOffIcon />
      </ListItemIcon>
      <ListItemText primary="Para Acuerdos" />
    </ListItem>

    <ListItem button component={Link} to="/moratorios">
      <ListItemIcon>
        <FindReplaceIcon />
      </ListItemIcon>
      <ListItemText primary="Seguimiento Acuerdo" />
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
