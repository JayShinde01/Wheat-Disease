import React from "react";
import { Skeleton, Card } from "antd";

export function WeatherSkeleton() {
  return (
    <Card
      style={{
        borderRadius: "var(--radius-lg)",
        background: "var(--bg-surface)",
        border: "1px solid var(--border-color)",
      }}
    >
      <Skeleton active avatar paragraph={{ rows: 2 }} />
    </Card>
  );
}

export function CardSkeleton({ rows = 3 }) {
  return (
    <Card
      style={{
        borderRadius: "var(--radius-lg)",
        background: "var(--bg-surface)",
        border: "1px solid var(--border-color)",
      }}
    >
      <Skeleton active paragraph={{ rows }} />
    </Card>
  );
}

export function ListSkeleton({ count = 2 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {Array.from({ length: count }).map((_, idx) => (
        <CardSkeleton key={idx} rows={2} />
      ))}
    </div>
  );
}

export default CardSkeleton;
