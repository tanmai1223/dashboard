import React, { useEffect, useState } from 'react';
import style from '../styles/WeatherCard.module.css';

function WeatherCard() {
    const [city, setCity] = useState(null);
    const [weather, setWeather] = useState(null);
    const [time, setTime] = useState(new Date());
    const [locationError, setLocationError] = useState(false);

    useEffect(() => {
        const getCityFromCoords = async () => {
            try {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
                        const data = await res.json();
                        const cityName =
                            data?.address?.city ||
                            data?.address?.town ||
                            data?.address?.village;

                        if (cityName) {
                            setCity(cityName);
                        } else {
                            setLocationError(true);
                            setCity('Delhi'); // fallback city
                        }
                    },
                    () => {
                        setLocationError(true);
                        setCity('Delhi'); // fallback city
                    }
                );
            } catch (error) {
                setLocationError(true);
                setCity('Delhi'); // fallback city
                console.log('Error fetching location');
            }
        };

        getCityFromCoords();
    }, []);

    useEffect(() => {
        if (!city) return;

        const fetchWeather = async () => {
            try {
                const res = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fd9245f8457365b5101cd7f101b5598d&units=metric`
                );
                const data = await res.json();
                if (data.cod === 200) {
                    setWeather(data);
                } else {
                    console.log('Weather data not found');
                    setWeather(null);
                }
            } catch (error) {
                console.log('Error fetching weather');
            }
        };

        fetchWeather();
    }, [city]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const date = `${time.getDate()}-${time.getMonth() + 1}-${time.getFullYear()}`;
    const formattedTime = time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    return (
        <div className={style.weathercard}>
            {!city ? (
                <p>Fetching your location...</p>
            ) : !weather ? (
                <p>Loading weather data for {city}...</p>
            ) : (
                <div>
                    <div className={style.header}>
                        <p>{date}</p>
                        <p>{formattedTime}</p>
                    </div>

                    {locationError && (
                        <p style={{ color: '#f39c12', fontWeight: '500', marginBottom: '10px' }}>
                            Location access denied — showing weather for Delhi instead.
                        </p>
                    )}

                    <div className={style.infoSection}>
                        <div className={style.infoBlock}>
                            <img src="weather1.png" alt="weather" className={style.iconLarge} />
                            <p className={style.description}>{weather.weather[0].description}</p>
                        </div>

                        <div className={style.verticalLine}></div>

                        <div className={style.infoBlock}>
                            <p className={style.temperature}>{Math.round(weather.main.temp)}°C</p>
                            <div className={style.row}>
                                <img src="temp.png" alt="temp" className={style.iconSmall} />
                                <div>
                                    <p className={style.value}>{weather.main.pressure} mbar</p>
                                    <p className={style.label}>Pressure</p>
                                </div>
                            </div>
                        </div>

                        <div className={style.verticalLine}></div>

                        <div className={style.infoBlock}>
                            <div className={style.row}>
                                <img src="wind.png" alt="wind" className={style.iconSmall} />
                                <div>
                                    <p className={style.value}>{weather.wind.speed} km/h</p>
                                    <p className={style.label}>Wind</p>
                                </div>
                            </div>
                            <div className={style.row}>
                                <img src="Group.png" alt="humidity" className={style.iconSmall} />
                                <div>
                                    <p className={style.value}>{weather.main.humidity}%</p>
                                    <p className={style.label}>Humidity</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WeatherCard;
