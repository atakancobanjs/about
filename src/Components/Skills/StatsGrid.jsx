import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

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

const StatCard = ({
  target,
  suffix = "",
  label,
  gradient,
  border,
  textGradient,
}) => {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const count = useCountUp(started ? target : 0);

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
      className={`bg-gradient-to-br ${gradient} backdrop-blur-sm rounded-2xl border ${border} p-5 sm:p-6 text-center`}
    >
      <div
        className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${textGradient} bg-clip-text text-transparent mb-2`}
      >
        {count}
        {suffix}
      </div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  );
};

const StatsGrid = ({ skills, t }) => {
  const expertCount = skills.filter((s) => s.level === "Expert").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="w-full grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      <StatCard
        target={skills.length}
        suffix="+"
        label={t("skills.stats.technologies")}
        gradient="from-violet-500/10 to-purple-500/10"
        border="border-violet-500/20"
        textGradient="from-violet-400 to-purple-400"
      />
      <StatCard
        target={5}
        suffix="+"
        label={t("skills.stats.experience")}
        gradient="from-blue-500/10 to-cyan-500/10"
        border="border-blue-500/20"
        textGradient="from-blue-400 to-cyan-400"
      />
      <StatCard
        target={50}
        suffix="+"
        label={t("skills.stats.projects")}
        gradient="from-green-500/10 to-emerald-500/10"
        border="border-green-500/20"
        textGradient="from-green-400 to-emerald-400"
      />
      <StatCard
        target={expertCount}
        label={t("skills.stats.expert")}
        gradient="from-pink-500/10 to-rose-500/10"
        border="border-pink-500/20"
        textGradient="from-pink-400 to-rose-400"
      />
    </motion.div>
  );
};

export default StatsGrid;
