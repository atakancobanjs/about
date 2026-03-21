import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiExternalLink } from "react-icons/fi";

import { TOKEN_COLORS, getLevelColor } from "./Constants";

import { useTranslation } from "react-i18next";

const SkillModal = ({ skill, onClose }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!skill) return null;

  const modalLines = [
    [{ t: "p", v: "{" }],
    [
      { t: "k", v: '  "name"' },
      { t: "p", v: ": " },
      { t: "s", v: `"${skill.title}"` },
      { t: "p", v: "," },
    ],
    [
      { t: "k", v: '  "category"' },
      { t: "p", v: ": " },
      { t: "s", v: `"${skill.category}"` },
      { t: "p", v: "," },
    ],
    [
      { t: "k", v: '  "level"' },
      { t: "p", v: ": " },
      { t: "s", v: `"${skill.level}"` },
      { t: "p", v: "," },
    ],
    [
      { t: "k", v: '  "inUse"' },
      { t: "p", v: ": " },
      { t: "n", v: "true" },
    ],
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
          maxWidth: 460,
          boxShadow: "0 0 60px rgba(139,92,246,0.15)",
          position: "relative",
        }}
      >
        {/* Kapat */}
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

        <div
          style={{
            background: "#13131f",
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            borderBottom: "1px solid #1e1e30",
          }}
        >
          <img
            src={skill.icon}
            alt={skill.title}
            style={{ width: 52, height: 52, objectFit: "contain" }}
          />
          <div>
            <h3
              style={{
                color: "#c3e88d",
                fontFamily: "monospace",
                fontSize: 20,
                fontWeight: 600,
                margin: "0 0 6px",
              }}
            >
              {skill.title}
            </h3>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getLevelColor(skill.level)}`}
              style={{ fontFamily: "monospace" }}
            >
              {skill.level}
            </span>
          </div>
        </div>

        <div style={{ padding: "20px 24px 24px" }}>
          {/* Açıklama */}
          <p
            style={{
              color: "#888",
              fontSize: 13,
              lineHeight: 1.8,
              marginBottom: 18,
              fontFamily: "monospace",
            }}
          >
            {t(skill.description)}
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
              marginBottom: 18,
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

          <a
            href={skill.href}
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
            <FiExternalLink size={15} />
            {t("skills.viewDocs")}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkillModal;
