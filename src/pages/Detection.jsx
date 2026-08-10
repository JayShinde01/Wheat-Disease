import React, { useEffect, useState } from "react";
import { predictDisease, getDetectionByUserId } from "../service/detectionService";
import { useTranslation } from "../i18n/LanguageContext";
import EmptyState from "../component/EmptyState";
import { CardSkeleton } from "../component/LoadingSkeleton";

import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Upload,
  Image,
  Progress,
  List,
  Tag,
  Spin,
  Divider,
  Space,
  Modal,
  message,
} from "antd";

import {
  UploadOutlined,
  CameraOutlined,
  SearchOutlined,
  HistoryOutlined,
  ExperimentOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  FileImageOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

function Detection() {
  const { t } = useTranslation();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setHistoryLoading(true);
      const data = await getDetectionByUserId();
      setHistory(data || []);
    } catch (err) {
      console.error("Failed to load history:", err);
      // Fallback silent handle to keep UI clean
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleImageChange = (file) => {
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handlePredict = async () => {
    if (!image) {
      message.warning(t("detection.noImageSelected") || "Please select an image.");
      return;
    }

    try {
      setLoading(true);
      const response = await predictDisease(image);
      setResult(response);
      message.success("Analysis complete!");
      // Reload history to include new prediction
      loadHistory();
    } catch (error) {
      console.error(error);
      message.error(t("common.somethingWentWrong") || "Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        animation: "fadeIn 0.3s ease-out",
      }}
    >
      {/* HEADER BANNER */}
      <Card
        bordered={false}
        style={{
          borderRadius: "var(--radius-lg)",
          background: "linear-gradient(135deg, rgba(46, 125, 50, 0.1) 0%, rgba(22, 101, 52, 0.04) 100%)",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "var(--radius-md)",
              background: "var(--primary-green)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
            }}
          >
            📷
          </div>
          <div>
            <Title level={2} style={{ margin: 0, fontWeight: 800, color: "var(--text-main)", fontSize: 22 }}>
              {t("detection.title")}
            </Title>
            <Paragraph type="secondary" style={{ margin: 0, fontSize: 14 }}>
              {t("detection.subtitle")}
            </Paragraph>
          </div>
        </div>
      </Card>

      {/* UPLOAD & PREVIEW GRID */}
      <Row gutter={[20, 20]}>
        {/* UPLOAD PANEL */}
        <Col xs={24} lg={11}>
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <UploadOutlined style={{ color: "var(--primary-green)" }} />
                <span>{t("detection.uploadCardTitle")}</span>
              </div>
            }
            style={{
              borderRadius: "var(--radius-lg)",
              background: "var(--bg-surface)",
              border: "1px solid var(--border-color)",
              boxShadow: "var(--shadow-sm)",
              height: "100%",
            }}
          >
            <Space direction="vertical" style={{ width: "100%" }} size="middle">
              {/* DRAG & DROP / FILE SELECTION */}
              <Upload.Dragger
                maxCount={1}
                showUploadList={false}
                beforeUpload={(file) => {
                  handleImageChange(file);
                  return false;
                }}
                style={{
                  background: "var(--bg-surface-secondary)",
                  border: "2px dashed var(--primary-green)",
                  borderRadius: "var(--radius-md)",
                  padding: "20px 10px",
                }}
              >
                <p className="ant-upload-drag-icon">
                  <FileImageOutlined style={{ fontSize: 38, color: "var(--primary-green)" }} />
                </p>
                <p className="ant-upload-text" style={{ fontWeight: 600, color: "var(--text-main)" }}>
                  {t("detection.dragDrop")}
                </p>
                <p className="ant-upload-hint" style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  Supports JPG, PNG wheat leaf images
                </p>
              </Upload.Dragger>

              <Divider style={{ margin: "12px 0", color: "var(--text-muted)" }}>OR</Divider>

              {/* CAMERA CAPTURE */}
              <div>
                <Text strong style={{ display: "block", marginBottom: 8, color: "var(--text-main)" }}>
                  {t("detection.cameraLabel")}
                </Text>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    width: "100%",
                    padding: "10px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-color)",
                    background: "var(--bg-surface-secondary)",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "var(--text-main)",
                    transition: "all var(--transition-fast)",
                  }}
                >
                  <CameraOutlined style={{ color: "var(--primary-green)", fontSize: 18 }} />
                  <span>Take Photo with Camera</span>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={(e) => handleImageChange(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </label>
              </div>

              <Button
                type="primary"
                size="large"
                icon={<SearchOutlined />}
                loading={loading}
                disabled={!image}
                block
                onClick={handlePredict}
                style={{
                  height: 48,
                  fontWeight: 700,
                  fontSize: 16,
                  background: "var(--primary-green)",
                  borderColor: "var(--primary-green)",
                  marginTop: 10,
                }}
              >
                {loading ? t("detection.analyzing") : t("detection.predictButton")}
              </Button>
            </Space>
          </Card>
        </Col>

        {/* PREVIEW PANEL */}
        <Col xs={24} lg={13}>
          <Card
            title={
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <ExperimentOutlined style={{ color: "var(--primary-green)" }} />
                <span>{t("detection.previewTitle")}</span>
              </div>
            }
            style={{
              borderRadius: "var(--radius-lg)",
              background: "var(--bg-surface)",
              border: "1px solid var(--border-color)",
              boxShadow: "var(--shadow-sm)",
              height: "100%",
            }}
          >
            <div
              style={{
                minHeight: 320,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "var(--bg-surface-secondary)",
                borderRadius: "var(--radius-md)",
                padding: 16,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {loading ? (
                <div style={{ textAlign: "center" }}>
                  <Spin size="large" />
                  <Text style={{ display: "block", marginTop: 16, fontWeight: 600, color: "var(--primary-green)" }}>
                    {t("detection.analyzing")}
                  </Text>
                </div>
              ) : preview ? (
                <Image
                  src={preview}
                  alt="Wheat Leaf Preview"
                  style={{
                    maxHeight: 300,
                    objectFit: "contain",
                    borderRadius: "var(--radius-md)",
                  }}
                />
              ) : (
                <EmptyState
                  icon="🍃"
                  title={t("detection.noImageSelected")}
                  description={t("detection.dragDrop")}
                  style={{ background: "transparent", border: "none" }}
                />
              )}
            </div>
          </Card>
        </Col>
      </Row>

      {/* PREDICTION RESULT CARD */}
      {result && (
        <Card
          bordered={false}
          style={{
            borderRadius: "var(--radius-lg)",
            background: "var(--bg-surface)",
            border: "2px solid var(--primary-green)",
            boxShadow: "var(--shadow-md)",
            animation: "fadeIn 0.4s ease-out",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <CheckCircleOutlined style={{ fontSize: 24, color: "var(--primary-green)" }} />
            <Title level={3} style={{ margin: 0, fontWeight: 800, color: "var(--text-main)" }}>
              {t("detection.resultTitle")}
            </Title>
          </div>

          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} md={12}>
              <Text type="secondary" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>
                {t("detection.diseaseLabel")}
              </Text>
              <Title
                level={2}
                style={{
                  marginTop: 4,
                  marginBottom: 8,
                  color: "var(--primary-green)",
                  fontWeight: 800,
                  fontSize: 28,
                }}
              >
                {result.prediction || result.disease || "Healthy Crop"}
              </Title>
              <Tag color="green" style={{ fontSize: 13, padding: "4px 12px", borderRadius: "var(--radius-full)" }}>
                Analysis Complete
              </Tag>
            </Col>

            <Col xs={24} md={12}>
              <div style={{ background: "var(--bg-surface-secondary)", padding: 16, borderRadius: "var(--radius-md)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <Text strong style={{ color: "var(--text-main)" }}>{t("detection.confidenceLabel")}</Text>
                  <Text strong style={{ color: "var(--primary-green)" }}>
                    {result.confidence ? `${Number(result.confidence).toFixed(1)}%` : "N/A"}
                  </Text>
                </div>
                <Progress
                  percent={Number(result.confidence) || 0}
                  status="active"
                  strokeColor={{
                    "0%": "#10b981",
                    "100%": "#2e7d32",
                  }}
                />
              </div>
            </Col>
          </Row>
        </Card>
      )}

      {/* PREDICTION HISTORY */}
      <Card
        style={{
          borderRadius: "var(--radius-lg)",
          background: "var(--bg-surface)",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--shadow-sm)",
        }}
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <HistoryOutlined style={{ color: "var(--primary-green)" }} />
            <span>{t("detection.historyTitle")}</span>
          </div>
        }
      >
        {historyLoading ? (
          <CardSkeleton rows={2} />
        ) : history.length === 0 ? (
          <EmptyState
            icon="🌱"
            title={t("detection.noHistory")}
            description={t("detection.noHistoryDesc")}
          />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={history}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    type="link"
                    key="view"
                    onClick={() => setSelectedHistoryItem(item)}
                    style={{ fontWeight: 600, color: "var(--primary-green)" }}
                  >
                    {t("detection.viewDetails")}
                  </Button>,
                ]}
                style={{
                  padding: "16px 0",
                  borderBottom: "1px solid var(--border-color)",
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Image
                      src={item.imageUrl}
                      width={64}
                      height={64}
                      style={{
                        borderRadius: "var(--radius-md)",
                        objectFit: "cover",
                      }}
                    />
                  }
                  title={
                    <span style={{ fontWeight: 700, fontSize: 16, color: "var(--text-main)" }}>
                      {item.disease || item.prediction}
                    </span>
                  }
                  description={
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                      {item.detectedAt ? new Date(item.detectedAt).toLocaleString() : "Recently"}
                    </span>
                  }
                />

                <Tag color="green" style={{ fontSize: 14, fontWeight: 700, padding: "4px 10px", borderRadius: 8 }}>
                  {item.confidence ? `${Number(item.confidence).toFixed(1)}%` : "100%"}
                </Tag>
              </List.Item>
            )}
          />
        )}
      </Card>

      {/* HISTORY DETAIL MODAL */}
      <Modal
        title={selectedHistoryItem?.disease || "Detection Detail"}
        open={!!selectedHistoryItem}
        onCancel={() => setSelectedHistoryItem(null)}
        footer={[
          <Button key="close" onClick={() => setSelectedHistoryItem(null)}>
            Close
          </Button>,
        ]}
      >
        {selectedHistoryItem && (
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <Image
              src={selectedHistoryItem.imageUrl}
              style={{ maxHeight: 250, borderRadius: 12, marginBottom: 16 }}
            />
            <Title level={4} style={{ color: "var(--primary-green)", margin: 0 }}>
              {selectedHistoryItem.disease}
            </Title>
            <Text type="secondary" style={{ display: "block", marginBottom: 12 }}>
              Confidence: {selectedHistoryItem.confidence?.toFixed(1)}%
            </Text>
            <Text style={{ color: "var(--text-muted)" }}>
              Detected on {selectedHistoryItem.detectedAt ? new Date(selectedHistoryItem.detectedAt).toLocaleString() : "Recorded"}
            </Text>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Detection;