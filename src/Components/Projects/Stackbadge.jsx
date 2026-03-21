import React from "react";

const StackBadge = React.memo(({ tech }) => {
  const iconMap = {
    React: "react",
    "Node.js": "nodejs",
    TypeScript: "ts",
    JavaScript: "js",
    Tailwind: "tailwind",
    Python: "python",
    MongoDB: "mongodb",
    HTML: "html",
    CSS: "css",
    Vite: "vite",
    "Next.js": "nextjs",
  };
  const icon = iconMap[tech];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "3px 8px",
        background: "rgba(139,92,246,0.1)",
        border: "1px solid rgba(139,92,246,0.2)",
        borderRadius: 6,
        fontSize: 11,
        color: "#c3e88d",
        fontFamily: "monospace",
      }}
    >
      {icon && (
        <img
          src={`https://skillicons.dev/icons?i=${icon}`}
          alt={tech}
          style={{ width: 13, height: 13, objectFit: "contain" }}
        />
      )}
      {tech}
    </span>
  );
});

export default StackBadge;
