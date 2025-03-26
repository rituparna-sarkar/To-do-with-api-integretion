import axios from 'axios';



export const fetchWeatherByCoords = async (lat, lon) => {
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(url);
    return response.data;
  };