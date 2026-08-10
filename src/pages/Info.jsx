import React, { useState } from "react";
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
    }
];

function Info() {

    const [selectedDisease, setSelectedDisease] =
        useState(diseases[0]);

    return (
        <div className="info-page">

            {/* Header */}

            <div className="info-header">

                <span className="info-label">
                    🌾 WHEAT CROP GUIDE
                </span>

                <h1>
                    Wheat Disease Information
                </h1>

                <p>
                    Learn how to identify common wheat
                    diseases, understand their causes and
                    protect your crop.
                </p>

            </div>


            {/* Disease Cards */}

            <div className="disease-grid">

                {diseases.map((disease) => (

                    <button
                        key={disease.name}
                        className={
                            selectedDisease.name === disease.name
                                ? "disease-card active"
                                : "disease-card"
                        }
                        onClick={() =>
                            setSelectedDisease(disease)
                        }
                    >

                        <div className="disease-icon">
                            {disease.icon}
                        </div>

                        <div className="disease-card-content">

                            <h3>
                                {disease.name}
                            </h3>

                            <span
                                className={
                                    `severity ${disease.severity.toLowerCase()}`
                                }
                            >
                                {disease.severity} Risk
                            </span>

                        </div>

                    </button>

                ))}

            </div>


            {/* Details */}

            <div className="disease-details">

                <div className="details-title">

                    <div className="large-disease-icon">
                        {selectedDisease.icon}
                    </div>

                    <div>

                        <span>
                            DISEASE INFORMATION
                        </span>

                        <h2>
                            {selectedDisease.name}
                        </h2>

                    </div>

                </div>


                <div className="details-grid">

                    <InfoBox
                        title="Symptoms"
                        icon="🔍"
                        text={selectedDisease.symptoms}
                    />

                    <InfoBox
                        title="Causes"
                        icon="🌦️"
                        text={selectedDisease.causes}
                    />

                    <InfoBox
                        title="Prevention"
                        icon="🛡️"
                        text={selectedDisease.prevention}
                    />

                    <InfoBox
                        title="Management"
                        icon="🌱"
                        text={selectedDisease.management}
                    />

                </div>

            </div>


            {/* AI Section */}

            <div className="ai-info">

                <div className="ai-icon">
                    🤖
                </div>

                <div>

                    <h3>
                        Need a more specific answer?
                    </h3>

                    <p>
                        Upload a wheat leaf image in the
                        disease detection section. Our AI
                        model can identify the disease and
                        provide recommendations.
                    </p>

                </div>

            </div>

        </div>
    );
}


function InfoBox({
    title,
    icon,
    text
}) {

    return (

        <div className="info-box">

            <div className="info-box-title">

                <span>
                    {icon}
                </span>

                <h3>
                    {title}
                </h3>

            </div>

            <p>
                {text}
            </p>

        </div>
    );
}


export default Info;