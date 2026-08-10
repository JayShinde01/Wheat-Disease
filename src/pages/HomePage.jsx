import React, { useEffect, useState } from "react";
import {
    EnvironmentOutlined,
    CameraOutlined,
    TeamOutlined,
    InfoCircleOutlined,
    RobotOutlined,
    CloudOutlined,
    ExperimentOutlined,
    ArrowRightOutlined
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import { getWeather } from "../service/weatherService";

import "../styles/HomePage.css";


function HomePage() {

    const navigate = useNavigate();

    const [weather, setWeather] = useState(null);

    const [weatherLoading, setWeatherLoading] =
        useState(true);

    const [weatherError, setWeatherError] =
        useState(false);


    // =====================================
    // WEATHER
    // =====================================

    useEffect(() => {

        loadWeather();

    }, []);


    const loadWeather = () => {

        if (!navigator.geolocation) {

            setWeatherError(true);

            setWeatherLoading(false);

            return;
        }


        navigator.geolocation.getCurrentPosition(

            async (position) => {

                try {

                    const data =
                        await getWeather(
                            position.coords.latitude,
                            position.coords.longitude
                        );

                    setWeather(data);

                } catch (error) {

                    console.error(
                        "Weather error:",
                        error
                    );

                    setWeatherError(true);

                } finally {

                    setWeatherLoading(false);
                }
            },

            () => {

                setWeatherError(true);

                setWeatherLoading(false);

            }
        );
    };


    return (

        <div className="home-page">


            {/* =================================
                WELCOME
            ================================= */}

            <section className="welcome-section">

                <div>

                    <span className="welcome-label">
                        🌾 KISSAN RAKSHAK
                    </span>

                    <h1>
                        Welcome back, {localStorage.getItem("email")} 👋
                    </h1>

                    <p>
                        Keep your crops healthy and
                        stay connected with your farming
                        community.
                    </p>

                </div>

            </section>


            {/* =================================
                WEATHER
            ================================= */}

            <section className="weather-card">

                {weatherLoading ? (

                    <div className="weather-loading">
                        Loading weather...
                    </div>

                ) : weatherError ? (

                    <div className="weather-error">

                        <CloudOutlined />

                        <span>
                            Unable to get your location
                            weather.
                        </span>

                        <button
                            onClick={loadWeather}
                        >
                            Retry
                        </button>

                    </div>

                ) : weather ? (

                    <>

                        <div className="weather-main">

                            <div>

                                <div className="weather-location">

                                    <EnvironmentOutlined />

                                    {weather.name}

                                </div>

                                <div className="temperature">

                                    {Math.round(
                                        weather.main.temp
                                    )}

                                    <span>°C</span>

                                </div>

                                <div className="weather-description">

                                    {capitalize(
                                        weather.weather[0]
                                            .description
                                    )}

                                </div>

                            </div>


                            <img
                                className="weather-icon"
                                src={
                                    `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
                                }
                                alt="Weather"
                            />

                        </div>


                        <div className="weather-details">

                            <WeatherDetail
                                label="Feels like"
                                value={`${Math.round(weather.main.feels_like)}°C`}
                            />

                            <WeatherDetail
                                label="Humidity"
                                value={`${weather.main.humidity}%`}
                            />

                            <WeatherDetail
                                label="Wind"
                                value={`${weather.wind.speed} m/s`}
                            />

                        </div>

                    </>

                ) : null}

            </section>


            {/* =================================
                QUICK ACTIONS
            ================================= */}

            <section>

                <div className="section-heading">

                    <h2>
                        Quick Actions
                    </h2>

                    <span>
                        What do you need?
                    </span>

                </div>


                <div className="quick-actions">

                    <ActionCard
                        icon={<CameraOutlined />}
                        title="Detect Disease"
                        description="Upload a wheat leaf"
                        onClick={() =>
                            navigate("/detection")
                        }
                    />


                    <ActionCard
                        icon={<TeamOutlined />}
                        title="Community"
                        description="Talk with farmers"
                        onClick={() =>
                            navigate("/community")
                        }
                    />


                    <ActionCard
                        icon={<InfoCircleOutlined />}
                        title="Crop Information"
                        description="Learn about diseases"
                        onClick={() =>
                            navigate("/info")
                        }
                    />


                    <ActionCard
                        icon={<RobotOutlined />}
                        title="Ask AI"
                        description="Get farming guidance"
                        onClick={() => {
                            // Jotform chatbot is available
                            // from MainLayout
                        }}
                    />

                </div>

            </section>


            {/* =================================
                DETECTION CARD
            ================================= */}

            <section className="detection-card">

                <div className="detection-icon">
                    <ExperimentOutlined />
                </div>


                <div className="detection-content">

                    <span>
                        AI CROP ASSISTANT
                    </span>

                    <h2>
                        Is something wrong with
                        your wheat?
                    </h2>

                    <p>
                        Upload a leaf image and let
                        our AI identify possible
                        wheat diseases.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/detection")
                        }
                    >

                        Detect Disease

                        <ArrowRightOutlined />

                    </button>

                </div>

            </section>


            {/* =================================
                FARMING TIP
            ================================= */}

            <section className="tip-card">

                <div className="tip-icon">
                    💡
                </div>

                <div>

                    <span>
                        TODAY'S FARMING TIP
                    </span>

                    <p>
                        Regularly inspect wheat leaves,
                        especially during humid weather,
                        to identify disease symptoms early.
                    </p>

                </div>

            </section>

        </div>
    );
}


/* =====================================
   WEATHER DETAIL
===================================== */

function WeatherDetail({
    label,
    value
}) {

    return (

        <div className="weather-detail">

            <span>
                {label}
            </span>

            <strong>
                {value}
            </strong>

        </div>
    );
}


/* =====================================
   ACTION CARD
===================================== */

function ActionCard({
    icon,
    title,
    description,
    onClick
}) {

    return (

        <button
            className="action-card"
            onClick={onClick}
        >

            <div className="action-icon">
                {icon}
            </div>

            <div>

                <strong>
                    {title}
                </strong>

                <span>
                    {description}
                </span>

            </div>

        </button>
    );
}


/* =====================================
   HELPER
===================================== */

function capitalize(text) {

    if (!text) {
        return "";
    }

    return (
        text.charAt(0).toUpperCase() +
        text.slice(1)
    );
}


export default HomePage;