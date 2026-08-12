import React, { useState } from "react";
import {
  Layout,
  Drawer,
  Menu,
  Avatar,
  Typography,
  Tooltip,
  Dropdown
} from "antd";

import {
  MenuOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  HomeOutlined,
  CameraOutlined,
  TeamOutlined,
  InfoCircleOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../service/authService";
import JotformChatbot from "../component/JotformChatbot";
import ThemeToggle from "../component/ThemeToggle";
import LanguageSelector from "../component/LanguageSelector";
import { useTranslation } from "../i18n/LanguageContext";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function MainLayout() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const userEmail = localStorage.getItem("email") || "Farmer";
  const userName = localStorage.getItem("name") || userEmail.split("@")[0];

  const profileMenuItems = [
    {
      key: "profile-info",
      label: (
        <div style={{ padding: "4px 8px" }}>
          <Text strong style={{ display: "block" }}>{userName}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>{userEmail}</Text>
        </div>
      ),
      disabled: true,
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined style={{ color: "#ef4444" }} />,
      label: <span style={{ color: "#ef4444", fontWeight: 600 }}>{t("nav.logout")}</span>,
      onClick: logout,
    },
  ];

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
      }}
    >
      {/* TOP HEADER */}
      <Header
        style={{
          background: "var(--bg-surface)",
          borderBottom: "1px solid var(--border-color)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "var(--shadow-sm)",
          height: 64,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <MenuOutlined
            style={{
              fontSize: 20,
              cursor: "pointer",
              color: "var(--text-main)",
            }}
            onClick={() => setOpenDrawer(true)}
            aria-label="Open menu drawer"
          />

          <div
            onClick={() => navigate("/home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "var(--radius-md)",
                background: "linear-gradient(135deg, #2e7d32 0%, #15803d 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 20,
                boxShadow: "0 2px 8px rgba(46, 125, 50, 0.3)",
              }}
            >
              🌾
            </div>
            <div>
              <Title
                level={4}
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  color: "var(--text-main)",
                  lineHeight: 1.2,
                }}
              >
                {t("appName")}
              </Title>
              <Text
                style={{
                  fontSize: 10,
                  color: "var(--primary-green)",
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  display: "block",
                  lineHeight: 1,
                }}
              >
                {t("appSubtitle")}
              </Text>
            </div>
          </div>
        </div>

        {/* HEADER RIGHT ACTIONS */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <LanguageSelector />
          <ThemeToggle />

          <Dropdown menu={{ items: profileMenuItems }} trigger={["click"]}>
            <Avatar
              style={{
                backgroundColor: "var(--primary-green)",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          </Dropdown>
        </div>
      </Header>

      {/* SIDE DRAWER */}
      <Drawer
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <SafetyCertificateOutlined style={{ color: "var(--primary-green)" }} />
            <span>{t("appName")}</span>
          </div>
        }
        placement="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        styles={{ body: { padding: 0 } }}
      >
        <div
          style={{
            padding: "20px 16px",
            background: "var(--primary-green-light)",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Avatar size={48} style={{ backgroundColor: "var(--primary-green)", fontSize: 20 }}>
            {userName.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <Text strong style={{ display: "block", color: "var(--text-main)", fontSize: 16 }}>
              {userName}
            </Text>
            <Text type="secondary" style={{ fontSize: 12, color: "var(--text-muted)" }}>
              {userEmail}
            </Text>
          </div>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          style={{ borderRight: "none" }}
          items={[
            {
              key: "/home",
              icon: <HomeOutlined />,
              label: t("nav.home"),
              onClick: () => {
                navigate("/home");
                setOpenDrawer(false);
              },
            },
            {
              key: "/detection",
              icon: <CameraOutlined />,
              label: t("nav.detection"),
              onClick: () => {
                navigate("/detection");
                setOpenDrawer(false);
              },
            },
            {
              key: "/community",
              icon: <TeamOutlined />,
              label: t("nav.community"),
              onClick: () => {
                navigate("/community");
                setOpenDrawer(false);
              },
            },
            {
              key: "/info",
              icon: <InfoCircleOutlined />,
              label: t("nav.info"),
              onClick: () => {
                navigate("/info");
                setOpenDrawer(false);
              },
            },
            { type: "divider" },
            {
              key: "logout",
              icon: <LogoutOutlined style={{ color: "#ef4444" }} />,
              label: <span style={{ color: "#ef4444" }}>{t("nav.logout")}</span>,
              onClick: () => {
                setOpenDrawer(false);
                logout();
              },
            },
          ]}
        />
      </Drawer>

      {/* MAIN CONTENT AREA */}
      <Content
        style={{
          padding: "20px 16px 95px 16px",
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
        }}
      >
        <Outlet />
      </Content>

      {/* <JotformChatbot /> */}

      {/* FIXED BOTTOM NAVIGATION FOR MOBILE & DESKTOP QUICK ACCESS */}
      <nav
        aria-label="Bottom Navigation"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "var(--bg-surface)",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "8px 0",
          borderTop: "1px solid var(--border-color)",
          zIndex: 90,
          boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <NavItem
          icon={<HomeOutlined />}
          label={t("nav.home")}
          active={location.pathname === "/home"}
          onClick={() => navigate("/home")}
        />
        <NavItem
          icon={<CameraOutlined />}
          label={t("nav.detection")}
          active={location.pathname === "/detection"}
          onClick={() => navigate("/detection")}
        />
        <NavItem
          icon={<TeamOutlined />}
          label={t("nav.community")}
          active={location.pathname === "/community"}
          onClick={() => navigate("/community")}
        />
        <NavItem
          icon={<InfoCircleOutlined />}
          label={t("nav.info")}
          active={location.pathname === "/info"}
          onClick={() => navigate("/info")}
        />
      </nav>
    </Layout>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "4px 12px",
        borderRadius: 8,
        color: active ? "var(--primary-green)" : "var(--text-muted)",
        transition: "all var(--transition-fast)",
      }}
    >
      <div style={{ fontSize: 20, lineHeight: 1 }}>{icon}</div>
      <span
        style={{
          fontSize: 11,
          fontWeight: active ? 700 : 500,
          marginTop: 4,
        }}
      >
        {label}
      </span>
    </button>
  );
}

export default MainLayout;