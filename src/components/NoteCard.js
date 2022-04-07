import {
  Container,
    Snackbar,
  } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import UpdateObservationDialog from 'src/layouts/dashboard/dialogs/updateObservationDialog';
import { removeObservation } from 'src/services/ObservationService';

export default function NoteCard({note}){
    const [snackbar, setSnackbar] = useState({ open: false, message: "" });
    const [updateObservation, setUpdateObservation] = useState({});
    const [openUpdateObservation, setOpenUpdateObservation] = useState(false);

    const removeObservationFromApi = (idObservation) => {
        removeObservation(idObservation).then((data) => {
            setSnackbar({ open: true, message: data.message });
            if (data.idResponse === 1) {
                window.location.reload(false);
            }
        });
    };

    return(
      <>
      <UpdateObservationDialog
        observation={updateObservation}
        open={openUpdateObservation}
        setOpen={setOpenUpdateObservation}
      ></UpdateObservationDialog>
      <br></br>
      <Card>
        <Container sx={{display: "flex"}}>
          <CardHeader
            title={note.title}
            sx={{mb:3}}
          />
          <CardActions>
            <EditIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                    setUpdateObservation(note);
                    setOpenUpdateObservation(true);
                }}
            />
            <DeleteIcon
                style={{ cursor: "pointer" }}
                onClick={() => removeObservationFromApi(note.idObservation)}
            />
          </CardActions>
        </Container>
        
        <CardContent>
        <Typography variant="body2" color="text.secondary">
          {note.description}
          </Typography>
        </CardContent>
        
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          message={snackbar.message}
          onClose={() => setSnackbar({ open: false, message: "" })}
        />
      </Card>
      </>
        
    )
}