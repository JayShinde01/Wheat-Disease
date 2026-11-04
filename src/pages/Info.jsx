import React, { useState } from "react";
import { Input, Button, Tag } from "antd";
import { SearchOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../i18n/LanguageContext";
import EmptyState from "../component/EmptyState";
import "../styles/Info.css";

const diseases = [
  {
    name: "Yellow Rust",
    icon: "🟡",
    severity: "High",
    symptoms:
      "Yellow to orange-yellow stripes or small pustules appear mainly along wheat leaves.",
    causes:
      "Favored by cool and humid weather. Wind can spread spores between plants and fields.",
    prevention:
      "Use resistant varieties, maintain good field management, and regularly inspect the crop.",
    management:
      "Early detection is important. Follow locally recommended fungicide practices when necessary."
  },
  {
    name: "Brown Rust",
    icon: "🟤",
    severity: "Medium",
    symptoms:
      "Small orange-brown to reddish-brown pustules appear scattered across the leaf surface.",
    causes:
      "Warm conditions with sufficient moisture can favor disease development and spread.",
    prevention:
      "Grow resistant varieties and monitor the crop regularly, especially during favorable weather.",
    management:
      "Remove severe sources where practical and follow recommended disease-management practices."
  },
  {
    name: "Leaf Blight",
    icon: "🍂",
    severity: "High",
    symptoms:
      "Brown or tan lesions develop on leaves and may expand, causing leaves to dry prematurely.",
    causes:
      "High humidity, moisture on leaves and infected crop residues can contribute to disease development.",
    prevention:
      "Use healthy seed, manage crop residues and avoid conditions that keep foliage wet for long periods.",
    management:
      "Monitor affected areas and use locally recommended fungicide treatment when required."
  },
  {
    name: "Septoria",
    icon: "🟤",
    severity: "Medium",
    symptoms:
      "Irregular brown or yellowish leaf lesions may appear with dark specks inside older lesions.",
    causes:
      "Moist conditions and infected plant residues can help the pathogen survive and spread.",
    prevention:
      "Use resistant varieties where available, manage residues and maintain good crop practices.",
    management:
      "Regular field monitoring and timely disease-management measures can reduce crop damage."
  },
  {
    name: "Smut",
    icon: "⚫",
    severity: "High",
    symptoms:
      "Infected wheat heads may contain dark masses of fungal spores instead of healthy grain.",
    causes:
      "The disease can be associated with infected seed and soil-borne fungal spores.",
    prevention:
      "Use certified disease-free seed and resistant varieties where available.",
    management:
      "Use appropriate seed-treatment practices and follow local agricultural recommendations."
  },
  {
    name: "Mildew",
    icon: "⚪",
    severity: "Medium",
    symptoms:
      "White or gray powdery growth can appear on leaves and other green plant parts.",
    causes:
      "Cool, humid conditions and dense crop growth can favor mildew development.",
    prevention:
      "Maintain suitable plant spacing, avoid excessive nitrogen and use resistant varieties where possible.",
    management:
      "Monitor early symptoms and use recommended disease-control measures when necessary."
  },
  {
    name: "Tomato Bacterial Spot",
    icon: "🍅",
    severity: "High",
    symptoms:
      "Small dark spots develop on tomato leaves, stems and fruit, sometimes surrounded by yellow halos.",
    causes:
      "Bacteria can spread through infected seed, plant material, splashing water and wet foliage.",
    prevention:
      "Use disease-free seed, avoid overhead watering and provide good spacing for air circulation.",
    management:
      "Remove severely affected plant parts and follow locally recommended bacterial-disease treatments."
  },
  {
    name: "Tomato Early Blight",
    icon: "🍅",
    severity: "Medium",
    symptoms:
      "Brown spots with concentric rings appear on older tomato leaves and may cause premature leaf drop.",
    causes:
      "The fungus is favored by warm, humid conditions and can survive in infected crop debris.",
    prevention:
      "Rotate crops, remove infected debris and water at the soil surface instead of wetting leaves.",
    management:
      "Prune affected leaves when practical and use recommended fungicide practices."
  },
  {
    name: "Tomato Healthy",
    icon: "✅",
    severity: "Low",
    symptoms:
      "Leaves are green and intact, with normal growth and no visible signs of disease or pest damage.",
    causes:
      "Healthy plants have sufficient nutrition, water and growing conditions with no active disease symptoms.",
    prevention:
      "Continue regular scouting, balanced nutrition, proper watering and good garden sanitation.",
    management:
      "Maintain current care practices and monitor plants for any changes."
  },
  {
    name: "Tomato Late Blight",
    icon: "🍅",
    severity: "High",
    symptoms:
      "Water-soaked dark lesions spread quickly across leaves, stems and fruit during cool, wet weather.",
    causes:
      "The pathogen spreads rapidly through wind-blown spores and prolonged leaf wetness.",
    prevention:
      "Use resistant varieties where available, improve air circulation and avoid overhead irrigation.",
    management:
      "Remove infected material promptly and apply locally recommended fungicide treatments."
  },
  {
    name: "Tomato Leaf Mold",
    icon: "🍃",
    severity: "Medium",
    symptoms:
      "Pale yellow patches appear on upper leaf surfaces with olive or gray mold growth underneath.",
    causes:
      "High humidity, poor ventilation and wet leaves favor leaf mold development.",
    prevention:
      "Improve ventilation, reduce humidity and avoid wetting foliage during irrigation.",
    management:
      "Remove affected leaves and use recommended disease-control measures when needed."
  },
  {
    name: "Tomato Septoria Leaf Spot",
    icon: "🍅",
    severity: "Medium",
    symptoms:
      "Small circular spots with dark margins and pale centers develop on older tomato leaves.",
    causes:
      "The fungus spreads through infected debris and splashing water, especially in wet conditions.",
    prevention:
      "Rotate crops, remove plant debris and keep foliage dry with adequate plant spacing.",
    management:
      "Remove lower affected leaves and follow recommended fungicide practices."
  },
  {
    name: "Tomato Spider Mites",
    icon: "🕷️",
    severity: "Medium",
    symptoms:
      "Fine webbing, stippled leaves and yellowing may appear as mites feed on tomato foliage.",
    causes:
      "Hot, dry conditions can allow two-spotted spider mite populations to increase quickly.",
    prevention:
      "Inspect leaf undersides regularly, reduce plant stress and preserve beneficial insects.",
    management:
      "Use a strong water spray or an approved mite-control treatment according to its label."
  },
  {
    name: "Tomato Target Spot",
    icon: "🍅",
    severity: "Medium",
    symptoms:
      "Brown circular lesions with concentric rings develop on leaves and may affect tomato fruit.",
    causes:
      "Warm, humid weather and infected plant debris support fungal spread.",
    prevention:
      "Use crop rotation, remove debris and improve airflow around plants.",
    management:
      "Remove affected tissue and use locally recommended fungicide treatments."
  },
  {
    name: "Tomato Yellow Leaf Curl Virus",
    icon: "🍅",
    severity: "High",
    symptoms:
      "Leaves curl upward, become yellow and plants may remain stunted with reduced fruit production.",
    causes:
      "The virus is mainly spread by infected whiteflies feeding on tomato plants.",
    prevention:
      "Use healthy transplants, control whiteflies and remove severely infected plants.",
    management:
      "Control the insect vector and follow local recommendations for virus management."
  },
  {
    name: "Tomato Mosaic Virus",
    icon: "🍅",
    severity: "High",
    symptoms:
      "Leaves may show mottled light and dark green patterns, distortion and reduced plant growth.",
    causes:
      "The virus can spread through infected plant material, contaminated tools and handling.",
    prevention:
      "Use clean seed and tools, wash hands and remove infected plants promptly.",
    management:
      "Isolate and remove infected plants because there is no direct cure for the virus."
  },
  {
    name: "Corn Blight",
    icon: "🌽",
    severity: "High",
    symptoms:
      "Long gray-green or brown lesions develop on corn leaves and can reduce photosynthesis.",
    causes:
      "Fungal spores spread through wind and rain, particularly during warm, humid weather.",
    prevention:
      "Plant resistant hybrids, rotate crops and manage infected crop residue.",
    management:
      "Monitor fields early and follow locally recommended fungicide practices when necessary."
  },
  {
    name: "Corn Common Rust",
    icon: "🌽",
    severity: "Medium",
    symptoms:
      "Small reddish-brown rust pustules appear on both sides of corn leaves.",
    causes:
      "Wind-borne fungal spores spread the disease when temperatures are moderate and humidity is high.",
    prevention:
      "Use resistant hybrids and maintain good crop management practices.",
    management:
      "Scout regularly and use recommended fungicide treatment for severe or early infections."
  },
  {
    name: "Corn Healthy",
    icon: "✅",
    severity: "Low",
    symptoms:
      "Corn leaves are green and upright with normal growth and no visible disease symptoms.",
    causes:
      "Healthy plants are growing under suitable conditions without active disease or pest pressure.",
    prevention:
      "Continue balanced fertilization, proper irrigation, crop rotation and regular scouting.",
    management:
      "Maintain current crop-care practices and monitor for changes."
  },
  {
    name: "Potato Early Blight",
    icon: "🥔",
    severity: "Medium",
    symptoms:
      "Dark lesions with concentric rings appear on older potato leaves and may cause defoliation.",
    causes:
      "The fungus is favored by warm conditions, plant stress and infected crop residue.",
    prevention:
      "Use healthy seed, rotate crops, maintain plant vigor and remove infected debris.",
    management:
      "Monitor lower leaves and use locally recommended fungicide practices when required."
  },
  {
    name: "Potato Late Blight",
    icon: "🥔",
    severity: "High",
    symptoms:
      "Water-soaked dark lesions rapidly expand on potato leaves, stems and tubers.",
    causes:
      "Cool, wet weather supports rapid spread of spores between plants.",
    prevention:
      "Use resistant varieties, certified seed and avoid prolonged leaf wetness.",
    management:
      "Remove infected material and apply recommended fungicide treatment promptly."
  },
  {
    name: "Wheat Aphid",
    icon: "🐜",
    severity: "Medium",
    symptoms:
      "Small aphids cluster on wheat leaves or heads, causing curling, yellowing and reduced vigor.",
    causes:
      "Aphid populations increase in favorable weather and may spread between plants.",
    prevention:
      "Scout regularly, protect beneficial insects and maintain healthy crop growth.",
    management:
      "Use biological or locally approved insect-control measures when thresholds are exceeded."
  },
  {
    name: "Wheat Healthy",
    icon: "✅",
    severity: "Low",
    symptoms:
      "Wheat plants have healthy green leaves and normal growth without visible disease symptoms.",
    causes:
      "Healthy plants are growing under suitable conditions without active disease or pest pressure.",
    prevention:
      "Use quality seed, balanced nutrition, proper irrigation and regular field scouting.",
    management:
      "Continue good crop-management practices and monitor the field throughout the season."
  }
];

function Info() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedDisease, setSelectedDisease] = useState(diseases[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("ALL");

  const filteredDiseases = diseases.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.symptoms.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeverity =
      filterSeverity === "ALL" ||
      item.severity.toUpperCase() === filterSeverity;

    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="info-page">
      {/* HEADER */}
      <div className="info-header">
        <span className="info-label">{t("info.badge")}</span>
        <h1>{t("info.title")}</h1>
        <p>{t("info.subtitle")}</p>
      </div>

      {/* TOOLBAR: SEARCH & FILTERS */}
      <div className="info-toolbar">
        <div className="info-search">
          <Input
            placeholder={t("info.searchPlaceholder")}
            prefix={<SearchOutlined style={{ color: "var(--primary-green)" }} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            allowClear
            size="large"
            style={{ borderRadius: "var(--radius-md)" }}
          />
        </div>

        <div className="filter-tags">
          <button
            className={`filter-chip ${filterSeverity === "ALL" ? "active" : ""}`}
            onClick={() => setFilterSeverity("ALL")}
          >
            {t("info.allDiseases")}
          </button>
          <button
            className={`filter-chip ${filterSeverity === "HIGH" ? "active" : ""}`}
            onClick={() => setFilterSeverity("HIGH")}
          >
            {t("info.highRiskFilter")}
          </button>
          <button
            className={`filter-chip ${filterSeverity === "MEDIUM" ? "active" : ""}`}
            onClick={() => setFilterSeverity("MEDIUM")}
          >
            {t("info.mediumRiskFilter")}
          </button>
        </div>
      </div>

      {/* DISEASE CARDS GRID */}
      {filteredDiseases.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No matching diseases found"
          description="Try modifying your search or severity filter."
        />
      ) : (
        <div className="disease-grid">
          {filteredDiseases.map((disease) => (
            <button
              key={disease.name}
              className={
                selectedDisease.name === disease.name
                  ? "disease-card active"
                  : "disease-card"
              }
              onClick={() => setSelectedDisease(disease)}
            >
              <div className="disease-icon">{disease.icon}</div>
              <div className="disease-card-content">
                <h3>{disease.name}</h3>
                <span className={`severity ${disease.severity.toLowerCase()}`}>
                  {disease.severity} Risk
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* SELECTED DISEASE DETAILS */}
      {selectedDisease && (
        <div className="disease-details">
          <div className="details-title">
            <div className="large-disease-icon">{selectedDisease.icon}</div>
            <div>
              <span>DISEASE INFORMATION</span>
              <h2>{selectedDisease.name}</h2>
            </div>
          </div>

          <div className="details-grid">
            <InfoBox
              title={t("info.symptoms")}
              icon="🔍"
              text={selectedDisease.symptoms}
            />
            <InfoBox
              title={t("info.causes")}
              icon="🌦️"
              text={selectedDisease.causes}
            />
            <InfoBox
              title={t("info.prevention")}
              icon="🛡️"
              text={selectedDisease.prevention}
            />
            <InfoBox
              title={t("info.management")}
              icon="🌱"
              text={selectedDisease.management}
            />
          </div>
        </div>
      )}

      {/* AI SCANNER CALLOUT */}
      <div className="ai-info">
        <div className="ai-icon">🤖</div>
        <div style={{ flex: 1 }}>
          <h3>{t("info.aiBannerTitle")}</h3>
          <p>{t("info.aiBannerDesc")}</p>
        </div>
        <Button
          type="primary"
          icon={<ArrowRightOutlined />}
          onClick={() => navigate("/detection")}
          style={{
            background: "var(--primary-green)",
            borderColor: "var(--primary-green)",
            height: 42,
            fontWeight: 600,
          }}
        >
          {t("info.scanButton")}
        </Button>
      </div>
    </div>
  );
}

function InfoBox({ title, icon, text }) {
  return (
    <div className="info-box">
      <div className="info-box-title">
        <span>{icon}</span>
        <h3>{title}</h3>
      </div>
      <p>{text}</p>
    </div>
  );
}

export default Info;
