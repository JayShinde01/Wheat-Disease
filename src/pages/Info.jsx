import React, { useState } from "react";
import { Input, Button } from "antd";
import { SearchOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../i18n/LanguageContext";
import EmptyState from "../component/EmptyState";
import "../styles/Info.css";

const diseases = [
  {
    "className": "Chilli __Whitefly",
    "name": "Chilli Whitefly",
    "icon": "🌶️",
    "severity": "Medium",
    "symptoms": "Tiny white insects gather beneath leaves; leaves may yellow, curl or become sticky.",
    "causes": "Whiteflies feed on sap and can transmit plant viruses.",
    "prevention": "Inspect leaf undersides, remove weeds and use insect screens or reflective mulch where practical.",
    "management": "Conserve natural enemies and use locally approved whitefly controls when monitoring shows a need."
  },
  {
    "className": "Chilli __Yellowish",
    "name": "Chilli Yellowish",
    "icon": "🌶️",
    "severity": "Medium",
    "symptoms": "Chilli foliage becomes pale or yellow, sometimes with slow or uneven growth.",
    "causes": "Yellowing may reflect nutrient deficiency, water stress, pests or disease; a photo alone cannot identify the cause.",
    "prevention": "Check soil moisture, drainage and nutrient status and inspect for insects.",
    "management": "Correct the confirmed underlying cause rather than applying a pesticide based on yellowing alone."
  },
  {
    "className": "Chilli__Anthracnos",
    "name": "Chilli Anthracnose",
    "icon": "🌶️",
    "severity": "High",
    "symptoms": "Dark, sunken lesions can develop on chilli fruits, sometimes with concentric spore masses.",
    "causes": "Colletotrichum fungi survive in infected debris and spread in wet conditions.",
    "prevention": "Use clean seed, rotate crops, improve airflow and remove infected fruits.",
    "management": "Remove affected produce and use locally registered fungicides if diagnosis and local guidance support treatment."
  },
  {
    "className": "Chilli__Damping_Off",
    "name": "Chilli Damping Off",
    "icon": "🌱",
    "severity": "High",
    "symptoms": "Seedlings collapse near the soil line, often with a dark, constricted stem base.",
    "causes": "Soilborne organisms such as Pythium or Rhizoctonia thrive in overly wet seedbeds.",
    "prevention": "Use clean growing media, good drainage and avoid excessive watering.",
    "management": "Remove collapsed seedlings and improve nursery hygiene; seek local advice on suitable seed or soil treatments."
  },
  {
    "className": "Chilli__Leaf_Curl_Virus",
    "name": "Chilli Leaf Curl Virus",
    "icon": "🌶️",
    "severity": "High",
    "symptoms": "Leaves curl and become small or distorted; plants may be stunted.",
    "causes": "Leaf-curl viruses can be spread by sap-feeding insects, especially whiteflies.",
    "prevention": "Use healthy seedlings, manage whiteflies and remove weed hosts.",
    "management": "Remove severely infected plants when advised; control vectors because viral infections have no direct cure."
  },
  {
    "className": "Chilli__Leaf_Spot",
    "name": "Chilli Leaf Spot",
    "icon": "🍃",
    "severity": "Medium",
    "symptoms": "Small brown or dark spots appear on chilli leaves, sometimes with yellow margins.",
    "causes": "Several fungal or bacterial agents can cause leaf spots, especially during humid weather.",
    "prevention": "Avoid overhead irrigation, improve spacing and remove infected residues.",
    "management": "Identify the causal organism before selecting any locally approved treatment."
  },
  {
    "className": "Chilli__Veinal_Mottle_Virus",
    "name": "Chilli Veinal Mottle Virus",
    "icon": "🌶️",
    "severity": "High",
    "symptoms": "Leaves show mottling, vein-associated discoloration and sometimes distortion or stunting.",
    "causes": "Viral infection can spread through insect vectors or infected planting material.",
    "prevention": "Use healthy transplants, control vector insects and sanitize tools.",
    "management": "Remove heavily infected plants as locally advised; there is no direct curative spray for a virus."
  },
  {
    "className": "Chilli___healthy",
    "name": "Chilli Healthy",
    "icon": "✅",
    "severity": "Low",
    "symptoms": "Leaves and fruits appear normally developed without obvious spots, curling or pest damage.",
    "causes": "No clear visible disease symptoms are present in the inspected image.",
    "prevention": "Continue balanced nutrition, suitable irrigation and routine scouting.",
    "management": "Maintain crop care and check again if new symptoms appear."
  },
  {
    "className": "Healthy_Soyabean",
    "name": "Soybean Healthy",
    "icon": "✅",
    "severity": "Low",
    "symptoms": "Soybean foliage appears evenly green with normal shape and no obvious lesions.",
    "causes": "No clear visible disease symptoms are present in the inspected image.",
    "prevention": "Maintain crop rotation, balanced fertility and regular scouting.",
    "management": "Continue routine field management and monitor for changes."
  },
  {
    "className": "Soyabean_Frog_Leaf_Eye",
    "name": "Soybean Frogeye Leaf Spot",
    "icon": "🌿",
    "severity": "Medium",
    "symptoms": "Round leaf spots may have pale centers and darker reddish-purple borders.",
    "causes": "Frogeye leaf spot is caused by Cercospora sojina and is favored by warm, humid conditions.",
    "prevention": "Use resistant varieties, rotate crops and manage infected residue.",
    "management": "Scout disease development and follow regional fungicide recommendations if treatment is warranted."
  },
  {
    "className": "Soyabean_Mosaic",
    "name": "Soybean Mosaic",
    "icon": "🌿",
    "severity": "High",
    "symptoms": "Soybean leaves show light-and-dark green mosaic patterns, puckering or distortion.",
    "causes": "Soybean mosaic virus can be seedborne and spread by aphids.",
    "prevention": "Use tested seed, resistant varieties where available and manage volunteer hosts.",
    "management": "Remove infected plants where practical; viral disease has no direct cure."
  },
  {
    "className": "Soyabean_Spectoria_Brown_Spot",
    "name": "Soybean Septoria Brown Spot",
    "icon": "🌿",
    "severity": "Medium",
    "symptoms": "Small brown spots develop, often first on lower soybean leaves, with possible yellowing.",
    "causes": "Septoria glycines survives in crop residue and spreads with splashing rain.",
    "prevention": "Rotate crops, use tolerant varieties and reduce prolonged leaf wetness.",
    "management": "Monitor severity and use regionally recommended management if economically justified."
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
    "className": "corn_Gray_Leaf_Spot",
    "name": "Corn Gray Leaf Spot",
    "icon": "🌽",
    "severity": "High",
    "symptoms": "Narrow rectangular gray-to-tan lesions form between corn leaf veins.",
    "causes": "Cercospora fungi survive in residue and spread in humid conditions.",
    "prevention": "Use tolerant hybrids, crop rotation and residue management.",
    "management": "Scout upper leaves and follow local fungicide thresholds and recommendations."
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
    "className": "not_a_plant",
    "name": "Not a Plant",
    "icon": "🚫",
    "severity": "None",
    "symptoms": "The uploaded image is classified as not containing a recognizable plant subject.",
    "causes": "This is an image category, not a crop disease or diagnosis.",
    "prevention": "Upload a clear, well-lit photo of the relevant crop leaf or affected plant part.",
    "management": "No treatment applies. Retake the photo with the plant in focus."
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
    "className": "potato_Healthy",
    "name": "Potato Healthy",
    "icon": "✅",
    "severity": "Low",
    "symptoms": "Potato foliage appears normally green without obvious disease lesions.",
    "causes": "No clear visible disease symptoms are present in the inspected image.",
    "prevention": "Use certified seed potatoes, good sanitation and regular crop scouting.",
    "management": "Maintain appropriate irrigation and monitor foliage for changes."
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
    "className": "rice_Bacterial_Leaf_Blight",
    "name": "Rice Bacterial Leaf Blight",
    "icon": "🌾",
    "severity": "High",
    "symptoms": "Yellowing or drying may progress from leaf tips and margins into long blighted areas.",
    "causes": "Xanthomonas oryzae pv. oryzae spreads through infected material and water.",
    "prevention": "Use resistant varieties, clean seed and balanced nitrogen fertilization.",
    "management": "Avoid unnecessary field injury and follow local bacterial-blight management advice."
  },
  {
    "className": "rice_Brown_Spot",
    "name": "Rice Brown Spot",
    "icon": "🌾",
    "severity": "Medium",
    "symptoms": "Oval brown lesions with darker borders appear on rice leaves.",
    "causes": "Bipolaris oryzae can be favored by crop stress and nutrient imbalance.",
    "prevention": "Use quality seed, balanced nutrition and appropriate water management.",
    "management": "Address crop stress and follow locally recommended disease-control practices."
  },
  {
    "className": "rice_Healthy",
    "name": "Rice Healthy",
    "icon": "✅",
    "severity": "Low",
    "symptoms": "Rice leaves look green and upright without obvious spotting or blighting.",
    "causes": "No clear visible disease symptoms are present in the inspected image.",
    "prevention": "Maintain suitable water, nutrients and routine pest monitoring.",
    "management": "Continue normal crop care and scout for new symptoms."
  },
  {
    "className": "rice_Leaf_Blast",
    "name": "Rice Leaf Blast",
    "icon": "🌾",
    "severity": "High",
    "symptoms": "Spindle-shaped lesions with gray centers and brown margins can develop on leaves.",
    "causes": "Magnaporthe oryzae spreads under humid conditions and can be favored by excess nitrogen.",
    "prevention": "Use resistant varieties and balanced fertilization; monitor humid periods.",
    "management": "Seek local advice promptly when blast is suspected and use approved control measures as appropriate."
  },
  {
    "className": "rice_Leaf_scald",
    "name": "Rice Leaf Scald",
    "icon": "🌾",
    "severity": "Medium",
    "symptoms": "Leaf tips or margins show irregular drying with alternating light and dark bands.",
    "causes": "Leaf scald is associated with fungal infection favored by wet growing conditions.",
    "prevention": "Use clean seed, balanced nutrition and field sanitation.",
    "management": "Monitor spread and follow regional rice-disease management recommendations."
  },
  {
    "className": "rice_Sheath_Blight",
    "name": "Rice Sheath Blight",
    "icon": "🌾",
    "severity": "High",
    "symptoms": "Oval green-gray lesions with brown borders develop on lower leaf sheaths and spread upward.",
    "causes": "Rhizoctonia solani is favored by dense stands, humidity and high nitrogen.",
    "prevention": "Avoid excessive nitrogen, use appropriate spacing and manage crop residues.",
    "management": "Scout disease progression and apply locally approved treatment when thresholds justify it."
  },
  {
    "className": "sugarcane_Healthy",
    "name": "Sugarcane Healthy",
    "icon": "✅",
    "severity": "Low",
    "symptoms": "Sugarcane leaves show normal green color and growth without obvious streaks or lesions.",
    "causes": "No clear visible disease symptoms are present in the inspected image.",
    "prevention": "Plant healthy setts, manage nutrition and inspect fields routinely.",
    "management": "Continue standard crop management and monitor for emerging symptoms."
  },
  {
    "className": "sugarcane_Mosaic",
    "name": "Sugarcane Mosaic",
    "icon": "🎋",
    "severity": "High",
    "symptoms": "Leaves display irregular light and dark green mosaic or streak patterns.",
    "causes": "Sugarcane mosaic viruses spread through infected planting material and aphid vectors.",
    "prevention": "Use certified disease-free planting material and resistant varieties where available.",
    "management": "Remove infected stools as locally advised and prevent spread through planting material."
  },
  {
    "className": "sugarcane_RedRot",
    "name": "Sugarcane Red Rot",
    "icon": "🎋",
    "severity": "High",
    "symptoms": "Internal stalk tissue may turn red with pale patches; external symptoms can include drying leaves.",
    "causes": "Colletotrichum falcatum infects sugarcane, often through contaminated setts.",
    "prevention": "Use resistant varieties, healthy setts and good field sanitation.",
    "management": "Remove infected clumps and follow local red-rot management protocols."
  },
  {
    "className": "sugarcane_Rust",
    "name": "Sugarcane Rust",
    "icon": "🎋",
    "severity": "Medium",
    "symptoms": "Orange-brown or dark rust pustules appear on sugarcane leaves.",
    "causes": "Rust fungi spread through windborne spores in favorable humidity and temperature.",
    "prevention": "Use resistant cultivars and regularly inspect young crops.",
    "management": "Follow locally approved rust-control recommendations if infection becomes severe."
  },
  {
    "className": "sugarcane_Yellow",
    "name": "Sugarcane Yellow",
    "icon": "🎋",
    "severity": "Medium",
    "symptoms": "Leaves yellow, sometimes beginning near the midrib or in older foliage.",
    "causes": "Yellowing can result from nutrient or water stress, pests or yellow-leaf disease.",
    "prevention": "Inspect crop vigor, nutrient status and pest pressure; use clean planting material.",
    "management": "Confirm the cause before choosing a treatment or removing plants."
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
    "className": "wheat_Mite",
    "name": "Wheat Mite",
    "icon": "🕷️",
    "severity": "Medium",
    "symptoms": "Leaves may show stippling, yellowing, curling or other feeding damage.",
    "causes": "Mites feed on plant tissues; some species can transmit plant viruses.",
    "prevention": "Scout leaf surfaces, manage volunteer cereals and protect beneficial organisms.",
    "management": "Identify the mite and use locally approved management only when necessary."
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
      item.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
          <button
            className={`filter-chip ${filterSeverity === "LOW" ? "active" : ""}`}
            onClick={() => setFilterSeverity("LOW")}
          >
            Healthy
          </button>
          <button
            className={`filter-chip ${filterSeverity === "NONE" ? "active" : ""}`}
            onClick={() => setFilterSeverity("NONE")}
          >
            Not a Plant
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
              key={disease.className}
              className={
                selectedDisease.className === disease.className
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
