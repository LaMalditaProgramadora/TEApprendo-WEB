import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "src/layouts/dashboard/DashBoardNavbar";
import { getDashboardCategory } from "src/services/LevelRecordService";
import Page from "../components/Page";
import { AppCurrentVisits, AppWebsiteVisits } from "../sections/@dashboard/app";

export default function DashboardApp() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [infoCharts, setInfoCharts] = useState([]);

  const validateLogin = () => {
    const token = localStorage.getItem("token");
    const idChild = localStorage.getItem("idChild");
    const nameChild = localStorage.getItem("nameChild");
    if (!token || !idChild) {
      navigate("/login", { replace: true });
    } else {
      setTitle(nameChild);
    }
  };

  const handleSearch = (data) => {
    console.log(data);
    setInfoCharts(data);
  };

  const getDashboardCategoryFromApi = () => {
    getDashboardCategory().then((data) => {
      setInfoCharts(data);
    });
  };

  useEffect(() => {
    validateLogin();
    getDashboardCategoryFromApi();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <DashboardNavbar handleSearch={handleSearch}></DashboardNavbar>
      <Page title="TEApprendo | Dashboard">
        <Container maxWidth="xl">
          <Box sx={{ pb: 5 }}>
            <Typography variant="h4">{title}</Typography>
          </Box>
          {infoCharts.map((infoChart, i) => {
            return (
              <div key={"chartGrid" + i.toString()}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={8}>
                    <AppWebsiteVisits
                      key={"lineChart_" + i.toString()}
                      infoChart={infoChart}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <AppCurrentVisits
                      key={"pieChart_" + i.toString()}
                      infoChart={infoChart}
                    />
                  </Grid>
                </Grid>
                <br></br>
              </div>
            );
          })}
        </Container>
      </Page>
    </>
  );
}
