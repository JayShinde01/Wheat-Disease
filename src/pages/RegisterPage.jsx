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

const { Title, Text } = Typography;

function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    try {
      setLoading(true);

      await register(values);

      message.success("Registration Successful");

      navigate("/login");
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#f5f5f5",
        padding: 20,
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 450,
          borderRadius: 12,
        }}
      >
        <Title level={2} style={{ textAlign: "center" }}>
          Create Account
        </Title>

        <Text
          type="secondary"
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: 25,
          }}
        >
          Register to continue
        </Text>

        <Form
          layout="vertical"
          onFinish={handleRegister}
        >
          <Form.Item
            label="Full Name"
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
              prefix={<UserOutlined />}
              placeholder="John Doe"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
              },
              {
                type: "email",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined />}
              placeholder="Enter email"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
              },
              {
                min: 6,
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Enter Password"
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
  >
    Create Account
  </Button>
</Form.Item>

<Divider plain>OR</Divider>

<Button
  size="large"
  icon={<GoogleCircleFilled />}
  block
  onClick={googleLogin}
>
  Continue with Google
</Button>

<div
  style={{
    textAlign: "center",
    marginTop: 24,
  }}
>
  <Text type="secondary">
    Already have an account?{" "}
  </Text>

  <Button
    type="link"
    style={{ padding: 0 }}
    onClick={() => navigate("/login")}
  >
    Login
  </Button>
</div>
        </Form>
      </Card>
    </div>
  );
}

export default RegisterPage;