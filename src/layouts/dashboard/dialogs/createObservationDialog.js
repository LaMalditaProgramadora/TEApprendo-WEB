import { Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { addObservation } from "src/services/ObservationService";
import * as React from "react";

const CreateObservationDialog = ({ open, setOpen }) => {
  const [snackbar, setSnackbar] = React.useState({ open: false, message: "" });

  const handleClose = () => {
    setOpen(false);
  };

  const addObservationFromApi = (observation) => {
    addObservation(observation).then((data) => {
      setSnackbar({ open: true, message: "Creando observación..." });
      window.location.reload(false);
      setOpen(false);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const observation = {
      description: formData.get("description"),
      idChild: localStorage.getItem("idChild"),
      title: formData.get("title"),
    };
    if (observation.title === "") {
      setSnackbar({ open: true, message: "El título es requerido" });
    } else if (observation.description === "") {
      setSnackbar({ open: true, message: "La observación es requerida" });
    } else {
      addObservationFromApi(observation);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth={true}
        component="form"
        onSubmit={handleSubmit}
      >
        <DialogTitle>Registrar observación</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="title"
            label="Título"
            type="title"
            fullWidth
            name="title"
          />
          <br></br>
          <br></br>
          <TextField
            margin="dense"
            id="description"
            label="Descripción"
            type="description"
            multiline
            rows={4}
            fullWidth
            name="description"
            inputProps={{ maxLength: 1000 }}
          />
          <br></br>
          <br></br>
          <DialogActions sx={{pr: 0}}>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button variant="contained" type="submit">
              Registrar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        message={snackbar.message}
        onClose={() => setSnackbar({ open: false, message: "" })}
      />
    </div>
  );
};

export default CreateObservationDialog;
