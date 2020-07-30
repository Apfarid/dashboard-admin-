import React, { Fragment, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { uuid } from "uuidv4";
import NumberFormat from "react-number-format";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Divider from "@material-ui/core/Divider";

import Title from "../Title";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  solicitudNuevos,
  editarCreditoAction,
} from "../../actions/solicitudCreditoNuevoAction";
import { format } from "date-fns";

import { useHistory, Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  formateador,
  cobroPlataforma,
  cobroAdministracion,
  intereses,
} from "../../Helper";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { compromisosGeneral } from "../../actions/compromisosAction";
import PlantillaMorosos from "./PlantillaMorosos";
import Descuentos from "./Descuentos";
import PlanPagos from "./PlanPagos";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$ "
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
  },

  descuentos: {
    display: "flex",
    justifyContent: "center",
  },

  radio: {
    display: "flex",
    flexWrap: "wrap",
    alignContent: "center",
  },
  botones: {
    "& > *": {
      margin: theme.spacing(1),
    },
    display: "flex",
    justifyContent: "center",
  },

  boton: {
    borderRadius: 20,
  },
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
    width: 700,
  },
  modalForm: {
    width: "600px important!",
  },
  compromisos: {
    width: 700,
    margin: "0 auto",
  },
  label: {
    margin: "0 15px",
  },
}));

const Compromisos = (props) => {
  const classes = useStyles();
  const compromisosDispatch = useDispatch();

  const [credito, setCredito] = useState({});

  const solicitudEditable = useSelector(
    (state) => state.solicitudCreditosNuevos.creditoeditar[0]
  );

  const [plan, setPlan] = useState([]);

  const planPagos = useSelector((state) => state.Compromisos.acuerdos);

  //const planPagos = useSelector((state) => state.Compromisos.acuerdos.acuerdo);

  // const planPago = planPagos.filter((cliente) => {

  // })

  console.log(planPagos);

  useEffect(() => {
    compromisosDispatch(compromisosGeneral());
    setCredito(solicitudEditable);
    setPlan([planPagos]);
  }, [solicitudEditable]);

  const [descuentos, setDescuentos] = useState({
    plataforma: solicitudEditable.descuentoPlataforma,
    administracion: solicitudEditable.descuentoAdministracion,
  });

  return (
    <Fragment>
      <PlantillaMorosos solicitudEditable={solicitudEditable} />
      <Divider />
      <br />
      <br />

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Descuentos</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Descuentos solicitudEditable={solicitudEditable} />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Compromisos de Pagos
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <PlanPagos
            solicitudEditable={solicitudEditable}
            planPagos={planPagos}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Fragment>
  );
};

export default withRouter(Compromisos);
