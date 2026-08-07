import React, { useState } from "react";
import { predictDisease } from "../service/detectionService";

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
  Empty,
  Spin,
  Divider,
  Space,
  message,
} from "antd";

import {
  UploadOutlined,
  CameraOutlined,
  SearchOutlined,
  HistoryOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

function Detection() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Dummy history
  const history = [
    {
      id: 1,
      image: "https://placehold.co/100x100",
      disease: "Leaf Rust",
      confidence: 96.25,
      date: "Today",
    },
    {
      id: 2,
      image: "https://placehold.co/100x100",
      disease: "Healthy",
      confidence: 99.12,
      date: "Yesterday",
    },
    {
      id: 3,
      image: "https://placehold.co/100x100",
      disease: "Powdery Mildew",
      confidence: 93.84,
      date: "05 Aug 2026",
    },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handlePredict = async () => {
    if (!image) {
      message.warning("Please select an image.");
      return;
    }

    try {
      setLoading(true);

      const response = await predictDisease(image);

      setResult(response);
    } catch (error) {
      console.error(error);
      message.error("Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#f5f7fa",
        minHeight: "100vh",
        padding: 30,
      }}
    >
      {/* Header */}

      <Card
        bordered={false}
        style={{
          borderRadius: 12,
          marginBottom: 25,
        }}
      >
        <Title level={2} style={{ color: "#2e7d32", marginBottom: 0 }}>
          🌾 Wheat Disease Detection
        </Title>

        <Paragraph type="secondary">
          Upload or capture a wheat leaf image and let AI identify the disease.
        </Paragraph>
      </Card>

      {/* Upload + Preview */}

      <Row gutter={[24, 24]}>
        {/* Upload */}

        <Col xs={24} lg={10}>
          <Card title="Upload Image" style={{ borderRadius: 12 }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text strong>Select from Gallery</Text>

              <Upload
                maxCount={1}
                showUploadList={false}
                beforeUpload={(file) => {
                  handleImageChange({
                    target: {
                      files: [file],
                    },
                  });

                  return false;
                }}
              >
                <Button
                  icon={<UploadOutlined />}
                  block
                >
                  Choose Image
                </Button>
              </Upload>

              <Divider />

              <Text strong>Capture from Camera</Text>

              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageChange}
              />

              <Divider />

              <Button
                type="primary"
                size="large"
                icon={<SearchOutlined />}
                loading={loading}
                block
                onClick={handlePredict}
              >
                Predict Disease
              </Button>
            </Space>
          </Card>
        </Col>

        {/* Preview */}

        <Col xs={24} lg={14}>
          <Card title="Image Preview" style={{ borderRadius: 12 }}>
            <div
              style={{
                minHeight: 350,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {loading ? (
                <Spin size="large" />
              ) : preview ? (
                <Image
                  src={preview}
                  width={350}
                  style={{
                    borderRadius: 10,
                  }}
                />
              ) : (
                <Empty description="No Image Selected" />
              )}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Prediction Result */}

      {result && (
        <Card
          title="Prediction Result"
          style={{
            marginTop: 25,
            borderRadius: 12,
          }}
        >
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Text type="secondary">Disease</Text>

              <Title
                level={3}
                style={{
                  marginTop: 8,
                  color: "#2e7d32",
                }}
              >
                {result.prediction}
              </Title>
            </Col>

            <Col xs={24} md={12}>
              <Text type="secondary">Confidence</Text>

              <Progress
                percent={Number(result.confidence)}
                status="active"
                strokeColor="#52c41a"
              />
            </Col>
          </Row>
        </Card>
      )}

      {/* Prediction History */}

      <Card
        style={{
          marginTop: 30,
          borderRadius: 12,
        }}
        title={
          <>
            <HistoryOutlined /> Prediction History
          </>
        }
      >
        <List
          itemLayout="horizontal"
          dataSource={history}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button type="link">
                  View Details
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Image
                    src={item.image}
                    width={70}
                    height={70}
                    style={{
                      borderRadius: 8,
                    }}
                  />
                }
                title={item.disease}
                description={item.date}
              />

              <Tag color="green">
                {item.confidence.toFixed(2)}%
              </Tag>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}

export default Detection;