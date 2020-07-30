import React, { Fragment, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";
import {
  solicitudNuevos,
  editarCreditoAction,
} from "../../actions/solicitudCreditoNuevoAction";
import Swal from "sweetalert2";
import {
  formateador,
  cobroPlataforma,
  cobroAdministracion,
  intereses,
} from "../../Helper";
import NumberFormat from "react-number-format";
import { set } from "date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
  },

  descuentos: {
    display: "flex",
    flexDirection: "row",
  },

  radio: {
    display: "flex",
    flexWrap: "wrap",
    alignContent: "center",
  },
  botones: {
    "& > *": {
      margin: theme.spacing(1),
      height: 40,
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
    width: "100%",
  },
  row: {
    width: "100%",
    margin: "0 auto",
    marginLeft: 50,
    marginRight: 70,
  },
  alert: {
    background: "rgb(255 254 229)",
    borderRadius: 5,
    height: 130,
    border: "1px solid rgb(204 204 204)!important",
  },
  alertBody: {
    margin: 10,
  },

  padding: {
    margin: 10,
    padding: 10,
  },

  marginButton: {
    marginBottom: 10,
    padding: 10,
  },
}));

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

const Descuentos = ({ history, solicitudEditable }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [descuentos, setDescuentos] = useState({
    plataforma: solicitudEditable.descuentoPlataforma,
    administracion: solicitudEditable.descuentoAdministracion,
  });

  const handleDescuentos = ({ target }) => {
    setDescuentos({
      ...descuentos,
      [target.name]: target.value,
    });
  };

  const aplicarDescuento = (e) => {
    const { diasPrestamo, valorAprobado } = solicitudEditable;
    let plataforma = cobroPlataforma(diasPrestamo);
    let administracion = cobroAdministracion(valorAprobado);

    e.preventDefault();
    let datos = {
      descuentoPlataforma:
        descuentos.plataforma === "" ? null : descuentos.plataforma,
      descuentoAdministracion:
        descuentos.administracion === "" ? null : descuentos.administracion,
      clienteId: solicitudEditable.clienteId,
      id: solicitudEditable.id,
    };

    console.log(plataforma);
    console.log(administracion);
    if (
      descuentos.plataforma >= plataforma ||
      descuentos.administracion >= administracion
    ) {
      Swal.fire({
        icon: "error",
        title:
          "El descuento no puede ser superior al valor inicialmente pactado.",
      });
      return;
    }
    dispatch(editarCreditoAction(datos));
    history.push("/");
  };
  return (
    <div className={classes.row}>
      <form className={classes.descuentos} onSubmit={aplicarDescuento}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              className={classes.label}
              label="Plataforma"
              name="plataforma"
              onChange={handleDescuentos}
              value={descuentos.plataforma}
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
              disabled={
                solicitudEditable.descuentoPlataforma !== null ? true : false
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.label}
              label="Administracion"
              name="administracion"
              onChange={handleDescuentos}
              value={descuentos.administracion}
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
              disabled={
                solicitudEditable.descuentoAdministracion !== null
                  ? true
                  : false
              }
            />
          </Grid>
          <Grid item xs={12} className={classes.botones}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.boton}
              disabled={
                solicitudEditable.descuentoAdministracion === null ||
                solicitudEditable.descuentoPlataforma === null
                  ? false
                  : true
              }
            >
              Aplicar
            </Button>
          </Grid>
        </Grid>
      </form>

      {(solicitudEditable.descuentoAdministracion !== null ||
        solicitudEditable.descuentoPlataforma !== null) && (
        <div className={classes.alertBody}>
          <div className={classes.alert}>
            <h5 className={classes.padding}>
              Descuentos aplicados anteriormente:
            </h5>
            <strong className={classes.padding}>Plataforma :</strong> ${" "}
            {solicitudEditable.descuentoPlataforma}
            <br />
            <strong className={classes.padding}>Administracion :</strong>${" "}
            {solicitudEditable.descuentoAdministracion}
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(Descuentos);
