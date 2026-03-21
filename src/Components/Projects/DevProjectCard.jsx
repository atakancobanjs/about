import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiCalendar } from "react-icons/fi";

import StackBadge from "./StackBadge";

const ProgressBar = ({ progress, color }) => {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        height: 8,
        background: "rgba(255,255,255,0.06)",
        borderRadius: 999,
        overflow: "hidden",
      }}
    >
      <motion.div
        className={`h-full bg-gradient-to-r ${color} rounded-full`}
        initial={{ width: 0 }}
        animate={{ width: started ? `${progress}%` : 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
      />
    </div>
  );
};

const DevProjectCard = React.memo(({ project, tFunc }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120 }}
      whileHover={{ y: -6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-5 overflow-hidden transition-all duration-300 hover:border-orange-500/50"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      />

      <div className="relative z-10 space-y-4">
        <div className="flex items-start justify-between">
          <motion.div
            className={`p-2.5 bg-gradient-to-br ${project.color} rounded-xl text-white`}
            animate={{ rotate: hovered ? [0, -8, 8, 0] : 0 }}
            transition={{ duration: 0.4 }}
          >
            {project.icon}
          </motion.div>
          <span className="px-2.5 py-1 bg-orange-500/20 border border-orange-500/50 rounded-full text-xs font-semibold text-orange-400">
            {tFunc("projects.statusDeveloping")}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <StackBadge key={tech} tech={tech} />
          ))}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">{tFunc("projects.progress")}</span>
            <span
              className={`font-semibold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}
            >
              {project.progress}%
            </span>
          </div>
          <ProgressBar progress={project.progress} color={project.color} />
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <FiCalendar size={12} />
          <span>{project.date}</span>
        </div>
      </div>

      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </motion.div>
  );
});

export default DevProjectCard;
