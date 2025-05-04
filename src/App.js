import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  GlobalStyles,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";
import { changeCity, fetchWeather } from "./weatherSlice";
import { changeBackGround ,changeLanguage} from "./weatherSlice";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";



function App() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const cityName = useSelector((state) => {
    return state.weather.result;
  });

  const isLoading = useSelector((state) => {
    return state.weather.isLoading;
  });

  const weather = useSelector((state) => {
    return state.weather.weather;
  });

  const backGroundCity = useSelector((state) => {
    return state.weather.backgCity;
  });


  const language = useSelector((state) =>{
       return state.weather.language
  })

  function handelTrans() {
  
    if (language === "en") {
      moment.locale("ar");
      i18n.changeLanguage("ar");
      dispatch(changeLanguage("ar"))
    } else {
      moment.locale("en");
      i18n.changeLanguage("en");
      dispatch(changeLanguage("en"))
    }
  }

  function languageSelect() {
    return language === "ar" ? "English" : "العربية";
  }

  function cityNameHandler(event) {
    const nameCity = event.target.value;
    dispatch(changeCity({ nameCity }));
  }

  useEffect(() => {
    dispatch(fetchWeather({ cityName }));
  }, [cityName]);

  return (
    <>
      <GlobalStyles
        styles={{
          "@import":
            "url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap')",
          "@keyframes fadeIn": {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
          body: {
            margin: 0,
            fontFamily: "'Poppins', sans-serif",
            color: "#1e293b",
          },
        }}
      />

      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Box
          key={backGroundCity}
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('${backGroundCity}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: -1,
            animation: "fadeIn 1s ease-in-out",
          }}
        />

        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 3,
            pt: 10,
          }}
        >
          <Box
            sx={{
              mb: 2,
              width: 180,
              backgroundColor: "rgba(255, 255, 255, 0.25)",
              backdropFilter: "blur(15px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              px: 2,
              py: 1,
            }}
          >
            <Select
              fullWidth
              variant="standard"
              disableUnderline
              value={cityName}
              onChange={cityNameHandler}
              sx={{
                fontWeight: "bold",
                color: "#1e293b",
              }}
            >
              <MenuItem
                onClick={() => {
                  dispatch(
                    changeBackGround(
                      "https://www.aljazeera.com/wp-content/uploads/2025/02/image-1738850613.jpg?resize=1800%2C1080&quality=80"
                    )
                  );
                }}
                value="gaza,ps"
              >
                {t("Gaza")}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(
                    changeBackGround(
                      "https://images.unsplash.com/photo-1627734633024-867b54f26e1f?q=80&w=1932&auto=format&fit=crop"
                    )
                  );
                }}
                value="amman,jo"
              >
                {t("Amman")}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(
                    changeBackGround(
                      "https://images.unsplash.com/photo-1713252883649-340c3802390e?q=80&w=1945&auto=format&fit=crop"
                    )
                  );
                }}
                value="damascus,sy"
              >
                {t("Damascus")}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(
                    changeBackGround(
                      "https://images.unsplash.com/photo-1539768942893-daf53e448371?q=80&w=2071&auto=format&fit=crop"
                    )
                  );
                }}
                value="cairo,eg"
              >
                {t("Cairo")}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(
                    changeBackGround(
                      "https://images.unsplash.com/photo-1632854269541-dfff1eb1646f?q=80&w=2055&auto=format&fit=crop"
                    )
                  );
                }}
                value="beirut,lb"
              >
                {t("Beirut")}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(
                    changeBackGround(
                      "https://c0.wallpaperflare.com/preview/825/272/872/abu-dhabi-mosque-religion-minaret.jpg"
                    )
                  );
                }}
                value="Makkah al Mukarramah,sa"
              >
                {t("Makkah al Mukarramah")}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(
                    changeBackGround(
                      "https://www.planetware.com/photos-large/MAR/morocco-rabat-new-city-main-avenue.jpg"
                    )
                  );
                }}
                value="rabat,ma"
              >
                {t("Rabat")}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(
                    changeBackGround(
                      "https://www.airpano.com/photogallery/images_1550/90_581525_RussiaAkhmadKadyrovMosqueGrozny.jpg"
                    )
                  );
                }}
                value="grozny,ru"
              >
                {t("Grozny")}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(
                    changeBackGround(
                      "https://cdn.pixabay.com/photo/2017/02/24/00/11/bridge-2093540_1280.jpg"
                    )
                  );
                }}
                value="istanbul,tr"
              >
                {t("Istanbul")}
              </MenuItem>
            </Select>
          </Box>

          <Card
            sx={{
              width: 360,
              borderRadius: 5,
              backgroundColor: "rgba(255, 255, 255, 0.25)",
              backdropFilter: "blur(15px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
              overflow: "hidden",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.03)",
              },
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                py: 5,
              }}
            >
              <Box sx={{ textAlign: "right" }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: "#1f2937",
                    fontSize: "2rem",
                    direction: "rtl",
                  }}
                >
                  {t(weather.city)}
                  
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#64748b",
                    fontSize: "0.875rem",
                  }}
                >
                  {moment().format("MMMM Do YYYY")}
                </Typography>
              </Box>

              <Box
                sx={{
                  width: "60%",
                  height: "1px",
                  background:
                    "linear-gradient(to right, transparent, #ccc, transparent)",
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    color: "#222",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  {weather.temp}
                  <Typography
                    component="span"
                    sx={{ fontSize: "1.5rem", ml: 0.3, mt: 1 }}
                  >
                    °C
                  </Typography>
                </Typography>

                <Box
                  component="img"
                  src={weather.icon}
                  alt={weather.description}
                  sx={{ width: 70, height: 70 }}
                />
                {isLoading ? <CircularProgress /> : ""}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <CloudIcon
                  sx={{
                    fontSize: 70,
                    color: "#60a5fa",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{ color: "#475569", fontWeight: 500 }}
                >
                  {t(weather.description)}
                 
                </Typography>
              </Box>

              <Box
                sx={{
                  width: "60%",
                  height: "1px",
                  background:
                    "linear-gradient(to right, transparent, #ccc, transparent)",
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  px: 4,
                  mt: 2,
                }}
              >
                <Typography sx={{ color: "#0284c7", fontWeight: "600" }}>
                  ⬇️ {weather.tempMin}°C
                </Typography>
                <Typography sx={{ color: "#dc2626", fontWeight: "600" }}>
                  ⬆️ {weather.tempMax}°C
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "70px",
                height: "20px",
                backgroundColor: "rgba(255, 255, 255, 0.25)",
                backdropFilter: "blur(15px)",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                p: 1.5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Button
                variant="text"
                onClick={handelTrans}
                sx={{
                  fontWeight: "bold",
                  color: "#1e293b",
                }}
              >
                {languageSelect()}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
