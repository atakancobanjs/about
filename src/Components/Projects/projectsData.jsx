import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { FiLayers } from "react-icons/fi";
import { BsCodeSlash } from "react-icons/bs";

import AboutCardPhoto from "../../Public/Card/about_page_card_photo.png";
import WeatherCardPhoto from "../../Public/Card/weather_page_card_photo.png";
import TodoCardPhoto from "../../Public/Card/todo_page_card_photo.png";
import FaceidCardPhoto from "../../Public/Card/faceid_page_card_photo.png";
import Mu6CardPhoto from "../../Public/Card/mu6_page_card_photo.png";

export const useProjectsData = () => {
  const { t } = useTranslation();

  const liveProjects = useMemo(
    () => [
      {
        image_url: AboutCardPhoto,
        title: t("projects.about.title"),
        description: t("projects.about.description"),
        hash: "https://about-bl2.pages.dev/",
        date: t("projects.about.date"),
        color: "from-violet-500 to-purple-600",
        stack: ["React", "Tailwind", "Vite"],
      },
      {
        image_url: WeatherCardPhoto,
        title: t("projects.weather.title"),
        description: t("projects.weather.description"),
        hash: "https://weather-3ib.pages.dev/",
        date: t("projects.weather.date"),
        color: "from-blue-500 to-cyan-600",
        stack: ["React", "JavaScript", "CSS"],
      },
      {
        image_url: TodoCardPhoto,
        title: t("projects.todo.title"),
        description: t("projects.todo.description"),
        hash: "https://todo-app-985.pages.dev/",
        date: t("projects.todo.date"),
        color: "from-pink-500 to-rose-600",
        stack: ["React", "Tailwind"],
      },
      {
        image_url: FaceidCardPhoto,
        title: t("projects.face_id.title"),
        description: t("projects.face_id.description"),
        hash: "https://face-id.pages.dev/",
        date: t("projects.face_id.date"),
        color: "from-yellow-500 to-amber-600",
        stack: ["Python", "JavaScript", "HTML"],
      },
      {
        image_url: Mu6CardPhoto,
        title: t("projects.mu6.title"),
        description: t("projects.mu6.description"),
        hash: "https://musix-6vo.pages.dev/",
        date: t("projects.mu6.date"),
        color: "from-sky-500 to-purple-600",
        stack: ["React", "Node.js", "MongoDB"],
      },
    ],
    [t],
  );

  const developingProjects = useMemo(
    () => [
      {
        id: "chatApp",
        title: t("developingProjects.chatApp.title"),
        description: t("developingProjects.chatApp.description"),
        date: t("developingProjects.chatApp.date"),
        color: "from-green-500 to-emerald-600",
        icon: <BsCodeSlash size={28} />,
        progress: 75,
        stack: ["React", "Node.js", "MongoDB"],
        platforms: [
          { key: "web", status: "completed" },
          { key: "desktop", status: "completed" },
          { key: "mobile", status: "developing" },
        ],
      },
      {
        title: t("developingProjects.blogApp.title"),
        description: t("developingProjects.blogApp.description"),
        date: t("developingProjects.blogApp.date"),
        color: "from-orange-500 to-red-600",
        icon: <FiLayers size={28} />,
        progress: 60,
        stack: ["Next.js", "TypeScript", "MongoDB"],
      },
    ],
    [t],
  );

  return { liveProjects, developingProjects };
};
