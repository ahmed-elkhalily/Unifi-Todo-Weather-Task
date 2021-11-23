import { useEffect, useState } from "react";
import { getCurrentWeather, getNextFiveWeather } from "../helpers/weather";
import { Container, Grid, Box, Typography, Paper } from "@mui/material";

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState("loading...");
  const [nextFiveWeather, setNextFiveWeather] = useState("loading...");

  const apiKey = "4b4bb8a4a063f542e917df3942d7466b";
  const date = new Date();
  const today = date.toUTCString();
  const after5Days = new Date(date.setDate(date.getDate() + 5)).toUTCString();
  useEffect(() => {
    getCurrentUserLocation();
  }, []);

  function getCurrentUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        getNextFiveWeather(lat, long, apiKey, setNextFiveWeather);
        getCurrentWeather(lat, long, apiKey, setCurrentWeather);
      });
    }
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Paper
            elevation={3}
            style={{
              minHeight: "150px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="h3">{currentWeather}</Typography>
              <Typography color="primary">{today}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Paper
            elevation={3}
            style={{
              minHeight: "150px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="h3">{nextFiveWeather}</Typography>
              <Typography color="primary">{after5Days}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Weather;
