import React from "react";
import { Select } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from "../i18n/LanguageContext";

function LanguageSelector({ style = {} }) {
  const { language, setLanguage } = useTranslation();

  const options = [
    { value: "en", label: "🌐 English" },
    { value: "hi", label: "🇮🇳 हिंदी" },
    { value: "mr", label: "🇮🇳 मराठी" },
  ];

  return (
    <Select
      value={language}
      onChange={setLanguage}
      options={options}
      variant="filled"
      style={{
        width: 110,
        fontWeight: 500,
        ...style,
      }}
      suffixIcon={<GlobalOutlined style={{ color: "var(--primary-green)" }} />}
    />
  );
}

export default LanguageSelector;
