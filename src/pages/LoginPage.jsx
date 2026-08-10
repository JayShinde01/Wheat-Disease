import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Divider,
  Space,
  message,
} from "antd";
import {
  LoginOutlined,
  GoogleCircleFilled,
  MailOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

import { googleLogin, login, preflight } from "../service/authService";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../component/ThemeToggle";
import LanguageSelector from "../component/LanguageSelector";
import { useTranslation } from "../i18n/LanguageContext";

const { Title, Text } = Typography;

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    preflight();
  }, []);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await login(values);
      console.log(response);
      message.success(t("auth.loginTitle") || "Login successful");
      navigate("/home");
    } catch (error) {
      console.error(error);
      message.error(
        error?.response?.data?.message || t("auth.invalidCredentials") || "Invalid email or password"
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
          maxWidth: 440,
          borderRadius: 20,
          background: "var(--bg-surface)",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <div style={{ textAlign: "center" }}>
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
              {t("appName")}
            </Title>
            <Text type="secondary" style={{ fontSize: 14 }}>
              {t("auth.loginSubtitle")}
            </Text>
          </div>

          <Form layout="vertical" onFinish={handleSubmit} autoComplete="off">
            <Form.Item
              label={t("auth.emailLabel")}
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
                {
                  type: "email",
                  message: "Enter a valid email",
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
                  message: "Please enter your password",
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters",
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
                htmlType="submit"
                type="primary"
                size="large"
                icon={<LoginOutlined />}
                loading={loading}
                block
                style={{
                  height: 48,
                  fontSize: 16,
                  fontWeight: 600,
                  background: "var(--primary-green)",
                  borderColor: "var(--primary-green)",
                }}
              >
                {t("auth.loginButton")}
              </Button>
            </Form.Item>
          </Form>

          <Divider plain style={{ color: "var(--text-muted)", margin: "8px 0" }}>
            OR
          </Divider>

          <Button
            icon={<GoogleCircleFilled style={{ color: "#ea4335" }} />}
            size="large"
            block
            onClick={googleLogin}
            style={{
              height: 46,
              fontWeight: 600,
            }}
          >
            {t("auth.googleButton")}
          </Button>

          <div style={{ textAlign: "center", marginTop: 8 }}>
            <Text type="secondary">{t("auth.noAccount")} </Text>
            <Button
              type="link"
              style={{ padding: 0, fontWeight: 600, color: "var(--primary-green)" }}
              onClick={() => navigate("/register")}
            >
              {t("auth.signUp")}
            </Button>
          </div>
        </Space>
      </Card>
    </div>
  );
}

export default LoginPage;