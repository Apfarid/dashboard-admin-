import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import clsx from "clsx";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import HelpIcon from "@material-ui/icons/Help";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import GestorCreditoNuevo from "../../components/GestorCreditoNuevo/GestorCreditoNuevo";
import GestorCreditoAntiguo from "../../components/GestorCreditoAntiguos/GestorCreditoAntiguos";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    margin: "0 auto",
    position: "relative",
  },
  fixedHeight: {
    height: 300,
  },
  fixedHeightDos: {
    height: 600,
  },
  tab: {
    margin: "0 auto",
  },
  onetab: {},
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaperDos = clsx(classes.paper, classes.fixedHeightDos);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Detalle Creditos */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper>
            <div className={classes.root}>
              <AppBar position="static" color="default">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="on"
                  indicatorColor="primary"
                  textColor="primary"
                  className={classes.tab}
                  aria-label="scrollable force tabs example"
                >
                  <Tab
                    className="onetab"
                    label="Solicitudes de Creditos Nuevos"
                    {...a11yProps(0)}
                  />

                  <Tab
                    className="onetab"
                    label="Solicitudes Clientes Antiguos"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <GestorCreditoNuevo />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <GestorCreditoAntiguo />
              </TabPanel>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
