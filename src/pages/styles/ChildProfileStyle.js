import { styled } from "@mui/material";
import {
  Container
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";

export const ContainerStyle = styled(Container)(({}) => ({
    marginTop: -95,
    marginLeft: 20,
    width:900
  }));

export const TableStyle = styled(TableContainer)(({}) => ({
    paddingLeft: 10,
  }));