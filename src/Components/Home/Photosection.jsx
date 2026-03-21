import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";

import StatCard, {
  IconClock,
  IconRocket,
  IconGithub,
  IconStack,
} from "./StatCard";
import { PHOTOS, ICON_BG } from "./Constants";

const CORNER_THICKNESS = 2.5;
const CORNER_RADIUS = 4;
const CORNER_OFFSET = -8;
const CORNER_SIZE = 22;

const cornerStyle = (pos) => {
  const base = {
    position: "absolute",
    width: CORNER_SIZE,
    height: CORNER_SIZE,
  };
  const map = {
    tl: {
      borderTop: `${CORNER_THICKNESS}px solid #a855f7`,
      borderLeft: `${CORNER_THICKNESS}px solid #a855f7`,
      top: CORNER_OFFSET,
      left: CORNER_OFFSET,
      borderRadius: `${CORNER_RADIUS}px 0 0 0`,
    },
    tr: {
      borderTop: `${CORNER_THICKNESS}px solid #ec4899`,
      borderRight: `${CORNER_THICKNESS}px solid #ec4899`,
      top: CORNER_OFFSET,
      right: CORNER_OFFSET,
      borderRadius: `0 ${CORNER_RADIUS}px 0 0`,
    },
    bl: {
      borderBottom: `${CORNER_THICKNESS}px solid #6366f1`,
      borderLeft: `${CORNER_THICKNESS}px solid #6366f1`,
      bottom: CORNER_OFFSET,
      left: CORNER_OFFSET,
      borderRadius: `0 0 0 ${CORNER_RADIUS}px`,
    },
    br: {
      borderBottom: `${CORNER_THICKNESS}px solid #a855f7`,
      borderRight: `${CORNER_THICKNESS}px solid #a855f7`,
      bottom: CORNER_OFFSET,
      right: CORNER_OFFSET,
      borderRadius: `0 0 ${CORNER_RADIUS}px 0`,
    },
  };
  return { ...base, ...map[pos] };
};

const ProjectsCard = ({ isMobile = false }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const LIVE_PROJECTS = [
    {
      name: t("projects.about.title"),
      tech: "React · Tailwind",
      status: t("projects.statusLive"),
      hash: "https://about-bl2.pages.dev/",
    },
    {
      name: t("projects.weather.title"),
      tech: "React · OpenWeatherMap",
      status: t("projects.statusLive"),
      hash: "https://weather-3ib.pages.dev/",
    },
    {
      name: t("projects.todo.title"),
      tech: "React",
      status: t("projects.statusLive"),
      hash: "https://todo-app-985.pages.dev/",
    },
    {
      name: t("projects.face_id.title"),
      tech: "Python · TensorFlow",
      status: t("projects.statusLive"),
      hash: "https://face-id.pages.dev/",
    },
    {
      name: t("projects.mu6.title"),
      tech: "React · Node.js",
      status: t("projects.statusLive"),
      hash: "https://musix-6vo.pages.dev/",
    },
  ];

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => !isMobile && setOpen(true)}
      onMouseLeave={() => !isMobile && setOpen(false)}
      onClick={() => isMobile && setOpen((v) => !v)}
    >
      <div
        style={{
          background: "#0d0d14",
          border: `1px solid ${open ? "#a855f7" : "#2a2a3d"}`,
          borderRadius: "10px",
          padding: "7px 12px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          whiteSpace: "nowrap",
          cursor: "default",
          transition: "border-color 0.2s",
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "7px",
            background: ICON_BG.rocket,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <IconRocket />
        </div>
        <div>
          <div
            style={{ fontSize: "10px", color: "#556", fontFamily: "monospace" }}
          >
            {t("me.stats.projectsLabel")}
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "#c3e88d",
              fontFamily: "monospace",
              fontWeight: 500,
            }}
          >
            {t("me.stats.projectsValue")}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 6 : -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isMobile ? 6 : -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              ...(isMobile
                ? { top: "calc(100% + 8px)", left: 0 }
                : { bottom: "calc(100% + 8px)", left: 0 }),
              background: "#0d0d14",
              border: "1px solid #2a2a3d",
              borderRadius: "12px",
              padding: "8px",
              minWidth: "210px",
              boxShadow: "0 0 24px rgba(168,85,247,0.12)",
              zIndex: 30,
            }}
          >
            <div
              style={{
                fontSize: "10px",
                color: "#556",
                fontFamily: "monospace",
                padding: "4px 8px 8px",
                borderBottom: "1px solid #1e1e30",
                marginBottom: "6px",
                letterSpacing: "0.05em",
              }}
            >
              live_projects.json
            </div>
            {LIVE_PROJECTS.map((proj, i) => (
              <motion.a
                href={proj.hash}
                target="_blank"
                rel="noopener noreferrer"
                key={proj.name}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "6px 8px",
                  borderRadius: "7px",
                  cursor: "default",
                  gap: "12px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#13131f")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#c3e88d",
                      fontFamily: "monospace",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {proj.name}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#446",
                      fontFamily: "monospace",
                      marginTop: "1px",
                    }}
                  >
                    {proj.tech}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "#28c840",
                      display: "inline-block",
                      animation: "pulse 2s ease-in-out infinite",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "9px",
                      color: "#28c840",
                      fontFamily: "monospace",
                    }}
                  >
                    {proj.status}
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Fotoğraf kutusu + köşe bracket'lar + scan line + badge
const PhotoFrame = ({
  activeIdx,
  direction,
  variants,
  shouldReduceMotion,
  t,
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.7, delay: 0.2 }}
    style={{ position: "relative", flexShrink: 0 }}
  >
    <div
      className="w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] lg:w-[300px] lg:h-[300px]"
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        position: "relative",
        border: "1px solid #2a2a3d",
      }}
    >
      <AnimatePresence custom={direction} mode="wait">
        <motion.img
          key={activeIdx}
          src={PHOTOS[activeIdx].src}
          alt={`Atakan Çoban ${activeIdx + 1}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: PHOTOS[activeIdx].position,
          }}
        />
      </AnimatePresence>
    </div>

    {["tl", "tr", "bl", "br"].map((pos, i) => (
      <motion.div
        key={pos}
        style={cornerStyle(pos)}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 + i * 0.08, duration: 0.3 }}
      />
    ))}

    <motion.div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        height: "2px",
        background:
          "linear-gradient(90deg, transparent, rgba(168,85,247,0.6), transparent)",
        borderRadius: "1px",
        pointerEvents: "none",
      }}
      animate={shouldReduceMotion ? {} : { top: ["0%", "100%", "0%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    />

    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.4, duration: 0.3 }}
      style={{
        position: "absolute",
        bottom: "-16px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#0d0d14",
        border: "1px solid #1e1e30",
        borderRadius: "999px",
        padding: "4px 12px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "11px",
        color: "#c3e88d",
        fontFamily: "monospace",
        whiteSpace: "nowrap",
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
      {t("me.available")}: true
      <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.6;transform:scale(1.3)}}`}</style>
    </motion.div>
  </motion.div>
);

const PhotoSection = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);

  const select = (i) => {
    setDirection(i > activeIdx ? 1 : -1);
    setActiveIdx(i);
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}
    >
      {/* MOBİL: stat kartları üstte yatay */}
      <div className="flex lg:hidden flex-wrap justify-center gap-2 w-full">
        <StatCard
          style={{ position: "relative" }}
          iconBg={ICON_BG.clock}
          icon={<IconClock />}
          label={t("me.stats.workHoursLabel")}
          value={t("me.stats.workHoursValue")}
        />
        <StatCard
          style={{ position: "relative" }}
          iconBg={ICON_BG.github}
          icon={<IconGithub />}
          label={t("me.stats.githubLabel")}
          value="atakancobanjs"
        />
        <StatCard
          style={{ position: "relative" }}
          iconBg={ICON_BG.stack}
          icon={<IconStack />}
          label={t("me.stats.stackLabel")}
          value="React · Node · TS"
        />
        <ProjectsCard isMobile={true} />
      </div>

      {/* MASAÜSTÜ: sol kartlar — fotoğraf — sağ kartlar (hepsi normal flow) */}
      <div className="hidden lg:flex items-center gap-4">
        {/* Sol stat kartları */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <StatCard
            style={{ position: "relative" }}
            iconBg={ICON_BG.github}
            icon={<IconGithub />}
            label={t("me.stats.githubLabel")}
            value="atakancobanjs"
          />
          <StatCard
            style={{ position: "relative" }}
            iconBg={ICON_BG.stack}
            icon={<IconStack />}
            label={t("me.stats.stackLabel")}
            value="React · Node · TS"
          />
        </div>

        {/* Fotoğraf */}
        <PhotoFrame
          activeIdx={activeIdx}
          direction={direction}
          variants={variants}
          shouldReduceMotion={shouldReduceMotion}
          t={t}
        />

        {/* Sağ stat kartları */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <StatCard
            style={{ position: "relative" }}
            iconBg={ICON_BG.clock}
            icon={<IconClock />}
            label={t("me.stats.workHoursLabel")}
            value={t("me.stats.workHoursValue")}
          />
          <ProjectsCard isMobile={false} />
        </div>
      </div>

      {/* MOBİL: sadece fotoğraf */}
      <div className="flex lg:hidden">
        <PhotoFrame
          activeIdx={activeIdx}
          direction={direction}
          variants={variants}
          shouldReduceMotion={shouldReduceMotion}
          t={t}
        />
      </div>

      {/* Thumbnail grid */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginTop: "24px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {PHOTOS.map((photo, i) => (
          <motion.div
            key={i}
            onClick={() => select(i)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 sm:w-12 sm:h-12"
            style={{
              borderRadius: "8px",
              overflow: "hidden",
              cursor: "pointer",
              border:
                activeIdx === i ? "2px solid #a855f7" : "1px solid #2a2a3d",
              transition: "border-color 0.2s",
              flexShrink: 0,
              position: "relative",
            }}
          >
            <img
              src={photo.src}
              alt={`foto ${i + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
              }}
            />
            {activeIdx === i && (
              <>
                <div
                  style={{
                    position: "absolute",
                    top: 1,
                    left: 1,
                    width: 5,
                    height: 5,
                    borderTop: "1.5px solid #a855f7",
                    borderLeft: "1.5px solid #a855f7",
                    borderRadius: "2px 0 0 0",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 1,
                    right: 1,
                    width: 5,
                    height: 5,
                    borderTop: "1.5px solid #ec4899",
                    borderRight: "1.5px solid #ec4899",
                    borderRadius: "0 2px 0 0",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 1,
                    left: 1,
                    width: 5,
                    height: 5,
                    borderBottom: "1.5px solid #6366f1",
                    borderLeft: "1.5px solid #6366f1",
                    borderRadius: "0 0 0 2px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 1,
                    right: 1,
                    width: 5,
                    height: 5,
                    borderBottom: "1.5px solid #a855f7",
                    borderRight: "1.5px solid #a855f7",
                    borderRadius: "0 0 2px 0",
                  }}
                />
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PhotoSection;
