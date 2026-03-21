import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiCalendar } from "react-icons/fi";

import StackBadge from "./StackBadge";

const LiveProjectCard = React.memo(({ project, tFunc, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  const handleClick = useCallback(() => onSelect(project), [project, onSelect]);

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="group relative bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden transition-all duration-300 hover:border-violet-500/50 h-full">
        {/* Görsel */}
        <div className="relative h-44 overflow-hidden">
          <motion.img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ willChange: "transform" }}
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.35 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

          {/* Live badge */}
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-xs font-semibold text-green-400 flex items-center gap-1.5 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
              </span>
              {tFunc("projects.statusLive")}
            </span>
          </div>

          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-15 transition-opacity duration-300`}
          />
        </div>

        {/* İçerik */}
        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors line-clamp-1">
              {project.title}
            </h3>
            <FiExternalLink
              size={15}
              className="text-gray-500 group-hover:text-violet-400 transition-colors flex-shrink-0"
            />
          </div>
          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <StackBadge key={tech} tech={tech} />
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 pt-1">
            <FiCalendar size={12} />
            <span>{project.date}</span>
          </div>
        </div>

        {/* Shine */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </motion.div>
  );
});

export default LiveProjectCard;
