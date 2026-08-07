import { useState } from "react";
import {
  Layout,
  Menu,
  Drawer,
  Avatar,
  Typography,
} from "antd";

import {
  HomeOutlined,
  CameraOutlined,
  TeamOutlined,
  InfoCircleOutlined,
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Header, Content } = Layout;
const { Title } = Typography;

function HomePage() {
  const [selected, setSelected] = useState("home");
  const [open, setOpen] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      {/* Header */}

      <Header
        style={{
          background: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16px",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 2px 8px rgba(0,0,0,.08)",
        }}
      >
        <MenuOutlined
          style={{
            fontSize: 22,
            cursor: "pointer",
          }}
          onClick={() => setOpen(true)}
        />

        <Title
          level={4}
          style={{
            margin: 0,
          }}
        >
          🌾 Kissan Rakshak
        </Title>

        <Avatar
          size="large"
          icon={<UserOutlined />}
        />
      </Header>

      {/* Drawer */}

      <Drawer
        title="Menu"
        placement="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Menu
          mode="inline"
          items={[
            {
              key: "profile",
              icon: <UserOutlined />,
              label: "Profile",
            },
            {
              key: "settings",
              icon: <SettingOutlined />,
              label: "Settings",
            },
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Logout",
            },
          ]}
        />
      </Drawer>

      {/* Main Content */}

      <Content
        style={{
          padding: 20,
          paddingBottom: 90,
        }}
      >
        <h2>{selected.toUpperCase()}</h2>

        <p>
          Your {selected} page content goes here.
        </p>
      </Content>

      {/* Bottom Navigation */}

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "#fff",
          borderTop: "1px solid #e8e8e8",
          display: "flex",
          justifyContent: "space-around",
          padding: "8px 0",
          zIndex: 999,
        }}
      >
        <NavItem
          icon={<HomeOutlined />}
          label="Home"
          active={selected === "home"}
          onClick={() => setSelected("home")}
        />

        <NavItem
          icon={<CameraOutlined />}
          label="Detection"
          active={selected === "detect"}
          onClick={() => setSelected("detect")}
        />

        <NavItem
          icon={<TeamOutlined />}
          label="Community"
          active={selected === "community"}
          onClick={() => setSelected("community")}
        />

        <NavItem
          icon={<InfoCircleOutlined />}
          label="Info"
          active={selected === "info"}
          onClick={() => setSelected("info")}
        />
      </div>
    </Layout>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        color: active ? "#1677ff" : "#666",
        fontWeight: active ? "600" : "400",
      }}
    >
      <div style={{ fontSize: 22 }}>{icon}</div>

      <span
        style={{
          fontSize: 12,
          marginTop: 4,
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default HomePage;