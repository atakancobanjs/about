import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

import {
  BiLogoGithub,
  BiLogoInstagram,
  BiLogoGmail,
  BiLogoLinkedin,
  BiLogoDiscord,
} from "react-icons/bi";
import {
  FiX,
  FiCopy,
  FiCheck,
  FiSend,
  FiMail,
  FiUser,
  FiMessageSquare,
  FiLoader,
} from "react-icons/fi";

import emailjs from "@emailjs/browser";

// JSON token renkleri — Home sayfasıyla aynı
const TOKEN_COLORS = {
  k: "#c792ea",
  s: "#c3e88d",
  n: "#f78c6c",
  p: "#89ddff",
  cm: "#546e7a",
};

const JSON_CONTACT_LINES = (t) => [
  [{ t: "p", v: "{" }],
  [
    { t: "k", v: '  "page"' },
    { t: "p", v: ": " },
    { t: "s", v: `"${t("contact.title")}"` },
    { t: "p", v: "," },
  ],
  [
    { t: "k", v: '  "description"' },
    { t: "p", v: ": " },
    { t: "s", v: `"${t("contact.description")}"` },
    { t: "p", v: "," },
  ],
  [
    { t: "k", v: '  "responseTime"' },
    { t: "p", v: ": " },
    { t: "s", v: `"${t("contact.responseTime")}"` },
    { t: "p", v: "," },
  ],
  [
    { t: "k", v: '  "status"' },
    { t: "p", v: ": " },
    { t: "n", v: '"online"' },
    { t: "p", v: "," },
  ],
  [{ t: "cm", v: "  // formu doldurun veya direkt ulaşın" }],
  [{ t: "p", v: "}" }],
];

const JsonHero = () => {
  const { t } = useTranslation();
  const lines = useMemo(() => JSON_CONTACT_LINES(t), [t]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setVisibleCount(0);
    setDone(false);
    let i = 0;
    let running = true;
    const tick = () => {
      if (!running) return;
      i++;
      setVisibleCount(i);
      if (i >= lines.length) {
        setDone(true);
        return;
      }
      setTimeout(tick, 80);
    };
    setTimeout(tick, 200);
    return () => {
      running = false;
    };
  }, [t]);

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
        maxWidth: "680px",
        margin: "0 auto",
        boxShadow: "0 0 40px rgba(168,85,247,0.08)",
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
          contact.json
        </span>
        {/* Online indicator */}
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
            {t("contact.status")}
          </span>
        </div>
      </div>

      {/* Code body */}
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
                fontFamily: "'Fira Code', 'Cascadia Code', monospace",
                fontSize: "13px",
                lineHeight: "1.7",
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

const Contact = () => {
  const { t } = useTranslation();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("idle");
  const [hoveredCard, setHoveredCard] = useState(null);

  const medias = [
    {
      icon: <BiLogoGithub size={28} />,
      label: "Github",
      href: "https://github.com/atakancobanjs",
      username: "@atakancobanjs",
      color: "from-gray-700 to-gray-900",
      hoverColor: "group-hover:text-gray-400",
      bgColor: "bg-gradient-to-br from-gray-700/20 to-gray-900/20",
      borderColor: "border-gray-700/50 hover:border-gray-500",
    },
    {
      icon: <BiLogoInstagram size={28} />,
      label: "Instagram",
      href: "https://instagram.com/acobnn",
      username: "@acobnn",
      color: "from-purple-600 to-pink-600",
      hoverColor: "group-hover:text-pink-400",
      bgColor: "bg-gradient-to-br from-purple-600/20 to-pink-600/20",
      borderColor: "border-purple-600/50 hover:border-purple-400",
    },
    {
      icon: <FiX size={28} />,
      label: "X / Twitter",
      href: "https://x.com/ACobnn",
      username: "@ACobnn",
      color: "from-blue-400 to-blue-600",
      hoverColor: "group-hover:text-blue-400",
      bgColor: "bg-gradient-to-br from-blue-400/20 to-blue-600/20",
      borderColor: "border-blue-600/50 hover:border-blue-400",
    },
    {
      icon: <BiLogoGmail size={28} />,
      label: "Mail",
      href: "mailto:atakancoban536@gmail.com",
      username: "atakancoban536@gmail.com",
      color: "from-red-500 to-red-700",
      hoverColor: "group-hover:text-red-400",
      bgColor: "bg-gradient-to-br from-red-500/20 to-red-700/20",
      borderColor: "border-red-600/50 hover:border-red-400",
      copyable: true,
    },
    {
      icon: <BiLogoLinkedin size={28} />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/atakan-coban-291b27138/",
      username: "@Atakan Çoban",
      color: "from-blue-600 to-blue-800",
      hoverColor: "group-hover:text-blue-400",
      bgColor: "bg-gradient-to-br from-blue-600/20 to-blue-800/20",
      borderColor: "border-blue-700/50 hover:border-blue-500",
    },
    {
      icon: <BiLogoDiscord size={28} />,
      label: "Discord",
      href: "https://discord.com/channels/@me/855812906876534845",
      username: "lurfflex",
      color: "from-indigo-500 to-indigo-700",
      hoverColor: "group-hover:text-indigo-400",
      bgColor: "bg-gradient-to-br from-indigo-500/20 to-indigo-700/20",
      borderColor: "border-indigo-600/50 hover:border-indigo-400",
    },
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");
    try {
      await emailjs.send(
        "service_xxto58p",
        "template_zc3hrw8",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "eQP-c2zhjhA8MROHY",
      );
      setFormStatus("success");
      setTimeout(() => {
        setFormStatus("idle");
        setFormData({ name: "", email: "", message: "" });
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120 },
    },
  };

  return (
    <div className="w-full min-h-screen relative flex justify-between flex-col">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-blue-950" />
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      <Navbar />

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center py-10 gap-10 flex-1">
        <JsonHero />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
        >
          {medias.map((media, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative group"
            >
              <a
                className={`relative w-full h-full flex items-center gap-3 text-gray-300 p-4 sm:p-5 transition-all duration-300 rounded-xl border ${media.borderColor} backdrop-blur-sm ${media.bgColor} overflow-hidden`}
                target="_blank"
                href={media.href}
                rel="noopener noreferrer"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${media.color} opacity-0 blur-xl`}
                  animate={{ opacity: hoveredCard === index ? 0.25 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${media.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <motion.div
                  className={`relative z-10 transition-all duration-300 ${media.hoverColor} flex-shrink-0`}
                  animate={{
                    rotate: hoveredCard === index ? [0, -8, 8, 0] : 0,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {media.icon}
                </motion.div>

                <div className="relative z-10 flex flex-col flex-1 min-w-0">
                  <span className="text-base font-semibold truncate">
                    {media.label}
                  </span>
                  <span
                    className={`text-xs bg-gradient-to-r ${media.color} bg-clip-text text-transparent font-medium truncate`}
                  >
                    {media.username}
                  </span>
                </div>

                {media.copyable && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.preventDefault();
                      copyToClipboard(media.username);
                    }}
                    className="relative z-10 p-2 rounded-lg bg-gray-800/70 hover:bg-gray-700/70 transition-colors flex-shrink-0"
                  >
                    {copiedEmail ? (
                      <FiCheck size={15} className="text-green-400" />
                    ) : (
                      <FiCopy size={15} className="text-gray-400" />
                    )}
                  </motion.button>
                )}

                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full"
        >
          <div className="relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 sm:p-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-7">
                <div className="p-2.5 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex-shrink-0">
                  <FiMail size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                    {t("contact.form.title")}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {t("contact.form.subtitle")}
                  </p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {formStatus === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 gap-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        delay: 0.1,
                      }}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500 flex items-center justify-center"
                    >
                      <FiCheck size={32} className="text-green-400" />
                    </motion.div>
                    <h3 className="text-xl text-gray-300 font-bold">
                      {t("contact.form.success")}
                    </h3>
                    <p className="text-gray-500 text-center max-w-sm text-sm">
                      {t("contact.form.successMessage")}
                    </p>
                  </motion.div>
                ) : formStatus === "error" ? (
                  <motion.div
                    key="error"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 gap-3"
                  >
                    <div className="w-16 h-16 rounded-full bg-red-500/10 border-2 border-red-500 flex items-center justify-center">
                      <FiX size={32} className="text-red-400" />
                    </div>
                    <p className="text-gray-400 text-sm">
                      {t("contact.form.errorMessage")}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                          <FiUser size={13} /> {t("contact.form.name")}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          disabled={formStatus === "loading"}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none text-gray-200 transition-all placeholder:text-gray-600 text-sm disabled:opacity-50"
                          placeholder={t("contact.form.namePlaceholder")}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                          <FiMail size={13} /> {t("contact.form.email")}
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          disabled={formStatus === "loading"}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none text-gray-200 transition-all placeholder:text-gray-600 text-sm disabled:opacity-50"
                          placeholder={t("contact.form.emailPlaceholder")}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                        <FiMessageSquare size={13} />{" "}
                        {t("contact.form.message")}
                      </label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        disabled={formStatus === "loading"}
                        rows="5"
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none text-gray-200 transition-all resize-none placeholder:text-gray-600 text-sm disabled:opacity-50"
                        placeholder={t("contact.form.messagePlaceholder")}
                      />
                    </div>

                    <motion.button
                      whileHover={{
                        scale: formStatus === "loading" ? 1 : 1.015,
                      }}
                      whileTap={{ scale: formStatus === "loading" ? 1 : 0.98 }}
                      type="submit"
                      disabled={formStatus === "loading"}
                      className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-violet-500/20 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                    >
                      {formStatus === "loading" ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <FiLoader size={16} />
                          </motion.div>
                          {t("contact.form.sending")}
                        </>
                      ) : (
                        <>
                          <FiSend size={16} />
                          {t("contact.form.send")}
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.05); }
          66% { transform: translate(-15px, 15px) scale(0.95); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default Contact;
