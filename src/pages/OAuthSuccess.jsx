import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Spin, message } from "antd";

function OAuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token) {
      message.error("Google Login Failed");
      navigate("/login", { replace: true });
      return;
    }

    // Store authentication details
    localStorage.setItem("token", token);

    if (email) {
      localStorage.setItem("email", email);
    }

    message.success("Login Successful");
    navigate("/home", { replace: true });
  }, [navigate, searchParams]);

  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
        background: "var(--bg-primary)",
        color: "var(--text-main)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Spin size="large" />
        <p style={{ marginTop: 16, fontWeight: 500, color: "var(--text-muted)" }}>
          Signing you in...
        </p>
      </div>
    </div>
  );
}

export default OAuthSuccess;