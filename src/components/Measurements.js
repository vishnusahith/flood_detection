// frontend/src/components/Measurements.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Measurements.css'; // Import the CSS file

const Measurements = () => {
    const [sensorData, setSensorData] = useState(null);
    const [alerts, setAlerts] = useState([]);
    const navigate = useNavigate();

    // Define threshold values
    const temperatureThreshold = 30;
    const humidityThreshold = 70;
    const waterLevelThreshold = 20;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/measurements');
            let data = await response.json();
            const randomIndex = Math.floor(Math.random() * data.length);
            data = data[randomIndex]
            setSensorData(data);

            // Check if any measurement exceeds thresholds and set alerts
            const newAlerts = [];
            if (data.temperature > temperatureThreshold) {
                newAlerts.push('Temperature exceeds the threshold!');
            }
            if (data.humidity > humidityThreshold) {
                newAlerts.push('Humidity exceeds the threshold!');
            }
            if (data.waterLevel > waterLevelThreshold) {
                newAlerts.push('Water Level exceeds the threshold!');
            }
            setAlerts(newAlerts);
        };

        fetchData();
    }, []);

    if (!sensorData) return <div className="loading">Loading...</div>;

    return (
        <div className="measurements-container">
            <div className="measurements-box">
                <h2>Measurements</h2>
                <p>Temperature: {sensorData.temperature} °C</p>
                <p>Humidity: {sensorData.humidity} %</p>
                <p>Water Level: {sensorData.waterLevel} cm</p>

                {alerts.length > 0 && (
                    <div>
                        <button
                            onClick={() => navigate('/alert', { state: { alerts } })}
                            className="alert-button"
                        >
                            View Alerts
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Measurements;
