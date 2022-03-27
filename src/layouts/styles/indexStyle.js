import { styled } from "@mui/material/styles";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

export const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

export const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 60,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    addingTop: APP_BAR_DESKTOP + 60,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));