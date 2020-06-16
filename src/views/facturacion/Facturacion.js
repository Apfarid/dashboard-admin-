import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Filter from '../../components/Filter'

import { mainListItems, secondaryListItems } from '../../components/listItems';
import Chart from '../../components/Chart';
import Deposits from '../../components/Deposits';
import Orders from '../../components/Orders';

import DisplayViejos from '../../components/displayViejos/DisplayViejos';
import InformeFacturacion from '../../components/InformeFacturacion'



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    margin: '0 auto',
    position: 'relative'
  },
  fixedHeight: {
    height: 405,
  },
  fixedHeightDos: {
    height: 300,
  },
}));

export default function Facturacion() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const fixedHeightPaperDos = clsx(classes.paper, classes.fixedHeightDos);
  return (

        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Creditos Nuevos */}
            <Grid item xs={12} >

                <InformeFacturacion/>
  
            </Grid>
          </Grid>
        </Container>

  );
}