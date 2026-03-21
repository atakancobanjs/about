import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

import { skills } from "../../Components/Home/Constants";
import JsonBlock from "../../Components/Home/Jsonblock";
import PhotoSection from "../../Components/Home/Photosection";

const Home = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const [showButtons, setShowButtons] = useState(false);

  const particles = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 3,
      })),
    [],
  );

  const floatingSkills = useMemo(
    () =>
      skills.map((skill) => ({
        ...skill,
        x: 5 + Math.random() * 85,
        y: 5 + Math.random() * 85,
        delay: Math.random() * 3,
        duration: 4 + Math.random() * 3,
      })),
    [],
  );

  return (
    <div className="w-screen min-h-screen relative flex flex-col justify-between overflow-x-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {!shouldReduceMotion &&
          particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-1 h-1 bg-pink-500 rounded-full"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.8, 1],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
            />
          ))}

        {floatingSkills.map((skill, i) => (
          <motion.div
            key={skill.title}
            className="absolute flex-col items-center gap-1 hidden lg:flex"
            style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
            animate={
              shouldReduceMotion
                ? { opacity: 0.35 }
                : {
                    y: [0, -25, 0],
                    x: [0, Math.sin(i) * 10, 0],
                    rotate: [0, 5, -5, 0],
                    opacity: [0.25, 0.55, 0.25],
                  }
            }
            transition={
              shouldReduceMotion
                ? {}
                : {
                    duration: skill.duration,
                    repeat: Infinity,
                    delay: skill.delay,
                    ease: "easeInOut",
                  }
            }
          >
            <img
              src={skill.icon}
              alt={skill.title}
              className="w-8 h-8 opacity-40 hover:opacity-80 transition-opacity"
            />
            <span className="text-xs text-pink-500/40 font-mono whitespace-nowrap">
              {skill.title}
            </span>
          </motion.div>
        ))}

        <motion.div
          className="absolute w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(236,72,153,0.07), transparent 70%)",
            left: "5%",
            top: "15%",
          }}
          animate={
            shouldReduceMotion
              ? {}
              : { scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] lg:w-[400px] lg:h-[400px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%)",
            right: "8%",
            bottom: "10%",
          }}
          animate={
            shouldReduceMotion
              ? {}
              : { scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </div>

      <Navbar />

      {/* MAIN */}
      <div
        className="
        flex-1 flex flex-col-reverse lg:flex-row
        items-center justify-center
        gap-8 lg:gap-12
        px-4 sm:px-8 lg:px-12
        py-10 lg:py-6
        relative z-10
        w-full max-w-[1400px] mx-auto
      "
      >
        {/* Sol — JSON + Butonlar */}
        <div className="flex flex-col items-start gap-4 lg:gap-6 w-full lg:flex-1 lg:max-w-[520px]">
          <JsonBlock key={i18n.language} onDone={() => setShowButtons(true)} />

          <motion.div
            className="flex gap-3 pl-1"
            initial={{ opacity: 0, y: 8 }}
            animate={showButtons ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative">
              <button
                onClick={() => navigate("/about")}
                className="relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-slate-100 hover:text-white bg-gradient-to-r from-sky-500 to-indigo-500 z-10 text-sm font-medium transition-all peer"
              >
                {t("me.buttons.more")}
              </button>
              <span className="absolute inset-0 bg-gradient-to-r from-sky-700 to-indigo-800 rounded-lg blur-xl opacity-0 peer-hover:opacity-70 transition-opacity z-0" />
            </div>
            <button
              onClick={() => navigate("/contact")}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-slate-300 hover:text-white text-sm font-medium transition-all border border-[#444] hover:border-[#777] hover:bg-white/5"
            >
              {t("me.buttons.contact")}
            </button>
          </motion.div>
        </div>

        {/* Sağ — tam ortalanmış */}
        <div className="flex items-center justify-center lg:flex-1">
          <PhotoSection />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
