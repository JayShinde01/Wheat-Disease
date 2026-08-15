import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import {
    Card,
    Input,
    Button,
    Typography,
    Form,
    Alert
} from "antd";

import {
    LockOutlined,
    ArrowLeftOutlined,
    SafetyOutlined
} from "@ant-design/icons";

import api from "../constant/api";

const { Title, Text } = Typography;

function ResetPassword() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {

        if (!token) {
            setMessage("Invalid or missing reset token.");
            setSuccess(false);
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            setSuccess(false);
            return;
        }

        try {

            setLoading(true);
            setMessage("");
            setSuccess(false);

            const response = await api.post(
                "/api/auth/reset-password",
                {
                    token,
                    password
                }
            );

            setMessage(response.data);
            setSuccess(true);

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {

            setMessage(
                error.response?.data ||
                "Invalid or expired reset token."
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

                {/* Header */}

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
                        Reset Password
                    </Title>

                    <Text type="secondary">
                        Create a new secure password
                        for your Wheat Care AI account.
                    </Text>

                </div>


                {/* Form */}

                <Form
                    layout="vertical"
                    onFinish={handleSubmit}
                >

                    <Form.Item
                        label="New Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please enter your new password"
                            },
                            {
                                min: 6,
                                message:
                                    "Password must be at least 6 characters"
                            }
                        ]}
                    >

                        <Input.Password
                            size="large"
                            prefix={
                                <LockOutlined />
                            }
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                    </Form.Item>


                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        dependencies={["password"]}
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please confirm your password"
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {

                                    if (
                                        !value ||
                                        getFieldValue(
                                            "password"
                                        ) === value
                                    ) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(
                                        new Error(
                                            "Passwords do not match"
                                        )
                                    );
                                }
                            })
                        ]}
                    >

                        <Input.Password
                            size="large"
                            prefix={
                                <SafetyOutlined />
                            }
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(
                                    e.target.value
                                )
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
                        Reset Password
                    </Button>

                </Form>


                {/* Message */}

                {message && (

                    <Alert
                        style={{
                            marginTop: 20,
                            borderRadius: 10
                        }}
                        message={
                            success
                                ? "Password Reset Successful"
                                : "Password Reset Failed"
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


                {/* Back to Login */}

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

export default ResetPassword;