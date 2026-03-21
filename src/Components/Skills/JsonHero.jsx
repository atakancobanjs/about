import React, { useState, useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { TOKEN_COLORS, makeSkillsLines } from "./Constants";

const JsonHero = React.memo(({ expertCount, totalCount }) => {
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const lines = useMemo(
    () => makeSkillsLines(t, expertCount, totalCount),
    [i18n.language, expertCount, totalCount],
  );
  const [visibleCount, setVisibleCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setVisibleCount(0);
    setDone(false);
    if (shouldReduceMotion) {
      setVisibleCount(lines.length);
      setDone(true);
      return;
    }
    let i = 0,
      running = true;
    const tick = () => {
      if (!running) return;
      i++;
      setVisibleCount(i);
      if (i >= lines.length) {
        setDone(true);
        return;
      }
      setTimeout(tick, 75);
    };
    setTimeout(tick, 200);
    return () => {
      running = false;
    };
  }, [i18n.language, shouldReduceMotion]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: "#0d0d14",
        border: "1px solid #1e1e30",
        borderRadius: "14px",
        overflow: "hidden",
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
        boxShadow: "0 0 40px rgba(139,92,246,0.08)",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          background: "#13131f",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: "7px",
          borderBottom: "1px solid #1e1e30",
        }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span
            key={c}
            style={{
              width: 11,
              height: 11,
              borderRadius: "50%",
              background: c,
              display: "inline-block",
            }}
          />
        ))}
        <span
          style={{
            fontSize: "11px",
            color: "#555577",
            marginLeft: "8px",
            fontFamily: "monospace",
          }}
        >
          skills.json
        </span>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#a855f7",
              display: "inline-block",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontSize: "10px",
              color: "#a855f7",
              fontFamily: "monospace",
            }}
          >
            {t("skills.status")}
          </span>
        </div>
      </div>

      {/* Code body */}
      <div style={{ padding: "14px 18px 16px" }}>
        {lines.map((tokens, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "12px",
              minHeight: "22px",
              opacity: i < visibleCount ? 1 : 0,
              transform: i < visibleCount ? "translateY(0)" : "translateY(4px)",
              transition: "opacity 0.12s ease, transform 0.12s ease",
            }}
          >
            <span
              style={{
                color: "#3a3a5c",
                fontSize: "11px",
                minWidth: "16px",
                textAlign: "right",
                userSelect: "none",
                paddingTop: "2px",
                flexShrink: 0,
              }}
            >
              {i + 1}
            </span>
            <span
              style={{
                flex: 1,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                fontFamily: "'Fira Code','Cascadia Code',monospace",
                fontSize: "clamp(11px, 1.4vw, 13px)",
                lineHeight: "1.75",
              }}
            >
              {tokens.map((tok, j) => (
                <span key={j} style={{ color: TOKEN_COLORS[tok.t] }}>
                  {tok.v}
                </span>
              ))}
            </span>
          </div>
        ))}
        {done && (
          <div style={{ display: "flex", gap: "12px", marginTop: "1px" }}>
            <span style={{ minWidth: "16px" }} />
            <span
              style={{
                display: "inline-block",
                width: "2px",
                height: "15px",
                background: "#a855f7",
                animation: "blink 1s step-end infinite",
                borderRadius: "1px",
              }}
            />
          </div>
        )}
      </div>
      <style>{`
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.6;transform:scale(1.3)}}
      `}</style>
    </motion.div>
  );
});

export default JsonHero;
