import { LoadingButton } from "@mui/lab";
import { Container, Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
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
    <Page title="TEApprendo | Observaciones">
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
            style={{ width: 150 }}
            onClick={() => {
              setOpenCreateObservation(true);
            }}
          >
            Registrar
          </LoadingButton>
        </Grid>
        <Grid container sx={{ display: 'block'}}>
          {observations.map((observation, i) => (
            <Grid key={i} item xs={12} md={5} lg={4}>
              <NoteCard note={observation} />
            </Grid>
          ))}
        </Grid>
        <br></br>
      </ContainerStyle>
    </Page>
  );
}
