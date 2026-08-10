import React from "react";
import { Button } from "antd";

function EmptyState({
  icon = "🌱",
  title = "No data found",
  description = "Get started by taking action.",
  actionText,
  onAction,
  style = {},
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
        background: "var(--bg-surface)",
        borderRadius: "var(--radius-lg)",
        border: "1px dashed var(--border-color)",
        ...style,
      }}
    >
      <div
        style={{
          fontSize: 48,
          marginBottom: 12,
          lineHeight: 1,
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: "var(--text-main)",
          marginBottom: 6,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 14,
          color: "var(--text-muted)",
          maxWidth: 380,
          marginBottom: actionText ? 20 : 0,
        }}
      >
        {description}
      </p>
      {actionText && (
        <Button
          type="primary"
          onClick={onAction}
          style={{
            background: "var(--primary-green)",
            borderColor: "var(--primary-green)",
          }}
        >
          {actionText}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
