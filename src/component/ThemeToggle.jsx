import React from "react";
import { Button, Tooltip } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useTheme } from "../context/ThemeContext";

function ThemeToggle({ className = "", style = {} }) {
  const { themeMode, toggleTheme, isDark } = useTheme();

  return (
    <Tooltip title={isDark ? "Switch to Light Mode ☀️" : "Switch to Dark Mode 🌙"}>
      <Button
        type="text"
        shape="circle"
        icon={
          isDark ? (
            <SunOutlined style={{ color: "#fbbf24", fontSize: 18 }} />
          ) : (
            <MoonOutlined style={{ color: "#475569", fontSize: 18 }} />
          )
        }
        onClick={toggleTheme}
        className={className}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...style,
        }}
        aria-label="Toggle theme mode"
      />
    </Tooltip>
  );
}

export default ThemeToggle;
