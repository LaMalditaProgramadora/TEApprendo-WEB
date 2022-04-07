import { Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { updateObservation } from "src/services/ObservationService";
import * as React from "react";

const UpdateObservationDialog = ({ observation, open, setOpen }) => {
  const [snackbar, setSnackbar] = React.useState({ open: false, message: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const obsAux = {
      idObservation: observation.idObservation,
      title: formData.get("title"),
      description: formData.get("description"),
    };

    if (formData.get("title") === "") {
      setSnackbar({ open: true, message: "El título es requerido" });
    } else if (formData.get("description") === "") {
      setSnackbar({ open: true, message: "La observación es requerida" });
    } 
    else {
      updateObservation(obsAux).then((data) => {
        setSnackbar({ open: true, message: "Actualización exitosa" });
        window.location.reload(false);
        setOpen(false);
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
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
        <DialogTitle>Modificar Observación</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="title"
            label="Nombre"
            type="title"
            fullWidth
            defaultValue={observation.title}
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
            defaultValue={observation.description}
            name="description"
            inputProps={{ maxLength: 1000 }}
          />
          <br></br>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit">Modificar</Button>
        </DialogActions>
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

export default UpdateObservationDialog;
