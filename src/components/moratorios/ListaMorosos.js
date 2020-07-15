import React, { useState, Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import HistoryIcon from "@material-ui/icons/History";
import Helper, { formateador } from "../../Helper";
import InfoIcon from "@material-ui/icons/Info";
import { Link as Lino } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { obtenerCreditoEditar } from "../../actions/solicitudCreditoNuevoAction";
import { useDispatch, useSelector } from "react-redux";
import { format, differenceInCalendarDays, addDays, subDays } from "date-fns";
import { solicitudNuevos } from "../../actions/solicitudCreditoNuevoAction";


const hoy = format(new Date(), "yyyy-MM-dd");

const ListaRenovacion = () => {
  const history = useHistory(); // habilitar history para redirección
  const [clientes, setClientes] = useState();
  const dispatch = useDispatch();
  const solicitudesDispatch = useDispatch();

  useEffect(() => {
    setClientes(data);
    const solicitudesNuevas = () => solicitudesDispatch(solicitudNuevos());
    solicitudesNuevas();

  }, []);



  const creditosFiltrados = useSelector(
    (state) => state.solicitudCreditosNuevos.solicitudes
  );

  let creditosFiltrado = creditosFiltrados.filter(credito => {
    let diaLimite = addDays(new Date(credito.fechaDesembolsado), credito.diasPrestamo)
    let diasAtrasados = differenceInCalendarDays(new Date(diaLimite), new Date(hoy))
    return diasAtrasados < 0 
   }
  )

  let data = creditosFiltrado.map((dato) => {
    let diaLimite = addDays(new Date(dato.fechaDesembolsado), dato.diasPrestamo)
    let diasAtrasados = differenceInCalendarDays(new Date(hoy), new Date(diaLimite))
    let valor = dato?.valorAprobado || 0
    console.log(diasAtrasados)
    return {
      clienteId: dato.clienteId,
      id: dato.id,
      cedula: dato.cliente.cedula,
      nombre: dato.cliente.nombres + " " + dato.cliente.apellidos,
      valorAprobado: `$ ${formateador(valor)}`,
      mora: `${diasAtrasados} ${diasAtrasados > 1 ? "dias" : "día"}`
    };
  });

  const redireccionarEdicion = (solicitud) => {
    const credito = creditosFiltrado.filter(
      (credito) => credito.clienteId === solicitud
    );
    dispatch(obtenerCreditoEditar(credito));
    history.push(
      `/moratorios/${solicitud}`
    );
  };

  const columns = [
    {
      label: "Codigo",
      name: "clienteId",
      show: "hiddem",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      label: "Consecutivo",
      name: "id",
      options: {
        filter: true,
      },
    },

    {
      label: "Cedula",
      name: "cedula",
      options: {
        filter: true,
      },
    },
    {
      label: "Nombre",
      name: "nombre",
      options: {
        filter: true,
      },
    },
    {
      label: "Monto Aprobado",
      name: "valorAprobado",
      options: {
        filter: false,
      },
    },
   
    {
      label: "Días de Mora",
      name: "mora",
      options: {
        filter: false,
      },
    },
    {
      name: "Gestionar",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton
              aria-label="Editar"
              onClick={() => redireccionarEdicion(tableMeta.rowData[0])}
            >
              <EditIcon buttom aria-label="Editar" disabled color="primary" />
            </IconButton>
          );
        },
      },
    },

   
  ];

  const options = {
    filter: true,
    download: false,
    filterType: "dropdown",
    responsive: "scroll",
    print: false,
    page: 2,
    onColumnSortChange: (changedColumn, direction) =>
      console.log("changedColumn: ", changedColumn, "direction: ", direction),
    onChangeRowsPerPage: (numberOfRows) =>
      console.log("numberOfRows: ", numberOfRows),
    onChangePage: (currentPage) => console.log("currentPage: ", currentPage),
  };

  return (
    <MUIDataTable
      title={"Gestor creditos atrasados"}
      data={clientes}
      columns={columns}
      options={options}
    />
  );
};

export default ListaRenovacion;

