import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

import { FiCode } from "react-icons/fi";
import { BsRocket } from "react-icons/bs";

import JsonHero from "../../Components/Projects/Jsonhero";
import LiveProjectCard from "../../Components/Projects/LiveProjectCard";
import DevProjectCard from "../../Components/Projects/DevProjectCard";
import ProjectModal from "../../Components/Projects/ProjectModal";
import { useProjectsData } from "../../Components/Projects/projectsData";

const Projects = () => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);
  const { liveProjects, developingProjects } = useProjectsData();

  const handleSelectProject = useCallback(
    (project) => setSelectedProject(project),
    [],
  );
  const handleCloseModal = useCallback(() => setSelectedProject(null), []);

  return (
    <div className="min-h-screen w-full relative flex flex-col">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-violet-950" />
        <div className="absolute top-20 left-10 w-80 h-80 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute top-40 right-10 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      <Navbar />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 flex flex-col gap-12">
        <JsonHero liveCount={liveProjects.length} />

        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
              <BsRocket size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-200">
                {t("projects.liveProjects")}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {t("projects.liveProjectsSubtitle")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {liveProjects.map((project, index) => (
              <LiveProjectCard
                key={index}
                project={project}
                tFunc={t}
                onSelect={handleSelectProject}
              />
            ))}
          </div>
        </div>

        {developingProjects.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
                <FiCode size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-200">
                  {t("developingProjects.title")}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {t("developingProjects.description")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {developingProjects.map((project, index) => (
                <DevProjectCard key={index} project={project} tFunc={t} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={handleCloseModal} />
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

export default Projects;
