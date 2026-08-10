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
import { useTranslation } from "../i18n/LanguageContext";
import { WeatherSkeleton } from "../component/LoadingSkeleton";

import "../styles/HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(false);

  const userEmail = localStorage.getItem("email") || "Farmer";
  const userName = localStorage.getItem("name") || userEmail.split("@")[0];

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
          const data = await getWeather(
            position.coords.latitude,
            position.coords.longitude
          );
          setWeather(data);
        } catch (error) {
          console.error("Weather error:", error);
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
          WELCOME BANNER
      ================================= */}
      <section className="welcome-section">
        <div>
          <span className="welcome-label">
            {t("home.badge")}
          </span>
          <h1>
            {t("home.welcome")}, {userName} 👋
          </h1>
          <p>
            {t("home.welcomeSubtitle")}
          </p>
        </div>
      </section>

      {/* =================================
          WEATHER WIDGET
      ================================= */}
      <section className="weather-card">
        {weatherLoading ? (
          <WeatherSkeleton />
        ) : weatherError ? (
          <div className="weather-error">
            <CloudOutlined style={{ fontSize: 24, color: "var(--text-muted)" }} />
            <span>{t("home.weather.error")}</span>
            <button onClick={loadWeather}>
              {t("home.weather.retry")}
            </button>
          </div>
        ) : weather ? (
          <>
            <div className="weather-main">
              <div>
                <div className="weather-location">
                  <EnvironmentOutlined style={{ color: "var(--primary-green)" }} />
                  {weather.name}
                </div>
                <div className="temperature">
                  {Math.round(weather.main.temp)}
                  <span>°C</span>
                </div>
                <div className="weather-description">
                  {capitalize(weather.weather[0].description)}
                </div>
              </div>

              <img
                className="weather-icon"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather Condition"
              />
            </div>

            <div className="weather-details">
              <WeatherDetail
                label={t("home.weather.feelsLike")}
                value={`${Math.round(weather.main.feels_like)}°C`}
              />
              <WeatherDetail
                label={t("home.weather.humidity")}
                value={`${weather.main.humidity}%`}
              />
              <WeatherDetail
                label={t("home.weather.wind")}
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
          <h2>{t("home.quickActions.title")}</h2>
          <span>{t("home.quickActions.subtitle")}</span>
        </div>

        <div className="quick-actions">
          <ActionCard
            icon={<CameraOutlined />}
            title={t("home.quickActions.detectTitle")}
            description={t("home.quickActions.detectDesc")}
            onClick={() => navigate("/detection")}
          />
          <ActionCard
            icon={<TeamOutlined />}
            title={t("home.quickActions.communityTitle")}
            description={t("home.quickActions.communityDesc")}
            onClick={() => navigate("/community")}
          />
          <ActionCard
            icon={<InfoCircleOutlined />}
            title={t("home.quickActions.infoTitle")}
            description={t("home.quickActions.infoDesc")}
            onClick={() => navigate("/info")}
          />
          <ActionCard
            icon={<RobotOutlined />}
            title={t("home.quickActions.aiTitle")}
            description={t("home.quickActions.aiDesc")}
            onClick={() => {
              // Smooth scroll to bottom where chatbot widget is anchored
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }}
          />
        </div>
      </section>

      {/* =================================
          AI SCANNER BANNER
      ================================= */}
      <section className="detection-card">
        <div className="detection-icon">
          <ExperimentOutlined />
        </div>

        <div className="detection-content">
          <span>{t("home.scannerCard.tag")}</span>
          <h2>{t("home.scannerCard.title")}</h2>
          <p>{t("home.scannerCard.description")}</p>
          <button onClick={() => navigate("/detection")}>
            {t("home.scannerCard.button")}
            <ArrowRightOutlined />
          </button>
        </div>
      </section>

      {/* =================================
          FARMING TIP
      ================================= */}
      <section className="tip-card">
        <div className="tip-icon">💡</div>
        <div>
          <span>{t("home.tip.tag")}</span>
          <p>{t("home.tip.text")}</p>
        </div>
      </section>
    </div>
  );
}

/* =====================================
   WEATHER DETAIL HELPER
===================================== */
function WeatherDetail({ label, value }) {
  return (
    <div className="weather-detail">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

/* =====================================
   ACTION CARD HELPER
===================================== */
function ActionCard({ icon, title, description, onClick }) {
  return (
    <button className="action-card" onClick={onClick}>
      <div className="action-icon">{icon}</div>
      <div>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>
    </button>
  );
}

function capitalize(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default HomePage;