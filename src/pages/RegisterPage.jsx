import { Button, Card, Divider, Form, Input, Typography, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  UserAddOutlined,
  GoogleCircleFilled,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { googleLogin, register } from "../service/authService";
import ThemeToggle from "../component/ThemeToggle";
import LanguageSelector from "../component/LanguageSelector";
import { useTranslation } from "../i18n/LanguageContext";

const { Title, Text } = Typography;

function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleRegister = async (values) => {
    try {
      setLoading(true);
      await register(values);
      message.success(t("auth.registerTitle") || "Registration Successful");
      navigate("/login");
    } catch (error) {
      message.error(
        error?.response?.data?.message || t("common.somethingWentWrong") || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "var(--bg-primary)",
        padding: 20,
        position: "relative",
      }}
    >
      {/* TOP RIGHT CONTROLS */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <LanguageSelector />
        <ThemeToggle />
      </div>

      <Card
        style={{
          width: "100%",
          maxWidth: 450,
          borderRadius: 20,
          background: "var(--bg-surface)",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #2e7d32 0%, #15803d 100%)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              color: "#fff",
              marginBottom: 12,
              boxShadow: "0 4px 14px rgba(46, 125, 50, 0.3)",
            }}
          >
            🌾
          </div>
          <Title level={2} style={{ margin: 0, fontWeight: 800, color: "var(--text-main)" }}>
            {t("auth.registerTitle")}
          </Title>
          <Text type="secondary" style={{ fontSize: 14 }}>
            {t("auth.registerSubtitle")}
          </Text>
        </div>

        <Form layout="vertical" onFinish={handleRegister}>
          <Form.Item
            label={t("auth.nameLabel")}
            name="name"
            rules={[
              {
                required: true,
                message: "Enter your name",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined style={{ color: "var(--primary-green)" }} />}
              placeholder={t("auth.namePlaceholder")}
            />
          </Form.Item>

          <Form.Item
            label={t("auth.emailLabel")}
            name="email"
            rules={[
              {
                required: true,
                message: "Enter email",
              },
              {
                type: "email",
                message: "Valid email required",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined style={{ color: "var(--primary-green)" }} />}
              placeholder={t("auth.emailPlaceholder")}
            />
          </Form.Item>

          <Form.Item
            label={t("auth.passwordLabel")}
            name="password"
            rules={[
              {
                required: true,
                message: "Enter password",
              },
              {
                min: 6,
                message: "Min 6 characters",
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined style={{ color: "var(--primary-green)" }} />}
              placeholder={t("auth.passwordPlaceholder")}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 12 }}>
            <Button
              type="primary"
              htmlType="submit"
              icon={<UserAddOutlined />}
              loading={loading}
              size="large"
              block
              style={{
                height: 48,
                fontSize: 16,
                fontWeight: 600,
                background: "var(--primary-green)",
                borderColor: "var(--primary-green)",
              }}
            >
              {t("auth.registerButton")}
            </Button>
          </Form.Item>

          <Divider plain style={{ color: "var(--text-muted)", margin: "8px 0" }}>
            OR
          </Divider>

          <Button
            size="large"
            icon={<GoogleCircleFilled style={{ color: "#ea4335" }} />}
            block
            onClick={googleLogin}
            style={{
              height: 46,
              fontWeight: 600,
            }}
          >
            {t("auth.googleButton")}
          </Button>

          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Text type="secondary">{t("auth.haveAccount")} </Text>
            <Button
              type="link"
              style={{ padding: 0, fontWeight: 600, color: "var(--primary-green)" }}
              onClick={() => navigate("/login")}
            >
              {t("auth.signIn")}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default RegisterPage;