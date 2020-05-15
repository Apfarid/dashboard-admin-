import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import IconButton from "@material-ui/core/IconButton";
import TextField from '@material-ui/core/TextField';
import { uuid } from "uuidv4";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  IconButton:{
    bottom: 150,
    left: -39,
    width:20,
    height: 20,
    right: 41,
    position:'relative'
  },

}));

export default function TransitionsModal() {

    const [Pagos, setPagos] = useState([]);
    
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };








  const point = { address: "", time: "", id: "1" };

  const [pickUpPointState, setPickUpPoint] = useState([{ ...point }]);
  
  const handlePointChange = (e) => {
    const updatedPoints = [...pickUpPointState];
    updatedPoints[e.target.dataset.idx][e.target.className] = e.target.value;
    setPickUpPoint(updatedPoints);
  };
  const handleinputsPickUpPointDelete = (id) => {
    const updatePoints = pickUpPointState.filter((trip) => trip.id !== id);
    setPickUpPoint(updatePoints);
    setTrip({
      ...trip,
      error: false,
      stateBottom: false,
    });
  };
  const [trip, setTrip] = useState({
    aguacatala: false,
    millaO: false,
    timeTrip: "",
    destination: "",
    abbreviation: "",
    pickupPoint: [],
    error: false,
    stateBottom: false,
    selectedDate: new Date(),
    selectedTime: new Date(),
    vehicle: "",
    seat: "",
  });

  const addPoint = () => {

    point.id = uuid();
    setPickUpPoint([...pickUpPointState, { ...point }]);
  };

  
  return (
    <div>
<Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<EventAvailableIcon />}
        onClick={handleOpen}
      >
        Programacion de Pagos
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Compromiso de Pagos</h2>
            <form>
            
            {pickUpPointState.map((val, idx) => {
              const addressId = `address-${idx}`;
              const timeId = `time-${idx}`;
              const buttonId = `button-${idx}`;


              return (
                <div
                  className="inputsPickUpPoints"
                  key={`point-${idx}`}
                  id={idx}
                >
                  



                  <TextField
                        id="date"
                        label="Fecha de Pago"
                        type="date"
                        defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />

<br/>
<br/>
                   <TextField        
                   label="Monto" 
                   variant="outlined" 
                   type="text"
                   name={addressId}
                   required
                   placeholder="Monto"
                   data-idx={idx}
                   id={addressId}
                   className="address"
                   value={pickUpPointState[idx].address}
                   onChange={handlePointChange}
                   />
                   <br/>
<br/>
                   <TextField        
                   label="Observaciones" 
                   variant="outlined" 
                   type="text"
                   name={addressId}
                   required
                   placeholder="Notas"
                   data-idx={idx}
                   id={addressId}
                   className="address"
                   value={pickUpPointState[idx].address}
                   onChange={handlePointChange}
                   />
               
            
               <br/>
               <br/>
     

                 
                  
                  {pickUpPointState.length > 1 && (
                    <div className={classes.IconButton} id={buttonId}>
                      {buttonId !== "button-0" && (
                        <IconButton
                          onClick={() =>
                            handleinputsPickUpPointDelete(
                              pickUpPointState[idx].id
                            )
                          }
                        >
                          <HighlightOffIcon />
                        </IconButton>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            <Button
              className={classes.buttomAdd}
 
              onClick={addPoint}
              startIcon={<AddCircleOutlineIcon />}
            >
              Agregar Compromiso
            </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
