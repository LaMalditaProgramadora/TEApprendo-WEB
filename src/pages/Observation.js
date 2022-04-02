import { LoadingButton } from "@mui/lab";
import { Container, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteCard from "src/components/NoteCard";
import CreateObservationDialog from "src/layouts/dashboard/dialogs/createObservationDialog";
import { getObservation } from "src/services/ObservationService";
import { getIdChild, getToken } from "src/services/StorageService";
import Page from "../components/Page";

export default function Observation() {
  const navigate = useNavigate();
  const [observations, setObservations] = useState([]);
  const [openCreateObservation, setOpenCreateObservation] = useState(false);

  const getObservationsfromApi = () => {
    getObservation(getIdChild()).then((data) => {
      setObservations(data);
    });
  };

  const validateLogin = () => {
    if (getToken() === undefined || getIdChild() === undefined) {
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    validateLogin();
    getObservationsfromApi();
    // eslint-disable-next-line
  }, []);

  return (
    <Page title="TEApprendo | Kid Profile">
      <Container maxWidth="xl">
        <Stack sx={{ mb: 4 }}>
          <Typography variant="h4">Observaciones</Typography>
        </Stack>
        <CreateObservationDialog
          open={openCreateObservation}
          setOpen={setOpenCreateObservation}
        ></CreateObservationDialog>
        <Grid>
          <LoadingButton
            variant="contained"
            loading={false}
            style={{ width: 150 }}
            onClick={() => {
              setOpenCreateObservation(true);
            }}
          >
            Agregar
          </LoadingButton>
        </Grid>
        <Grid container>
          {observations.map((observation, i) => (
            <Grid key={i} item xs={12} md={5} lg={4}>
              <NoteCard note={observation} />
            </Grid>
          ))}
        </Grid>
        <br></br>
      </Container>
    </Page>
  );
}
