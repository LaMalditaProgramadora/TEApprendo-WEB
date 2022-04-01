import { Container,Typography,TextField, Table } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../components/Page";
import { Stack } from "@mui/material";
import { getChild } from "src/services/ChildService";
import { saveChild } from "src/utils/storage";
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableBody } from "@mui/material";
import Paper from '@mui/material/Paper';

export default function ChildProfile() {
  const navigate = useNavigate();
  const [child, setChild] = useState([]);
  const [symptoms, setSymptoms] = useState([]);

  const token = localStorage.getItem("token");
  const idChild = localStorage.getItem("idChild");

  const validateLogin = () => {
    if (!token || !idChild) {
      navigate("/login", { replace: true });
    } else {
    }
  };

  getChild().then(
    (data) => {
         setChild(data);
         saveChild(child);
         
    }
  );

  //Child
  const names = localStorage.getItem("names");
  const lastNames = localStorage.getItem("lastNames");
  const birthday = localStorage.getItem("birthday").substring(0,10);
  const gender = localStorage.getItem("gender");
  const asdLevel = localStorage.getItem("asdLevel");

  const getSymptomsfromApi = () => {
    getChild().then((data) => {
      setSymptoms(data.symptoms);
    });
  };

  useEffect(() => {
    validateLogin();
    getSymptomsfromApi();
  }, []);

  const tableStyle = {
    margin:"30px 0"
  }

  return (
    <Page title="TEApprendo | Kid Profile">
      <Container maxWidth="sm">
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Perfil del niño
            </Typography>
          </Stack>
          <Stack spacing={5}>
            <Stack 
              direction="row"
              spacing={4}>
              <TextField
                id="standard-read-only-input"
                label="Nombres"
                inputProps={
                  { readOnly: true, }
                } 
                defaultValue={names}
                variant="standard"
              />
              <TextField
                id="standard-read-only-input"
                label="Apellidos"
                inputProps={
                  { readOnly: true, }
                }
                defaultValue={lastNames}
                variant="standard"
              />
            </Stack>
            <Stack 
              direction="row"
              spacing={4}>
              <TextField
                id="standard-read-only-input"
                label="Fecha de cumpleaños"
                inputProps={
                  { readOnly: true, }
                }
                defaultValue={birthday}
                variant="standard"
              />
              <TextField
                id="standard-read-only-input"
                label="Sexo"
                inputProps={
                  { readOnly: true, }
                }
                defaultValue={gender}
                variant="standard"
              />
            </Stack>
            <Stack 
              direction="row"
              spacing={4}>
              <TextField
                id="standard-read-only-input"
                label="Nivel de TEA"
                inputProps={
                  { readOnly: true, }
                }
                defaultValue={asdLevel}
                variant="standard"
              />
            </Stack>
          </Stack>
          <TableContainer component={Paper} style={tableStyle}>
            <Typography variant="h6" gutterBottom>
              Síntomas
            </Typography>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ borderBottom: 1 }}>Id</TableCell>
                  <TableCell sx={{ borderBottom: 1 }}>Descripción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody >
                {symptoms.map((symptom,i) => (
                  <TableRow
                    key={"table" + i.toString()}
                  >
                    <TableCell component="th" scope="row">
                      {i+1}
                    </TableCell>
                    <TableCell>{symptom.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </Container>
      </Page>
  );
}
