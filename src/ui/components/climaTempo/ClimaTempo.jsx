import { useEffect, useState } from "react";
import './climaTempo.css';

export default function ClimaTempo() {
    const [weather, setWeather] = useState(null);
    
    useEffect(() => {
        fetch(
            ``
        )
        .then((response) => response.json())
        .then((data) => setWeather(data));
    }, []);
    
    return(
        <div className='climaTempo'>
            <div className='backgroundImg'>
                <div style={{ color: "#fff", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
                    {weather ? (
                        <>
                            <h3>{weather.name}</h3>
                            <p>Temperatura: {weather.main.temp}°C</p>
                            <p>Condição: {weather.weather[0].description}</p>
                        </>
                    ) : (
                        <p>Carregando...</p>
                    )}
                </div>
            </div>
        </div>
    )
}
