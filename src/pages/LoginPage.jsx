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

import { GoogleLogin } from "@react-oauth/google";
import { googleLogin, login, preflight } from "../service/authService";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

function LoginPage() {
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
useEffect(()=>{
  preflight();
},[]);
  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const response = await login(values);

      console.log(response);

      message.success("Login successful");
      navigate("/home")
      
    } catch (error) {
      console.error(error);

      message.error(
        error?.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log(credentialResponse);
  };

  const handleGoogleError = () => {
    message.error("Google Login Failed");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
        padding: 20,
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 430,
          borderRadius: 16,
        }}
      >
        <Space
          direction="vertical"
          style={{ width: "100%" }}
          size="large"
        >
          <div style={{ textAlign: "center" }}>
            <Title level={2}>Welcome Back 👋</Title>

            <Text type="secondary">
              Login to continue
            </Text>
          </div>

          <Form
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
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
                prefix={<MailOutlined />}
                placeholder="Enter your email"
              />
            </Form.Item>

            <Form.Item
              label="Password"
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
                prefix={<LockOutlined />}
                placeholder="Enter password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                icon={<LoginOutlined />}
                loading={loading}
                block
              >
                Login
              </Button>
            </Form.Item>
          </Form>

          <Divider>OR</Divider>

          <Button
            icon={<GoogleCircleFilled />}
            size="large"
            block
            onClick={googleLogin}
          >
            Continue with Google
          </Button>

          {/* If you really want GoogleLogin component */}

          {/*

          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />

          */}
        </Space>
      </Card>
    </div>
  );
}

export default LoginPage;