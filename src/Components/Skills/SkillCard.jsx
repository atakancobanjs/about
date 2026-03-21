import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";

import { getLevelColor } from "./constants";

const SkillCard = React.memo(({ skill, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  const handleClick = useCallback(() => onSelect(skill), [skill, onSelect]);

  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { type: "spring", stiffness: 100 },
        },
      }}
      whileHover={{ y: -10, scale: 1.04 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleClick}
      className="group relative bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-5 sm:p-6 transition-all duration-300 hover:border-violet-500/50 overflow-hidden cursor-pointer"
    >
      {/* Hover glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      />

      <div className="relative z-10 flex flex-col items-center justify-center gap-3 h-full">
        {/* İkon */}
        <motion.div
          className="w-14 h-14 sm:w-16 sm:h-16"
          animate={
            hovered
              ? { rotate: [0, -8, 8, -8, 0], scale: 1.1 }
              : { rotate: 0, scale: 1 }
          }
          transition={{ duration: 0.4 }}
        >
          <img
            draggable={false}
            src={skill.icon}
            alt={skill.title}
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* İsim */}
        <span className="text-gray-200 font-semibold text-center text-sm sm:text-base leading-tight">
          {skill.title}
        </span>

        {/* Level badge */}
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getLevelColor(skill.level)}`}
        >
          {skill.level}
        </span>
      </div>

      {/* Shine */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </motion.div>
  );
});

export default SkillCard;
