import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import { Grid } from "@mui/material"; 
import Page from "../components/Page";
import { Container,Typography} from "@mui/material";
import { getObservation } from "src/services/ObservationService";
import NoteCard from "src/components/NoteCard";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CreateObservationDialog from "src/layouts/dashboard/dialogs/createObservationDialog";

export default function Observation(){
  const navigate = useNavigate();
  const [observations, setObservations] = useState([]);
  const [openCreateObservation, setOpenCreateObservation] = useState(false);

  const token = localStorage.getItem("token");
  const idChild = localStorage.getItem("idChild");

  const getObservationsfromApi = () =>{
    getObservation().then((data) => {
      setObservations(data)
    });
  };

  const validateLogin = () => {
    if (!token || !idChild) {
        navigate("/login", { replace: true });
    } else {
    }
  };

  useEffect(() => {
        validateLogin();
        getObservationsfromApi();
  }, []);

  return (
      <Page title="TEApprendo | Kid Profile">
        <Container maxWidth="md">
          <Stack sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              Observaciones
            </Typography>
          </Stack>
          <CreateObservationDialog
            open={openCreateObservation}
            setOpen={setOpenCreateObservation}
          ></CreateObservationDialog>
          <Grid>
            <AddTaskIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpenCreateObservation(true);
              }}
            /> 
          </Grid>
          <Grid container >
              {observations.map((observation,i) => (
                <Grid key={i} item xs={12} md={5} lg={4}>
                  <NoteCard 
                    note = {observation}
                  />
                </Grid> 
              ))}
          </Grid>
          <br></br>
        </Container>
      </Page>
    );
}