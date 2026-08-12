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

      message.success(
        t("auth.loginTitle") || "Login successful"
      );

      navigate("/home");
    } catch (error) {
      console.error(error);

      message.error(
        error?.response?.data?.message ||
          t("auth.invalidCredentials") ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "var(--bg-primary)",
        padding: "90px 20px 30px",
        position: "relative",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      {/* ================= TOP RIGHT CONTROLS ================= */}
      <div
        style={{
          position: "fixed",
          top: 18,
          right: 20,
          display: "flex",
          alignItems: "center",
          gap: 10,
          zIndex: 1000,
          padding: "6px 10px",
          borderRadius: 12,
          background: "var(--bg-primary)",
        }}
      >
        <LanguageSelector />
        <ThemeToggle />
      </div>

      {/* ================= LOGIN CARD ================= */}
      <Card
        style={{
          width: "100%",
          maxWidth: 440,
          borderRadius: 20,
          background: "var(--bg-surface)",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--shadow-md)",
          boxSizing: "border-box",
        }}
        styles={{
          body: {
            padding: "28px 24px",
          },
        }}
      >
        <Space
          direction="vertical"
          style={{
            width: "100%",
          }}
          size="large"
        >
          {/* ================= LOGO / TITLE ================= */}
          <div
            style={{
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background:
                  "linear-gradient(135deg, #2e7d32 0%, #15803d 100%)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
                color: "#fff",
                marginBottom: 12,
                boxShadow:
                  "0 4px 14px rgba(46, 125, 50, 0.3)",
              }}
            >
              🌾
            </div>

            <Title
              level={2}
              style={{
                margin: 0,
                fontWeight: 800,
                color: "var(--text-main)",
              }}
            >
              {t("appName")}
            </Title>

            <Text
              type="secondary"
              style={{
                fontSize: 14,
                display: "block",
                marginTop: 4,
              }}
            >
              {t("auth.loginSubtitle")}
            </Text>
          </div>

          {/* ================= LOGIN FORM ================= */}
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
          >
            {/* EMAIL */}
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
                prefix={
                  <MailOutlined
                    style={{
                      color: "var(--primary-green)",
                    }}
                  />
                }
                placeholder={t("auth.emailPlaceholder")}
              />
            </Form.Item>

            {/* PASSWORD */}
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
                  message:
                    "Password must be at least 6 characters",
                },
              ]}
            >
              <Input.Password
                size="large"
                prefix={
                  <LockOutlined
                    style={{
                      color: "var(--primary-green)",
                    }}
                  />
                }
                placeholder={t("auth.passwordPlaceholder")}
              />
            </Form.Item>

            {/* LOGIN BUTTON */}
            <Form.Item
              style={{
                marginBottom: 12,
              }}
            >
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

          {/* ================= OR ================= */}
          <Divider
            plain
            style={{
              color: "var(--text-muted)",
              margin: "8px 0",
            }}
          >
            OR
          </Divider>

          {/* ================= GOOGLE LOGIN ================= */}
          <Button
            icon={
              <GoogleCircleFilled
                style={{
                  color: "#ea4335",
                }}
              />
            }
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

          {/* ================= REGISTER ================= */}
          <div
            style={{
              textAlign: "center",
              marginTop: 8,
            }}
          >
            <Text type="secondary">
              {t("auth.noAccount")}{" "}
            </Text>

            <Button
              type="link"
              style={{
                padding: 0,
                fontWeight: 600,
                color: "var(--primary-green)",
              }}
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