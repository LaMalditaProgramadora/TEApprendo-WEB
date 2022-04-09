import {
  Grid,
  Stack,
  TableBody,
  TextField,
  Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChild } from "src/services/ChildService";
import { getIdChild, getToken } from "src/services/StorageService";
import Page from "../components/Page";
import { ContainerStyle, TableStyle } from "./styles/ChildProfileStyle";

export default function ChildProfile() {
  const navigate = useNavigate();
  const [child, setChild] = useState({
    names: "",
    lastNames: "",
    birthday: "01/01/2000",
    gender: "",
    asdLevel: "",
    symptoms: [],
  });

  const validateLogin = () => {
    if (getToken() === undefined || getIdChild() === undefined) {
      navigate("/login", { replace: true });
    }
  };

  const convertDate = (myDate) => {
    const today = moment(new Date());
    const myNewDate = moment(new Date(myDate));
    const diff = moment.duration(today.diff(myNewDate)).asYears();
    return diff.toFixed(0);
  };

  const getChildFromApi = () => {
    getChild(getIdChild()).then((data) => {
      if (data) {
        setChild(data);
      }
    });
  };

  useEffect(() => {
    validateLogin();
    getChildFromApi();
    // eslint-disable-next-line
  }, []);

  return (
    <Page title="TEApprendo | Perfil TEA" sx={{ mr: 5 }}>
      <ContainerStyle maxWidth="xl">
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4">Perfil TEA</Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="standard-read-only-input"
                label="Nombres"
                inputProps={{ readOnly: true }}
                value={child.names}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="standard-read-only-input"
                label="Apellidos"
                inputProps={{ readOnly: true }}
                value={child.lastNames}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id="standard-read-only-input"
                label="Edad"
                inputProps={{ readOnly: true }}
                value={convertDate(child.birthday.toString())}
                variant="outlined"
                focused
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id="standard-read-only-input"
                label="Sexo"
                inputProps={{ readOnly: true }}
                value={child.gender === "M" ? "Masculino" : "Femenino"}
                variant="outlined"
                focused
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id="standard-read-only-input"
                label="Nivel de TEA"
                inputProps={{ readOnly: true }}
                value={child.asdLevel}
                variant="outlined"
                focused
              />
            </Grid>
          </Grid>
        </Box>
        <TableContainer sx={{ mt: 5, p: 0 }}>
          <TableStyle aria-label="simple table">
            <Typography variant="h6">Síntomas</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ borderBottom: 1 }}>Id</TableCell>
                  <TableCell sx={{ borderBottom: 1 }}>Descripción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {child.symptoms.map((symptom, i) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{symptom.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableStyle>
        </TableContainer>
      </ContainerStyle>
    </Page>
  );
}
