import "./InfoBox.css";

export default function InfoBox({ info }) {
    return (
        <div className="infoCard">
            <h2>{info.city}</h2>

            <h1>{info.temp}°C</h1>

            <h3>{info.weather}</h3>

            <div className="details">
                <p><b>Feels Like:</b> {info.feelsLike}°C</p>
                <p><b>Humidity:</b> {info.humidity}%</p>
                <p><b>Pressure:</b> {info.pressure} hPa</p>
                <p><b>Min Temp:</b> {info.tempMin}°C</p>
                <p><b>Max Temp:</b> {info.tempMax}°C</p>
            </div>
        </div>
    );
}