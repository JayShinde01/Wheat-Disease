
import { useEffect, useMemo, useState } from "react";
import {
  Row,
  Col,
  Card,
  Statistic,
  Table,
  Tag,
  Input,
  Select,
  Button,
  Space,
  Typography,
  Image,
  Spin,
  Alert,
  message,
  Empty,
  Tabs,
  Avatar,
} from "antd";

import {
  DashboardOutlined,
  ExperimentOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  SearchOutlined,
  ReloadOutlined,
  LogoutOutlined,
  BugOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

import { useNavigate } from "react-router-dom";
import api from "../constant/api";
import { logout } from "../service/authService";

const { Title, Text } = Typography;

const CHART_COLORS = [
  "#16a34a",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#64748b",
];

function AdminDashboard() {
  const navigate = useNavigate();

  const [detections, setDetections] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchText, setSearchText] = useState("");
  const [selectedDisease, setSelectedDisease] = useState("ALL");
  const [userSearch, setUserSearch] = useState("");

  // ---------------- API CALLS ----------------

  const fetchDetections = async () => {
    const response = await api.get("/api/disease/all");

    const records = Array.isArray(response.data)
      ? response.data
      : [];

    setDetections(records);
  };

  const fetchUsers = async () => {
    // Assumes AuthController has @RequestMapping("/api/auth")
    const response = await api.get("/api/auth/allusers");

    const records = Array.isArray(response.data)
      ? response.data
      : [];

    setUsers(records);
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const results = await Promise.allSettled([
        fetchDetections(),
        fetchUsers(),
      ]);

      const detectionFailed = results[0].status === "rejected";
      const usersFailed = results[1].status === "rejected";

      if (detectionFailed && usersFailed) {
        throw new Error("Unable to load users and detection records.");
      }

      if (detectionFailed) {
        message.warning("Detection records could not be loaded.");
      }

      if (usersFailed) {
        message.warning("User records could not be loaded.");
      }

      if (detectionFailed || usersFailed) {
        setError(
          "Some dashboard data could not be loaded. Check the API endpoints and permissions."
        );
      }
    } catch (err) {
      console.error("Dashboard loading error:", err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Unable to load dashboard data."
      );

      message.error("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // ---------------- DETECTION DATA HELPERS ----------------

  const getDisease = (record) =>
    String(
      record.disease ||
      record.prediction ||
      record.diseaseName ||
      "Unknown"
    );

  const getEmail = (record) =>
    record.email ||
    record.userEmail ||
    record.user?.email ||
    "N/A";

  const getConfidence = (record) =>
    Number(
      record.confidence ??
      record.confidenceScore ??
      record.accuracy ??
      0
    );

  const getImage = (record) =>
    record.imageUrl ||
    record.image ||
    record.imageURL ||
    null;

  const getDate = (record) =>
    record.createdAt ||
    record.detectionDate ||
    record.date ||
    null;

  const isHealthy = (record) =>
    getDisease(record).toLowerCase().includes("healthy");

  // ---------------- USER DATA HELPERS ----------------

  const getUserName = (user) =>
    user.name ||
    user.fullName ||
    user.username ||
    user.firstName ||
    "Unknown User";

  const getUserEmail = (user) =>
    user.email ||
    user.userEmail ||
    "N/A";

  const getUserRole = (user) =>
    user.role ||
    user.userRole ||
    "USER";

  const getUserDate = (user) =>
    user.createdAt ||
    user.registrationDate ||
    user.joinedAt ||
    null;

  // ---------------- STATISTICS ----------------

  const totalDetections = detections.length;
  const totalUsers = users.length;

  const healthyCount = detections.filter(isHealthy).length;
  const diseasedCount = totalDetections - healthyCount;

  const diseaseTypes = new Set(
    detections.map(getDisease)
  ).size;

  // ---------------- DISEASE PIE CHART ----------------

  const diseaseDistribution = useMemo(() => {
    const counts = {};

    detections.forEach((record) => {
      const disease = getDisease(record);
      counts[disease] = (counts[disease] || 0) + 1;
    });

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
    }));
  }, [detections]);

  // ---------------- DISEASE BAR CHART ----------------

  const diseaseBarData = useMemo(() => {
    const counts = {};

    detections.forEach((record) => {
      const disease = getDisease(record);
      counts[disease] = (counts[disease] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([disease, count]) => ({
        disease,
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [detections]);

  // ---------------- DAILY DETECTION LINE CHART ----------------

  const dailyDetectionData = useMemo(() => {
    const counts = {};

    detections.forEach((record) => {
      const date = getDate(record);

      if (!date) return;

      const parsedDate = new Date(date);

      if (Number.isNaN(parsedDate.getTime())) return;

      const day = parsedDate.toISOString().slice(0, 10);

      counts[day] = (counts[day] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([date, count]) => ({
        date,
        label: new Date(`${date}T00:00:00`).toLocaleDateString(
          "en-IN",
          { day: "2-digit", month: "short" }
        ),
        count,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [detections]);

  // ---------------- DISEASE FILTER ----------------

  const diseaseOptions = useMemo(() => {
    const uniqueDiseases = [
      ...new Set(detections.map(getDisease)),
    ];

    return [
      { label: "All Diseases", value: "ALL" },
      ...uniqueDiseases.map((disease) => ({
        label: disease,
        value: disease,
      })),
    ];
  }, [detections]);

  // ---------------- DETECTION SEARCH ----------------

  const filteredDetections = useMemo(() => {
    return detections.filter((record) => {
      const disease = getDisease(record);
      const email = getEmail(record);

      const search = searchText.toLowerCase();

      const matchesSearch =
        disease.toLowerCase().includes(search) ||
        email.toLowerCase().includes(search);

      const matchesDisease =
        selectedDisease === "ALL" ||
        disease === selectedDisease;

      return matchesSearch && matchesDisease;
    });
  }, [detections, searchText, selectedDisease]);

  // ---------------- USER SEARCH ----------------

  const filteredUsers = useMemo(() => {
    const search = userSearch.toLowerCase();

    return users.filter((user) => {
      return (
        getUserName(user).toLowerCase().includes(search) ||
        getUserEmail(user).toLowerCase().includes(search) ||
        getUserRole(user).toLowerCase().includes(search)
      );
    });
  }, [users, userSearch]);

  // ---------------- LOGOUT ----------------

  const handleLogout = () => {
    logout();
  };

  // ---------------- DETECTION TABLE ----------------

  const detectionColumns = [
    {
      title: "ID",
      key: "id",
      width: 75,
      render: (_, record, index) =>
        record.id || record.detectionId || index + 1,
    },
    {
      title: "Leaf Image",
      key: "image",
      width: 110,
      render: (_, record) => {
        const imageUrl = getImage(record);

        return imageUrl ? (
          <Image
            src={imageUrl}
            width={65}
            height={55}
            style={{
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        ) : (
          <Text type="secondary">No image</Text>
        );
      },
    },
    {
      title: "Disease",
      key: "disease",
      render: (_, record) => (
        <Tag color={isHealthy(record) ? "success" : "volcano"}>
          {getDisease(record)}
        </Tag>
      ),
    },
    {
      title: "Confidence",
      key: "confidence",
      render: (_, record) => {
        const confidence = getConfidence(record);
        return confidence ? `${confidence}%` : "N/A";
      },
    },
    {
      title: "User Email",
      key: "email",
      render: (_, record) => getEmail(record),
    },
    {
      title: "Date",
      key: "date",
      render: (_, record) => {
        const date = getDate(record);

        return date && !Number.isNaN(new Date(date).getTime())
          ? new Date(date).toLocaleString()
          : "N/A";
      },
    },
  ];

  // ---------------- USER TABLE ----------------

  const userColumns = [
    {
      title: "User",
      key: "user",
      render: (_, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <Text strong>{getUserName(record)}</Text>
        </Space>
      ),
    },
    {
      title: "Email",
      key: "email",
      render: (_, record) => getUserEmail(record),
    },
    {
      title: "Role",
      key: "role",
      render: (_, record) => {
        const role = getUserRole(record);

        return (
          <Tag color={role.toUpperCase().includes("ADMIN") ? "purple" : "blue"}>
            {role}
          </Tag>
        );
      },
    },
    {
      title: "Registered On",
      key: "date",
      render: (_, record) => {
        const date = getUserDate(record);

        return date && !Number.isNaN(new Date(date).getTime())
          ? new Date(date).toLocaleDateString()
          : "N/A";
      },
    },
  ];

  // ---------------- ANALYTICS CONTENT ----------------

  const analyticsContent = (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card
            title="Disease Distribution"
            bordered={false}
            style={{ borderRadius: 14, height: "100%" }}
          >
            {diseaseDistribution.length === 0 ? (
              <Empty description="No disease data available" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={diseaseDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {diseaseDistribution.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title="Disease-wise Detection Count"
            bordered={false}
            style={{ borderRadius: 14, height: "100%" }}
          >
            {diseaseBarData.length === 0 ? (
              <Empty description="No detection data available" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={diseaseBarData}
                  margin={{ top: 10, right: 15, left: 0, bottom: 45 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="disease"
                    angle={-25}
                    textAnchor="end"
                    interval={0}
                    height={75}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar
                    dataKey="count"
                    name="Detections"
                    fill="#16a34a"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Card>
        </Col>

        <Col xs={24}>
          <Card
            title="Daily Detection Activity"
            bordered={false}
            style={{ borderRadius: 14 }}
          >
            {dailyDetectionData.length === 0 ? (
              <Empty description="No dated detection records available" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={dailyDetectionData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    name="Detections"
                    stroke="#16a34a"
                    strokeWidth={3}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );

  // ---------------- PAGE UI ----------------

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        padding: 28,
        color: "var(--text-main)",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 28,
        }}
      >
        <Space size="middle">
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "var(--primary-green)",
              display: "grid",
              placeItems: "center",
              color: "white",
              fontSize: 26,
            }}
          >
            <DashboardOutlined />
          </div>

          <div>
            <Title
              level={2}
              style={{
                margin: 0,
                color: "var(--text-main)",
              }}
            >
              Wheat Care AI
            </Title>

            <Text type="secondary">
              Administrator Dashboard
            </Text>
          </div>
        </Space>

        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={fetchDashboardData}
            loading={loading}
          >
            Refresh
          </Button>

          <Button
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Space>
      </div>

      {/* Welcome */}

      <Card
        bordered={false}
        style={{
          marginBottom: 24,
          borderRadius: 14,
          background: "var(--bg-surface)",
        }}
      >
        <Title
          level={4}
          style={{
            marginTop: 0,
            color: "var(--text-main)",
          }}
        >
          Welcome, Administrator 🌾
        </Title>

        <Text type="secondary">
          Monitor registered users, wheat disease predictions,
          and platform activity from one place.
        </Text>
      </Card>

      {/* Error */}

      {error && (
        <Alert
          type="warning"
          showIcon
          message="Some dashboard data is unavailable"
          description={error}
          style={{ marginBottom: 20 }}
        />
      )}

      {/* Statistics */}

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 14 }}>
            <Statistic
              title="Total Users"
              value={totalUsers}
              prefix={<TeamOutlined />}
              loading={loading}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 14 }}>
            <Statistic
              title="Total Detections"
              value={totalDetections}
              prefix={<ExperimentOutlined />}
              loading={loading}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 14 }}>
            <Statistic
              title="Healthy Leaves"
              value={healthyCount}
              valueStyle={{ color: "#16a34a" }}
              prefix={<CheckCircleOutlined />}
              loading={loading}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ borderRadius: 14 }}>
            <Statistic
              title="Diseased Leaves"
              value={diseasedCount}
              valueStyle={{ color: "#dc6b32" }}
              prefix={<WarningOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
      </Row>

      {/* Dashboard Tabs */}

      <Card
        bordered={false}
        style={{
          marginTop: 28,
          borderRadius: 14,
        }}
      >
        <Tabs
          defaultActiveKey="analytics"
          items={[
            {
              key: "analytics",
              label: (
                <span>
                  <DashboardOutlined /> Analytics
                </span>
              ),
              children: analyticsContent,
            },
            {
              key: "users",
              label: (
                <span>
                  <TeamOutlined /> User Management ({totalUsers})
                </span>
              ),
              children: (
                <>
                  <Title level={4}>Registered Users</Title>
                  <Text type="secondary">
                    View all users registered on Wheat Care AI.
                  </Text>

                  <Input
                    size="large"
                    style={{ marginTop: 20, marginBottom: 20 }}
                    prefix={<SearchOutlined />}
                    placeholder="Search by name, email or role..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    allowClear
                  />

                  {loading ? (
                    <div style={{ textAlign: "center", padding: 50 }}>
                      <Spin size="large" />
                    </div>
                  ) : filteredUsers.length === 0 ? (
                    <Empty description="No users found" />
                  ) : (
                    <Table
                      rowKey={(record, index) =>
                        record.id || record.userId || getUserEmail(record) || index
                      }
                      columns={userColumns}
                      dataSource={filteredUsers}
                      scroll={{ x: 750 }}
                      pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} users`,
                      }}
                    />
                  )}
                </>
              ),
            },
            {
              key: "detections",
              label: (
                <span>
                  <BugOutlined /> Detection Management ({totalDetections})
                </span>
              ),
              children: (
                <>
                  <Title level={4}>Detection Records</Title>
                  <Text type="secondary">
                    View and monitor all farmer disease detection records.
                  </Text>

                  <Row
                    gutter={[12, 12]}
                    style={{ marginTop: 20, marginBottom: 20 }}
                  >
                    <Col xs={24} md={14}>
                      <Input
                        size="large"
                        prefix={<SearchOutlined />}
                        placeholder="Search by disease or user email..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        allowClear
                      />
                    </Col>

                    <Col xs={24} md={10}>
                      <Select
                        size="large"
                        style={{ width: "100%" }}
                        value={selectedDisease}
                        options={diseaseOptions}
                        onChange={setSelectedDisease}
                      />
                    </Col>
                  </Row>

                  {loading ? (
                    <div style={{ textAlign: "center", padding: 50 }}>
                      <Spin size="large" />
                    </div>
                  ) : filteredDetections.length === 0 ? (
                    <Empty description="No detection records found" />
                  ) : (
                    <Table
                      rowKey={(record, index) =>
                        record.id || record.detectionId || index
                      }
                      columns={detectionColumns}
                      dataSource={filteredDetections}
                      scroll={{ x: 850 }}
                      pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} records`,
                      }}
                    />
                  )}
                </>
              ),
            },
          ]}
        />
      </Card>

      <div
        style={{
          textAlign: "center",
          marginTop: 28,
          color: "var(--text-muted)",
        }}
      >
        Wheat Care AI · Administrator Panel
      </div>
    </div>
  );
}

export default AdminDashboard;
