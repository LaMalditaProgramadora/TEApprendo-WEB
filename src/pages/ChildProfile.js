import { Stack, TableBody, TextField, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
    const day = myDate[8] + myDate[9];
    const month = myDate[5] + myDate[6];
    const year = myDate[0] + myDate[1] + myDate[2] + myDate[3];
    return day + "/" + month + "/" + year;
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
    <Page title="TEApprendo | Perfil TEA">
      <ContainerStyle maxWidth="xl">
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h4">Perfil TEA</Typography>
        </Stack>
        <Stack spacing={5}>
          <Stack direction="row" spacing={4}>
            <TextField
              sx={{ width: 347 }}
              id="standard-read-only-input"
              label="Nombres"
              inputProps={{ readOnly: true }}
              value={child.names}
              variant="outlined"
            />
            <TextField
              sx={{ width: 347 }}
              id="standard-read-only-input"
              label="Apellidos"
              inputProps={{ readOnly: true }}
              value={child.lastNames}
              variant="outlined"
            />
          </Stack>
          <Stack direction="row" spacing={4}>
            <TextField
              id="standard-read-only-input"
              label="Fecha de cumpleaños"
              inputProps={{ readOnly: true }}
              value={convertDate(child.birthday.toString())}
              variant="outlined"
            />
            <TextField
              id="standard-read-only-input"
              label="Sexo"
              inputProps={{ readOnly: true }}
              value={child.gender === "M" ? "Masculino" : "Femenino"}
              variant="outlined"
            />
            <TextField
              id="standard-read-only-input"
              label="Nivel de TEA"
              inputProps={{ readOnly: true }}
              value={child.asdLevel}
              variant="outlined"
            />
          </Stack>
        </Stack>
        <TableContainer sx={{mt: 5, p:0}}>
          <TableStyle aria-label="simple table">
            <Typography variant="h6">Síntomas</Typography>
            <TableHead>
              <TableRow>
                <TableCell sx={{ borderBottom: 1 }}>Id</TableCell>
                <TableCell sx={{ borderBottom: 1 }}>Descripción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {child.symptoms.map((symptom, i) => (
                <TableRow key={"table" + i.toString()}>
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell>{symptom.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableStyle>
        </TableContainer>
      </ContainerStyle>
    </Page>
  );
}
