import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiExternalLink, FiX } from "react-icons/fi";
import { BsRocket } from "react-icons/bs";

import StackBadge from "./StackBadge";
import { TOKEN_COLORS } from "./constants";

const ProjectModal = ({ project, onClose }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!project) return null;

  const modalLines = [
    [{ t: "p", v: "{" }],
    [
      { t: "k", v: '  "status"' },
      { t: "p", v: ": " },
      { t: "n", v: '"live"' },
      { t: "p", v: "," },
    ],
    [
      { t: "k", v: '  "date"' },
      { t: "p", v: ": " },
      { t: "s", v: `"${project.date}"` },
      { t: "p", v: "," },
    ],
    ...(project.stack
      ? [
          [
            { t: "k", v: '  "stack"' },
            { t: "p", v: ": [" },
            ...project.stack.flatMap((s, i) => [
              { t: "s", v: `"${s}"` },
              ...(i < project.stack.length - 1 ? [{ t: "p", v: ", " }] : []),
            ]),
            { t: "p", v: "]," },
          ],
        ]
      : []),
    [{ t: "p", v: "}" }],
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        backdropFilter: "blur(6px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0d0d14",
          border: "1px solid #2a2a3d",
          borderRadius: 20,
          overflow: "hidden",
          width: "100%",
          maxWidth: 520,
          boxShadow: "0 0 60px rgba(139,92,246,0.15)",
          position: "relative",
        }}
      >
        {/* Kapat butonu */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 10,
            background: "rgba(0,0,0,0.5)",
            border: "1px solid #2a2a3d",
            borderRadius: 8,
            padding: "5px 7px",
            color: "#888",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FiX size={15} />
        </button>

        {/* Görsel */}
        {project.image_url && (
          <div
            style={{ height: 200, overflow: "hidden", position: "relative" }}
          >
            <img
              src={project.image_url}
              alt={project.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, transparent 40%, #0d0d14)",
              }}
            />
            <div style={{ position: "absolute", top: 12, left: 12 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "4px 10px",
                  background: "rgba(34,197,94,0.15)",
                  border: "1px solid rgba(34,197,94,0.4)",
                  borderRadius: 999,
                  fontSize: 11,
                  color: "#4ade80",
                  fontFamily: "monospace",
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "#4ade80",
                    display: "inline-block",
                  }}
                />
                {t("projects.statusLive")}
              </span>
            </div>
          </div>
        )}

        {/* İçerik */}
        <div style={{ padding: "20px 24px 24px" }}>
          <h3
            style={{
              color: "#c3e88d",
              fontFamily: "monospace",
              fontSize: 18,
              fontWeight: 600,
              margin: "0 0 8px",
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              color: "#888",
              fontSize: 13,
              lineHeight: 1.7,
              marginBottom: 16,
              fontFamily: "monospace",
            }}
          >
            {project.description}
          </p>

          {/* JSON detaylar */}
          <div
            style={{
              background: "#13131f",
              borderRadius: 10,
              padding: "12px 14px",
              fontFamily: "monospace",
              fontSize: 12,
              lineHeight: 1.8,
              marginBottom: 16,
            }}
          >
            {modalLines.map((tokens, i) => (
              <div key={i} style={{ display: "flex", gap: 4, minHeight: 20 }}>
                <span
                  style={{
                    color: "#3a3a5c",
                    fontSize: 10,
                    minWidth: 14,
                    textAlign: "right",
                    userSelect: "none",
                    paddingTop: 2,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ whiteSpace: "pre-wrap" }}>
                  {tokens.map((tok, j) => (
                    <span key={j} style={{ color: TOKEN_COLORS[tok.t] }}>
                      {tok.v}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>

          {/* Stack badge'leri */}
          {project.stack && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                marginBottom: 20,
              }}
            >
              {project.stack.map((tech) => (
                <StackBadge key={tech} tech={tech} />
              ))}
            </div>
          )}

          {/* Siteyi aç */}
          <a
            href={project.hash}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "11px 20px",
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              borderRadius: 12,
              color: "#fff",
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <BsRocket size={15} />
            {t("projects.visitProject")}
            <FiExternalLink size={13} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
