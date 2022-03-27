import { Box, Stack, Toolbar } from "@mui/material";
import PropTypes from "prop-types";
import Searchbar from "../layouts/dashboard/Searchbar";
import { RootStyle, ToolbarStyle } from "./styles/DashBoardNavBarStyle";

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ handleSearch }) {
  return (
    <RootStyle>
      <ToolbarStyle>
        <Searchbar handleSearch={handleSearch} />
        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        ></Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
