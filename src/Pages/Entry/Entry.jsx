import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ── Terminal satırları ────────────────────────────────────────────────────────
const LINES = [
  { type: "cmd", text: "npm run dev" },
  { type: "empty", text: "" },
  {
    type: "out",
    parts: [
      { c: "#a855f7", t: "  >" },
      { c: "#ccc", t: " portfolio@1.0.0" },
      { c: "#89ddff", t: " dev" },
    ],
  },
  {
    type: "out",
    parts: [
      { c: "#a855f7", t: "  >" },
      { c: "#ccc", t: " vite --host" },
    ],
  },
  { type: "empty", text: "" },
  {
    type: "out",
    parts: [
      { c: "#89ddff", t: "  VITE" },
      { c: "#ccc", t: " v5.4.2" },
      { c: "#546e7a", t: " ready in" },
      { c: "#f78c6c", t: " 312" },
      { c: "#546e7a", t: " ms" },
    ],
  },
  { type: "empty", text: "" },
  {
    type: "out",
    parts: [
      { c: "#546e7a", t: "  ➜  Local:   " },
      { c: "#89ddff", t: "http://localhost:5173/" },
    ],
  },
  {
    type: "out",
    parts: [
      { c: "#546e7a", t: "  ➜  Network: " },
      { c: "#89ddff", t: "http://192.168.1.42:5173/" },
    ],
  },
  {
    type: "out",
    parts: [
      { c: "#546e7a", t: "  ➜  press " },
      { c: "#ccc", t: "h" },
      { c: "#546e7a", t: " + enter to show help" },
    ],
  },
  { type: "empty", text: "" },
];

// Her satırın ne zaman gösterileceği (ms)
const DELAYS = [0, 500, 620, 780, 900, 1020, 1180, 1340, 1500, 1650, 1800];

// Progress bar başlangıcı
const PROGRESS_START = 2000;

const TerminalSplash = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [visibleCount, setVisibleCount] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  // Partiküller
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      })),
    [],
  );

  // Satırları sırayla göster
  useEffect(() => {
    const timers = DELAYS.map((d, i) =>
      setTimeout(() => setVisibleCount((c) => Math.max(c, i + 1)), d),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Progress bar
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setShowProgress(true);
      let p = 0;
      const iv = setInterval(() => {
        p += 2;
        setProgress(p);
        if (p >= 100) {
          clearInterval(iv);
          setExiting(true);
          setTimeout(() => navigate("/home"), 500);
        }
      }, 22);
      return () => clearInterval(iv);
    }, PROGRESS_START);
    return () => clearTimeout(startTimer);
  }, [navigate]);

  return (
    <motion.div
      animate={{ opacity: exiting ? 0 : 1, scale: exiting ? 1.04 : 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      {/* Gradient blob'lar */}
      <motion.div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.12), transparent 70%)",
          left: "-12%",
          bottom: "-12%",
          pointerEvents: "none",
        }}
        animate={{ x: [-20, 40, -20], y: [-20, 30, -20], scale: [1, 1.15, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.1), transparent 70%)",
          right: "-10%",
          top: "-10%",
          pointerEvents: "none",
        }}
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Partiküller */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #ec4899, #a855f7)",
            pointerEvents: "none",
          }}
          animate={{ y: [0, -24, 0], opacity: [0.1, 0.5, 0.1] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Noise */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" opacity="0.04" />
      </svg>

      {/* Terminal penceresi */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          background: "#0d0d14",
          border: "1px solid #1e1e30",
          borderRadius: "14px",
          overflow: "hidden",
          width: "100%",
          maxWidth: "600px",
          boxShadow: "0 0 60px rgba(168,85,247,0.1), 0 0 0 1px #1e1e30",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            background: "#13131f",
            padding: "11px 18px",
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
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: c,
                display: "inline-block",
                flexShrink: 0,
              }}
            />
          ))}
          <span
            style={{
              fontSize: "12px",
              color: "#555577",
              marginLeft: "10px",
              fontFamily: "monospace",
            }}
          >
            ~/portfolio — zsh
          </span>
          {/* Sağda canlı gösterge */}
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#28c840",
                display: "inline-block",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "10px",
                color: "#28c840",
                fontFamily: "monospace",
              }}
            >
              running
            </span>
          </div>
        </div>

        {/* Terminal gövdesi */}
        <div
          style={{
            padding: "18px 22px 22px",
            fontFamily:
              "'Fira Code','Cascadia Code','JetBrains Mono','Courier New',monospace",
            fontSize: "clamp(11px, 1.8vw, 13px)",
            lineHeight: 1.8,
          }}
        >
          {LINES.map((line, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 8,
                minHeight: "22px",
                opacity: i < visibleCount ? 1 : 0,
                transform:
                  i < visibleCount ? "translateY(0)" : "translateY(4px)",
                transition: "opacity 0.15s ease, transform 0.15s ease",
              }}
            >
              {line.type === "cmd" && (
                <>
                  <span style={{ color: "#546e7a", flexShrink: 0 }}>
                    atakan@dev:~$
                  </span>
                  <span style={{ color: "#c3e88d" }}>{line.text}</span>
                </>
              )}
              {line.type === "empty" && <span>&nbsp;</span>}
              {line.type === "out" && (
                <span>
                  {line.parts.map((part, j) => (
                    <span key={j} style={{ color: part.c }}>
                      {part.t}
                    </span>
                  ))}
                </span>
              )}
            </div>
          ))}

          {/* Progress + success satırı */}
          <AnimatePresence>
            {showProgress && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Başarı mesajı */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  <span style={{ color: "#28c840" }}>✓</span>
                  <span style={{ color: "#c3e88d" }}>opening portfolio</span>
                  <span style={{ color: "#546e7a", fontSize: "11px" }}>
                    ({Math.round(progress)}%)
                  </span>
                </div>

                {/* Progress bar */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      color: "#546e7a",
                      fontSize: "11px",
                      flexShrink: 0,
                    }}
                  >
                    loading
                  </span>
                  <div
                    style={{
                      flex: 1,
                      maxWidth: 220,
                      height: 3,
                      background: "#1e1e30",
                      borderRadius: 999,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${progress}%`,
                        background:
                          "linear-gradient(90deg, #ec4899, #a855f7, #6366f1)",
                        borderRadius: 999,
                        transition: "width 0.02s linear",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      color: "#546e7a",
                      fontSize: "11px",
                      flexShrink: 0,
                    }}
                  >
                    {progress < 100
                      ? "▓".repeat(Math.floor(progress / 10)) +
                        "░".repeat(10 - Math.floor(progress / 10))
                      : "▓▓▓▓▓▓▓▓▓▓"}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cursor */}
          {!showProgress && visibleCount >= LINES.length && (
            <div style={{ marginTop: 2 }}>
              <span
                style={{
                  display: "inline-block",
                  width: 7,
                  height: 14,
                  background: "#a855f7",
                  animation: "blink 1s step-end infinite",
                  borderRadius: "1px",
                  verticalAlign: "middle",
                }}
              />
            </div>
          )}
        </div>
      </motion.div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
      `}</style>
    </motion.div>
  );
};

export default TerminalSplash;
