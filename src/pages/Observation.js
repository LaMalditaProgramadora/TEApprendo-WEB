import { Container,Typography,TextField, Table } from "@mui/material";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Page from "../components/Page";
import { Stack } from "@mui/material";
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableBody } from "@mui/material";
import Paper from '@mui/material/Paper';

export default function Observation(){
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const idChild = localStorage.getItem("idChild");

    const validateLogin = () => {
        if (!token || !idChild) {
          navigate("/login", { replace: true });
        } else {
        }
    };

    useEffect(() => {
        validateLogin();
      }, []);

    return (
        <Page title="TEApprendo | Kid Profile">
          <Container maxWidth="sm">
              <Stack sx={{ mb: 5 }}>
                <Typography variant="h4" gutterBottom>
                  Observaciones
                </Typography>
              </Stack>
              <Stack spacing={5}>
                
                
              </Stack>
          </Container>
          </Page>
      );
}