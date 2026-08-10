import axios from "axios";

const API_KEY =
    import.meta.env.VITE_OPENWEATHER_API_KEY;

const BASE_URL =
    "https://api.openweathermap.org/data/2.5/weather";


export async function getWeather(
    latitude,
    longitude
) {

    const response = await axios.get(
        BASE_URL,
        {
            params: {
                lat: latitude,
                lon: longitude,
                appid: API_KEY,
                units: "metric"
            }
        }
    );

    return response.data;
}