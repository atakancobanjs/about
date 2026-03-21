import React, { useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

import JsonHero from "../../Components/Skills/JsonHero";
import CategoryFilter from "../../Components/Skills/CategoryFilter";
import SkillCard from "../../Components/Skills/SkillCard";
import SkillModal from "../../Components/Skills/SkillModal";
import StatsGrid from "../../Components/Skills/StatsGrid";
import { SKILLS_DATA } from "../../Components/Skills/Constants";

const Skills = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleSelectSkill = useCallback((skill) => setSelectedSkill(skill), []);
  const handleCloseModal = useCallback(() => setSelectedSkill(null), []);

  const categories = useMemo(
    () => [
      { id: "all", name: t("skills.categories.all") },
      { id: "language", name: t("skills.categories.language") },
      { id: "frontend", name: t("skills.categories.frontend") },
      { id: "backend", name: t("skills.categories.backend") },
      { id: "framework", name: t("skills.categories.framework") },
      { id: "tools", name: t("skills.categories.tools") },
    ],
    [t],
  );

  const filteredSkills = useMemo(
    () =>
      selectedCategory === "all"
        ? SKILLS_DATA
        : SKILLS_DATA.filter((s) => s.category === selectedCategory),
    [selectedCategory],
  );

  const expertCount = useMemo(
    () => SKILLS_DATA.filter((s) => s.level === "Expert").length,
    [],
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  return (
    <div className="w-full min-h-screen relative flex justify-between flex-col items-center overflow-x-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-violet-950" />
        <div className="absolute top-20 left-10 w-80 h-80 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute top-40 right-10 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      <Navbar />

      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col items-center py-10 gap-10 flex-1">
        <JsonHero expertCount={expertCount} totalCount={SKILLS_DATA.length} />

        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />

        <motion.div
          key={selectedCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5"
        >
          {filteredSkills.map((skill, i) => (
            <SkillCard
              key={skill.title}
              skill={skill}
              onSelect={handleSelectSkill}
            />
          ))}
        </motion.div>

        <StatsGrid skills={SKILLS_DATA} t={t} />
      </div>

      <Footer />

      <AnimatePresence>
        {selectedSkill && (
          <SkillModal skill={selectedSkill} onClose={handleCloseModal} />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes blob { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(20px,-30px) scale(1.05)} 66%{transform:translate(-15px,15px) scale(0.95)} }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default Skills;
