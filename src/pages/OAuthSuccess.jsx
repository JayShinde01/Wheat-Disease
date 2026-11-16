
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Spin, message } from "antd";
import { getCurrentUser } from "../service/authService";

function OAuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
      const token = searchParams.get("token");
      const email = searchParams.get("email");

      if (!token) {
        message.error("Google Login Failed");
        navigate("/login", { replace: true });
        return;
      }

      try {
        localStorage.setItem("token", token);

        if (email) {
          localStorage.setItem("email", email);
        }

        const user = await getCurrentUser();

        message.success("Login Successful");

        if (user.role === "ADMIN") {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate("/home", { replace: true });
        }

      } catch (error) {
        console.error("Google authentication failed:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("role");

        message.error("Unable to verify your account");
        navigate("/login", { replace: true });
      }
    };

    authenticate();
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
