import { LoadingButton } from "@mui/lab";
import { Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteCard from "src/components/NoteCard";
import CreateObservationDialog from "src/layouts/dashboard/dialogs/createObservationDialog";
import { getObservation } from "src/services/ObservationService";
import { getIdChild, getToken } from "src/services/StorageService";
import Page from "../components/Page";
import { ContainerStyle } from "./styles/ObservationStyle";

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
    <Page title="TEApprendo | Observaciones" sx={{ mr: 5 }}>
      <ContainerStyle maxWidth="xl">
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
            onClick={() => {
              setOpenCreateObservation(true);
            }}
          >
            Registrar Observación
          </LoadingButton>
        </Grid>
        <Grid container sx={{ display: "block" }}>
          {observations.length === 0 ? (
            <Typography sx={{ mt: 3 }}>
              No se registraron observaciones.
            </Typography>
          ) : (
            observations.map((observation, i) => (
              <Grid key={i} item>
                <NoteCard note={observation} />
              </Grid>
            ))
          )}
        </Grid>
        <br></br>
      </ContainerStyle>
    </Page>
  );
}
