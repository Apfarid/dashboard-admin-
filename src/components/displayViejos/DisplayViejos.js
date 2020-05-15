import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Grid, Divider } from "@material-ui/core";
import AssignmentTwoToneIcon from "@material-ui/icons/AssignmentTwoTone";
import AssignmentLateTwoToneIcon from "@material-ui/icons/AssignmentLateTwoTone";
import AssignmentTurnedInTwoToneIcon from "@material-ui/icons/AssignmentTurnedInTwoTone";
import AssignmentReturnedTwoToneIcon from '@material-ui/icons/AssignmentReturnedTwoTone';
import Container from "@material-ui/core/Container";
import Title from "../Title";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

  linkContainer: {
    display: "flex",
    justifyContent: "space-between",
    //width: 300,
    alignItems: "baseline",
  },

  concepto: {
    display: "flex",
  },
  icon: {},
  titleConcept: {},

  number: {},

  containerLink: {},

  row: {
    display: "flex",
    justifyContent:'flex-start',
    alignItems:'center',
    
  },
  solicitud: {
    borderRight: "1px solid red",
    paddingnRight: 50,
  },

  span: {},
  a: {
    display: "flex",
    justifyContent:'space-between',
    //background:'red',
    margin:9,
    width:'100%',
    alignItems:'center',
    fontSize:15,
    
  },

  span:{
    marginRight: 5,
    fontWeight: 'bold',
    fontSize:20,
    display:'flex',

  },

  icon:{
    fontSize: 40,
    marginLeft: 10
  },
  group:{
    display:'flex',
    alignItems:'center'
  }
});

export default function DisplayViejos() {
  const classes = useStyles();

  return (
    <Container>
      <Title>Créditos Viejos</Title>
      <Grid Container className={classes.box}>
        <div className={classes.row}>
          <Grid item xs={12}>
            <div className={classes.contenido}>
              <Link className={classes.a} underline={"none"} component="button">
                <div className={classes.group}>

                <AssignmentTwoToneIcon className={classes.icon} />
                <p>Solicitudes</p>
                </div>
                <span className={classes.span}>10</span>
              </Link>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Link className={classes.a} underline={"none"} component="button">
            <div className={classes.group}>
              <AssignmentLateTwoToneIcon className={classes.icon}/>
              <p>Atrazos</p>
              </div>
              <span className={classes.span}>10</span>
            </Link>
          </Grid>
        </div>
        <Divider/>
        <div className={classes.row}>
          <Grid item xs={12}>
            <div className={classes.contenido}>
              <Link className={classes.a} underline={"none"} component="button">
              <div className={classes.group}>
                <AssignmentTurnedInTwoToneIcon className={classes.icon}/>
                <p>
                  Pre-Aprobacion <br/>
                  sin Documentos
                </p>
                </div>
                <span className={classes.span}>10</span>
              </Link>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Link className={classes.a} underline={"none"} component="button">
            <div className={classes.group}>
              <AssignmentReturnedTwoToneIcon className={classes.icon}/>
              <p>
                  Pre-Aprobacion <br/>
                  con Documentos
                </p>
                </div>
              <span className={classes.span}>10</span>
            </Link>
          </Grid>
        </div>
      </Grid>
    </Container>
  );
}
