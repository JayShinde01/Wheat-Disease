import React, { createContext, useContext, useState, useEffect } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const isDark = themeMode === "dark";

  // Customized Ant Design Theme Config
  const antdThemeConfig = {
    algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: "#2e7d32", // Forest Green
      colorSuccess: "#166534",
      colorWarning: "#d97706", // Wheat Gold
      colorError: "#dc2626",
      borderRadius: 12,
      fontFamily: "'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      colorBgContainer: isDark ? "#1e293b" : "#ffffff",
      colorBgElevated: isDark ? "#334155" : "#ffffff",
      colorBgLayout: isDark ? "#0f172a" : "#f8fafc",
      colorText: isDark ? "#f8fafc" : "#1e293b",
      colorTextSecondary: isDark ? "#94a3b8" : "#64748b",
      colorBorder: isDark ? "#334155" : "#e2e8f0",
    },
    components: {
      Button: {
        borderRadius: 10,
        fontWeight: 600,
      },
      Card: {
        borderRadiusLG: 16,
      },
    },
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme, isDark }}>
      <ConfigProvider theme={antdThemeConfig}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
