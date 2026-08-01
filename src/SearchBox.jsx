import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import InfoBox from "./InfoBox";
import { useState } from "react";

export default function SearchBox() {
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "44eda8199b7c209ce545c12563e88273"; // Replace with your API key

    let [city, setCity] = useState("");
    let [weather, setWeather] = useState(null);

    let getWeatherInfo = async () => {
        try {
            let response = await fetch(
                `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
            );

            let jsonResponse = await response.json();

            console.log("Response:", jsonResponse);

            if (jsonResponse.cod != 200) {
                alert(jsonResponse.message);
                return;
            }

            let result = {
                city: jsonResponse.name,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                pressure: jsonResponse.main.pressure,
                weather: jsonResponse.weather[0].description,
                wind: jsonResponse.wind.speed,
            };

            console.log("Result:", result);

            setWeather(result);
        } catch (err) {
            console.log(err);
        }
    };

    let handleChangeCity = (event) => {
        setCity(event.target.value);
    };

    let handleSubmit = async (event) => {
        event.preventDefault();

        await getWeatherInfo();

        setCity("");
    };

    return (
        <div className="weatherContainer">
            <div className="searchBox">
                <h2>🌤 Search For The Weather</h2>

                <form className="searchForm" onSubmit={handleSubmit}>
                    <TextField
                        label="City"
                        variant="standard"
                        value={city}
                        onChange={handleChangeCity}
                        sx={{
                            width: "320px",

                            "& .MuiInputBase-input": {
                                color: "white",
                            },

                            "& .MuiInputLabel-root": {
                                color: "#d1d5db",
                            },

                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#38bdf8",
                            },

                            "& .MuiInput-underline:before": {
                                borderBottomColor: "#cbd5e1",
                            },

                            "& .MuiInput-underline:hover:before": {
                                borderBottomColor: "#38bdf8",
                            },

                            "& .MuiInput-underline:after": {
                                borderBottomColor: "#38bdf8",
                            },
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            height: "42px",
                            borderRadius: "10px",
                            px: 3,
                            fontWeight: "bold",
                            textTransform: "none",
                        }}
                    >
                        Search
                    </Button>
                </form>

                {weather && <InfoBox info={weather} />}
            </div>
        </div>
    );
}