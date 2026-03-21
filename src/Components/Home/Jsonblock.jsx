import React, { useMemo, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { TOKEN_COLORS, makeJsonLines } from "./jsonLines";
import { getAge } from "./constants";

const JsonLine = ({ tokens, lineNo, visible }) => {
  const firstVal = tokens[0]?.v ?? "";
  const indentMatch = firstVal.match(/^(\s+)/);
  const indent = indentMatch ? indentMatch[1].length : 0;

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        minHeight: "20px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(4px)",
        transition: "opacity 0.12s ease, transform 0.12s ease",
      }}
    >
      <span
        style={{
          color: "#3a3a5c",
          fontSize: "10px",
          minWidth: "18px",
          textAlign: "right",
          userSelect: "none",
          paddingTop: "2px",
          flexShrink: 0,
        }}
      >
        {lineNo}
      </span>
      <span
        style={{
          flex: 1,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          paddingLeft: `${indent * 7}px`,
          textIndent: `-${indent * 7}px`,
          fontFamily:
            "'Fira Code', 'Cascadia Code', 'JetBrains Mono', 'Courier New', monospace",
          fontSize: "clamp(10px, 1.5vw, 13.5px)",
          lineHeight: "1.75",
        }}
      >
        {tokens.map((tok, i) => (
          <span key={i} style={{ color: TOKEN_COLORS[tok.t] }}>
            {tok.v}
          </span>
        ))}
      </span>
    </div>
  );
};

const JsonBlock = ({ onDone }) => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const age = getAge();
  const JSON_LINES = useMemo(() => makeJsonLines(t, age), []);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setVisibleCount(JSON_LINES.length);
      onDone?.();
      return;
    }
    let i = 0;
    let running = true;
    const tick = () => {
      if (!running) return;
      i++;
      setVisibleCount(i);
      if (i >= JSON_LINES.length) {
        onDone?.();
        return;
      }
      setTimeout(tick, 70);
    };
    setTimeout(tick, 100);
    return () => {
      running = false;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: "#0d0d14",
        border: "1px solid #1e1e30",
        borderRadius: "14px",
        overflow: "hidden",
        width: "100%",
        boxShadow: "0 0 40px rgba(168,85,247,0.08)",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          background: "#13131f",
          padding: "9px 14px",
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
              flexShrink: 0,
            }}
          />
        ))}
        <span
          style={{
            fontSize: "11px",
            color: "#555577",
            marginLeft: "8px",
            fontFamily: "monospace",
            letterSpacing: "0.03em",
          }}
        >
          atakan.json
        </span>
      </div>

      {/* Code body */}
      <div style={{ padding: "14px 16px 16px" }}>
        {JSON_LINES.map((tokens, i) => (
          <JsonLine
            key={i}
            tokens={tokens}
            lineNo={i + 1}
            visible={i < visibleCount}
          />
        ))}
        {visibleCount >= JSON_LINES.length && (
          <div style={{ display: "flex", gap: "10px", marginTop: "1px" }}>
            <span style={{ minWidth: "18px" }} />
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
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </motion.div>
  );
};

export default JsonBlock;
