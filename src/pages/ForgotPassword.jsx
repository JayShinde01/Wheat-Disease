import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    Input,
    Button,
    Typography,
    Form,
    Alert,
    Space
} from "antd";
import {
    MailOutlined,
    ArrowLeftOutlined,
    LockOutlined
} from "@ant-design/icons";

import api from "../constant/api";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const { Title, Text } = Typography;

function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {

        try {

            setLoading(true);
            setMessage("");
            setSuccess(false);

            const response = await axios.post(
                `${BASE_URL}/api/auth/forgot-password`,
                {
                    email
                }
            );

            setMessage(response.data);
            setSuccess(true);

        } catch (error) {

            setMessage(
                error.response?.data ||
                "Something went wrong. Please try again."
            );

            setSuccess(false);

        } finally {

            setLoading(false);
        }
    };

    return (

        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
                background:
                    "linear-gradient(135deg, #f4f8f2 0%, #e8f2e4 100%)"
            }}
        >

            <Card
                style={{
                    width: "100%",
                    maxWidth: 430,
                    borderRadius: 20,
                    boxShadow:
                        "0 12px 35px rgba(0,0,0,0.10)"
                }}
                styles={{
                    body: {
                        padding: "35px 30px"
                    }
                }}
            >

                {/* Logo / Heading */}

                <div
                    style={{
                        textAlign: "center",
                        marginBottom: 30
                    }}
                >

                    <div
                        style={{
                            fontSize: 48,
                            marginBottom: 10
                        }}
                    >
                        🌾
                    </div>

                    <Title
                        level={2}
                        style={{
                            marginBottom: 8
                        }}
                    >
                        Forgot Password?
                    </Title>

                    <Text type="secondary">
                        No worries! Enter your email and
                        we'll send you a password reset link.
                    </Text>

                </div>


                {/* Form */}

                <Form
                    layout="vertical"
                    onFinish={handleSubmit}
                >

                    <Form.Item
                        label="Email Address"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please enter your email"
                            },
                            {
                                type: "email",
                                message:
                                    "Please enter a valid email"
                            }
                        ]}
                    >

                        <Input
                            size="large"
                            prefix={
                                <MailOutlined />
                            }
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                    </Form.Item>


                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        block
                        loading={loading}
                        icon={<LockOutlined />}
                        style={{
                            height: 48,
                            borderRadius: 10
                        }}
                    >
                        Send Reset Link
                    </Button>

                </Form>


                {/* Response */}

                {message && (

                    <Alert
                        style={{
                            marginTop: 20,
                            borderRadius: 10
                        }}
                        message={
                            success
                                ? "Check your email"
                                : "Request failed"
                        }
                        description={message}
                        type={
                            success
                                ? "success"
                                : "error"
                        }
                        showIcon
                    />

                )}


                {/* Back */}

                <div
                    style={{
                        textAlign: "center",
                        marginTop: 25
                    }}
                >

                    <Button
                        type="link"
                        icon={<ArrowLeftOutlined />}
                        onClick={() =>
                            navigate("/login")
                        }
                    >
                        Back to Login
                    </Button>

                </div>

            </Card>

        </div>
    );
}

export default ForgotPassword;