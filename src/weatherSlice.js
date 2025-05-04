import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeather = createAsyncThunk("weatherAPI", async (state) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${state.cityName}&appid=f83d92c4c1cbc8bf9d940af746a73248`
  );
  let temp = response.data.main.temp;
  let tempC = Math.round(temp - 273.15);
  let tempMax = Math.round(response.data.main.temp_max - 273.15);
  let tempMin = Math.round(response.data.main.temp_min - 273.15);
  let icon = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  let dataWeather = {
    city: response.data.name,
    temp: tempC,
    description: response.data.weather[0].description,
    tempMax: tempMax,
    tempMin: tempMin,
    icon: icon,
  };
  return dataWeather;
});

const initialState = {
  result: "gaza,ps",
  weather: {},
  isLoading: false,
  backgCity:
    "https://www.aljazeera.com/wp-content/uploads/2025/02/image-1738850613.jpg?resize=1800%2C1080&quality=80",
  language: "en",
};
export const weatherSliceReducer = createSlice({
  name: "weatherAPI",
  initialState: initialState,
  reducers: {
    changeCity: (state, action) => {
      state.result = action.payload.nameCity;
    },
    changeBackGround: (state, action) => {
      state.backgCity = action.payload;
    },
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.weather = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { changeCity, changeBackGround, changeLanguage } =
  weatherSliceReducer.actions;
export default weatherSliceReducer.reducer;
