import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { BsFillStarFill, BsGithub } from "react-icons/bs";
import { GoRepoForked } from "react-icons/go";
import { MdOutlineBalance, MdUpdate } from "react-icons/md";
import {
  FiExternalLink,
  FiCode,
  FiFilter,
  FiChevronDown,
  FiX,
} from "react-icons/fi";
import { useTranslation } from "react-i18next";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

import pp_1 from "../../Public/profile_photo_1.jpg";
import pp_2 from "../../Public/profile_photo_2.jpg";
import pp_3 from "../../Public/profile_photo_3.jpeg";
import pp_4 from "../../Public/profile_photo_4.jpeg";
import pp_5 from "../../Public/profile_photo_5.jpeg";

const TOKEN_COLORS = {
  k: "#c792ea",
  s: "#c3e88d",
  n: "#f78c6c",
  p: "#89ddff",
  cm: "#546e7a",
};

const makeAboutLines = (t) => [
  [{ t: "p", v: "{" }],
  [
    { t: "k", v: '  "name"' },
    { t: "p", v: ": " },
    { t: "s", v: '"Atakan Çoban"' },
    { t: "p", v: "," },
  ],
  [
    { t: "k", v: '  "title"' },
    { t: "p", v: ": " },
    { t: "s", v: `"${t("about.hero.title")}"` },
    { t: "p", v: "," },
  ],
  [
    { t: "k", v: '  "passion"' },
    { t: "p", v: ": " },
    { t: "s", v: '"web & masaüstü geliştirme"' },
    { t: "p", v: "," },
  ],
  [
    { t: "k", v: '  "learning"' },
    { t: "p", v: ": " },
    { t: "n", v: "true" },
    { t: "p", v: "," },
  ],
  [
    { t: "k", v: '  "description"' },
    { t: "p", v: ": " },
  ],
  [
    { t: "s", v: `    "${t("about.hero.description")}"` },
    { t: "p", v: "," },
  ],
  [
    { t: "k", v: '  "openToWork"' },
    { t: "p", v: ": " },
    { t: "n", v: "true" },
  ],
  [{ t: "p", v: "}" }],
];

const JsonHero = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const lines = useMemo(() => makeAboutLines(t), [t]);
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
    setTimeout(tick, 300);
    return () => {
      running = false;
    };
  }, [t, shouldReduceMotion]);

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
        maxWidth: "640px",
        boxShadow: "0 0 40px rgba(139,92,246,0.08)",
      }}
    >
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
          about.json
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
            {t("about.status")}
          </span>
        </div>
      </div>
      <div style={{ padding: "16px 20px 18px" }}>
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
                fontFamily:
                  "'Fira Code','Cascadia Code','JetBrains Mono',monospace",
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
};

const CORNER_THICKNESS = 2.5;
const CORNER_OFFSET = -8;
const CORNER_SIZE = 22;
const CORNER_RADIUS = 4;

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

const ProfilePhoto = () => {
  const shouldReduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const photos = [pp_1, pp_2, pp_3, pp_4, pp_5];

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(
      () => setCurrent((c) => (c + 1) % photos.length),
      3500,
    );
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      style={{ position: "relative", flexShrink: 0 }}
    >
      <div
        style={{
          width: 200,
          height: 200,
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #2a2a3d",
          position: "relative",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={photos[current]}
            alt="Atakan Çoban"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              position: "absolute",
              inset: 0,
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
          transition={{ delay: 0.4 + i * 0.08 }}
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
          pointerEvents: "none",
        }}
        animate={shouldReduceMotion ? {} : { top: ["0%", "100%", "0%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <div
        style={{
          display: "flex",
          gap: 5,
          justifyContent: "center",
          marginTop: 12,
        }}
      >
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? 16 : 6,
              height: 6,
              borderRadius: 3,
              background: i === current ? "#a855f7" : "#2a2a3d",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s",
              padding: 0,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

const useCountUp = (target, duration = 1200) => {
  const [value, setValue] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    if (target === 0) return;
    const start = performance.now();
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);

  return value;
};

const StatCard = ({ value, label, color, borderColor }) => {
  const count = useCountUp(value);
  return (
    <div
      className={`bg-gradient-to-br ${color} backdrop-blur-sm rounded-xl border ${borderColor} p-4 text-center`}
    >
      <div
        className={`text-3xl font-bold ${label.includes("repo") || label.includes("Repo") ? "text-violet-400" : label.includes("Star") || label.includes("star") ? "text-yellow-400" : label.includes("Fork") || label.includes("fork") ? "text-blue-400" : "text-green-400"}`}
      >
        {count}
      </div>
      <div className="text-sm text-gray-400 mt-1">{label}</div>
    </div>
  );
};

const NativeSelect = ({ value, onChange, options, icon }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} style={{ position: "relative", minWidth: 180 }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          padding: "9px 14px",
          background: "rgba(17,17,27,0.8)",
          border: `1px solid ${open ? "#8b5cf6" : "rgb(55,65,81)"}`,
          borderRadius: 12,
          color: "rgb(209,213,219)",
          cursor: "pointer",
          fontSize: 14,
          transition: "border-color 0.2s",
          backdropFilter: "blur(8px)",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {icon}
          {selected?.label ?? value}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown size={14} style={{ color: "#8b5cf6" }} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              left: 0,
              right: 0,
              background: "#0d0d14",
              border: "1px solid #2a2a3d",
              borderRadius: 12,
              padding: 6,
              zIndex: 50,
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "8px 10px",
                  background:
                    opt.value === value
                      ? "rgba(139,92,246,0.15)"
                      : "transparent",
                  border: "none",
                  borderRadius: 8,
                  color: opt.value === value ? "#a855f7" : "rgb(209,213,219)",
                  cursor: "pointer",
                  fontSize: 13,
                  transition: "background 0.15s",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
                onMouseEnter={(e) => {
                  if (opt.value !== value)
                    e.currentTarget.style.background = "rgba(139,92,246,0.08)";
                }}
                onMouseLeave={(e) => {
                  if (opt.value !== value)
                    e.currentTarget.style.background = "transparent";
                }}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Spinner = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        border: "3px solid #1e1e30",
        borderTopColor: "#8b5cf6",
      }}
    />
  </div>
);

const RepoModal = ({ repo, onClose, getLanguageColor, formatDate, t }) => {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!repo) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        backdropFilter: "blur(4px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0d0d14",
          border: "1px solid #2a2a3d",
          borderRadius: 20,
          padding: 28,
          width: "100%",
          maxWidth: 520,
          boxShadow: "0 0 60px rgba(139,92,246,0.15)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "#1a1a2e",
            border: "1px solid #2a2a3d",
            borderRadius: 8,
            padding: "5px 8px",
            color: "#888",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FiX size={16} />
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <BsGithub size={22} style={{ color: "#888" }} />
          <h3
            style={{
              color: "#c3e88d",
              fontFamily: "monospace",
              fontSize: 18,
              fontWeight: 600,
              margin: 0,
            }}
          >
            {repo.name}
          </h3>
        </div>

        <p
          style={{
            color: "#888",
            fontSize: 14,
            lineHeight: 1.7,
            marginBottom: 20,
            fontFamily: "monospace",
          }}
        >
          {repo.description || t("about.projects.noDescription")}
        </p>

        <div
          style={{
            background: "#13131f",
            borderRadius: 12,
            padding: "14px 16px",
            fontFamily: "monospace",
            fontSize: 13,
            lineHeight: 1.8,
            marginBottom: 20,
          }}
        >
          {repo.language && (
            <div>
              <span style={{ color: TOKEN_COLORS.k }}>"language"</span>
              <span style={{ color: TOKEN_COLORS.p }}>: </span>
              <span style={{ color: TOKEN_COLORS.s }}>"{repo.language}"</span>
            </div>
          )}
          <div>
            <span style={{ color: TOKEN_COLORS.k }}>"stars"</span>
            <span style={{ color: TOKEN_COLORS.p }}>: </span>
            <span style={{ color: TOKEN_COLORS.n }}>
              {repo.stargazers_count}
            </span>
          </div>
          <div>
            <span style={{ color: TOKEN_COLORS.k }}>"forks"</span>
            <span style={{ color: TOKEN_COLORS.p }}>: </span>
            <span style={{ color: TOKEN_COLORS.n }}>{repo.forks}</span>
          </div>
          <div>
            <span style={{ color: TOKEN_COLORS.k }}>"license"</span>
            <span style={{ color: TOKEN_COLORS.p }}>: </span>
            <span style={{ color: TOKEN_COLORS.s }}>
              "{repo.license?.spdx_id || t("about.projects.noLicense")}"
            </span>
          </div>
          <div>
            <span style={{ color: TOKEN_COLORS.k }}>"updated"</span>
            <span style={{ color: TOKEN_COLORS.p }}>: </span>
            <span style={{ color: TOKEN_COLORS.s }}>
              "{formatDate(repo.updated_at)}"
            </span>
          </div>
          <div>
            <span style={{ color: TOKEN_COLORS.k }}>"openIssues"</span>
            <span style={{ color: TOKEN_COLORS.p }}>: </span>
            <span style={{ color: TOKEN_COLORS.n }}>
              {repo.open_issues_count}
            </span>
          </div>
          <div>
            <span style={{ color: TOKEN_COLORS.k }}>"visibility"</span>
            <span style={{ color: TOKEN_COLORS.p }}>: </span>
            <span style={{ color: TOKEN_COLORS.s }}>"{repo.visibility}"</span>
          </div>
        </div>

        <a
          href={repo.html_url}
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
          <BsGithub size={18} />
          GitHub'da Aç
          <FiExternalLink size={14} />
        </a>
      </motion.div>
    </motion.div>
  );
};

const About = () => {
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [sortBy, setSortBy] = useState("updated");
  const [selectedRepo, setSelectedRepo] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "https://api.github.com/users/atakancobanjs/repos?per_page=100",
        );
        setRepos(data);
        setFilteredRepos(data);
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
      setLoading(false);
    };
    fetchRepos();
  }, []);

  useEffect(() => {
    let filtered = [...repos];
    if (selectedLanguage !== "all")
      filtered = filtered.filter((r) => r.language === selectedLanguage);
    filtered.sort((a, b) => {
      if (sortBy === "stars") return b.stargazers_count - a.stargazers_count;
      if (sortBy === "forks") return b.forks - a.forks;
      if (sortBy === "updated")
        return new Date(b.updated_at) - new Date(a.updated_at);
      return 0;
    });
    setFilteredRepos(filtered);
  }, [selectedLanguage, sortBy, repos]);

  const languages = useMemo(
    () => [...new Set(repos.map((r) => r.language).filter(Boolean))],
    [repos],
  );
  const totalStars = useMemo(
    () => repos.reduce((acc, r) => acc + r.stargazers_count, 0),
    [repos],
  );
  const totalForks = useMemo(
    () => repos.reduce((acc, r) => acc + r.forks, 0),
    [repos],
  );

  const getLanguageColor = (lang) => {
    const map = {
      JavaScript: "from-yellow-400/10 to-yellow-600/10",
      TypeScript: "from-blue-500/10 to-blue-700/10",
      Python: "from-blue-400/10 to-blue-600/10",
      HTML: "from-orange-500/10 to-red-600/10",
      CSS: "from-blue-400/10 to-purple-500/10",
    };
    return map[lang] || "from-gray-500/10 to-gray-700/10";
  };

  const getLanguageDot = (lang) => {
    const map = {
      JavaScript: "#f7c948",
      TypeScript: "#3178c6",
      Python: "#3b82f6",
      HTML: "#e34c26",
      CSS: "#264de4",
      "C++": "#a855f7",
      Ruby: "#cc342d",
      Go: "#00add8",
    };
    return map[lang] || "#888";
  };

  const formatDate = (dateString) => {
    const diff = Math.ceil(
      Math.abs(new Date() - new Date(dateString)) / (1000 * 60 * 60 * 24),
    );
    if (diff < 30) return `${diff} ${t("about.projects.daysAgo")}`;
    if (diff < 365)
      return `${Math.floor(diff / 30)} ${t("about.projects.monthsAgo")}`;
    return `${Math.floor(diff / 365)} ${t("about.projects.yearsAgo")}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };
  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120 },
    },
  };

  const languageOptions = [
    { value: "all", label: t("about.projects.allLanguages") },
    ...languages.map((l) => ({ value: l, label: l })),
  ];

  const sortOptions = [
    { value: "updated", label: t("about.projects.sortByUpdated") },
    { value: "stars", label: t("about.projects.sortByStars") },
    { value: "forks", label: t("about.projects.sortByForks") },
  ];

  return (
    <div className="w-full min-h-screen relative flex flex-col">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-violet-950" />
        <div className="absolute top-20 left-10 w-80 h-80 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute top-40 right-10 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      <Navbar />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 flex flex-col gap-12">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">
          <JsonHero />
          <ProfilePhoto />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          <StatCard
            value={repos.length}
            label={t("about.projects.totalRepos")}
            color="from-violet-500/10 to-purple-500/10"
            borderColor="border-violet-500/20"
          />
          <StatCard
            value={totalStars}
            label={t("about.projects.totalStars")}
            color="from-yellow-500/10 to-orange-500/10"
            borderColor="border-yellow-500/20"
          />
          <StatCard
            value={totalForks}
            label={t("about.projects.totalForks")}
            color="from-blue-500/10 to-cyan-500/10"
            borderColor="border-blue-500/20"
          />
          <StatCard
            value={languages.length}
            label={t("about.projects.languages")}
            color="from-green-500/10 to-emerald-500/10"
            borderColor="border-green-500/20"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl sm:text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              {t("about.projects.title")}
            </h2>
            <div className="flex flex-wrap gap-3">
              <NativeSelect
                value={selectedLanguage}
                onChange={setSelectedLanguage}
                options={languageOptions}
                icon={<FiFilter size={13} style={{ color: "#8b5cf6" }} />}
              />
              <NativeSelect
                value={sortBy}
                onChange={setSortBy}
                options={sortOptions}
                icon={<FiCode size={13} style={{ color: "#8b5cf6" }} />}
              />
            </div>
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {filteredRepos.map((repo) => (
                <motion.div
                  key={repo.id}
                  variants={cardVariants}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedRepo(repo)}
                  className="cursor-pointer"
                >
                  <div
                    className={`group relative bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-5 transition-all duration-300 hover:border-violet-500/50 overflow-hidden h-full`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${getLanguageColor(repo.language)} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />

                    <div className="relative z-10 flex flex-col h-full gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <BsGithub
                            size={18}
                            className="text-gray-400 flex-shrink-0"
                          />
                          <h3 className="text-base font-semibold text-white group-hover:text-violet-300 transition-colors truncate">
                            {repo.name}
                          </h3>
                        </div>
                        <FiExternalLink
                          size={15}
                          className="text-gray-500 group-hover:text-violet-400 transition-colors flex-shrink-0 ml-2"
                        />
                      </div>

                      <p className="text-gray-400 text-sm line-clamp-2 flex-1">
                        {repo.description || t("about.projects.noDescription")}
                      </p>

                      {/* Dil + Stats */}
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        {repo.language && (
                          <span className="flex items-center gap-1.5 text-xs text-gray-300">
                            <span
                              style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                background: getLanguageDot(repo.language),
                                display: "inline-block",
                                flexShrink: 0,
                              }}
                            />
                            {repo.language}
                          </span>
                        )}
                        <div className="flex items-center gap-3 ml-auto">
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <BsFillStarFill
                              size={11}
                              className="text-yellow-400"
                            />
                            {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <GoRepoForked size={11} className="text-blue-400" />
                            {repo.forks}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <MdUpdate size={13} />
                            {formatDate(repo.updated_at)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      <Footer />

      <AnimatePresence>
        {selectedRepo && (
          <RepoModal
            repo={selectedRepo}
            onClose={() => setSelectedRepo(null)}
            getLanguageColor={getLanguageColor}
            formatDate={formatDate}
            t={t}
          />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(20px,-30px) scale(1.05); }
          66% { transform: translate(-15px,15px) scale(0.95); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default About;
