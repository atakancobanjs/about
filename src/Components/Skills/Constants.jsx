export const TOKEN_COLORS = {
  k: "#c792ea",
  s: "#c3e88d",
  n: "#f78c6c",
  p: "#89ddff",
  cm: "#546e7a",
};

export const makeSkillsLines = (t, expertCount, totalCount) => [
  [{ t: "p", v: "{" }],
  [
    { t: "k", v: '  "section"' },
    { t: "p", v: ": " },
    { t: "s", v: `"${t("skills.title")}"` },
    { t: "p", v: "," },
  ],
  [
    { t: "k", v: '  "subtitle"' },
    { t: "p", v: ": " },
    { t: "s", v: `"${t("skills.subtitle")}"` },
    { t: "p", v: "," },
  ],
  [
    { t: "k", v: '  "totalSkills"' },
    { t: "p", v: ": " },
    { t: "n", v: String(totalCount) },
    { t: "p", v: "," },
  ],
  [
    { t: "k", v: '  "expertLevel"' },
    { t: "p", v: ": " },
    { t: "n", v: String(expertCount) },
    { t: "p", v: "," },
  ],
  [
    { t: "k", v: '  "currentPosition"' },
    { t: "p", v: ": " },
    { t: "s", v: `"${t("skills.position.description")}"` },
    { t: "p", v: "," },
  ],
  [
    { t: "k", v: '  "openToWork"' },
    { t: "p", v: ": " },
    { t: "n", v: "true" },
  ],
  [{ t: "p", v: "}" }],
];

export const SKILLS_DATA = [
  {
    title: "JavaScript",
    icon: "https://skillicons.dev/icons?i=js",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    level: "Expert",
    category: "language",
    color: "from-yellow-400 to-yellow-600",
    description: "skills.description.js",
  },
  {
    title: "TypeScript",
    icon: "https://skillicons.dev/icons?i=ts",
    href: "https://www.typescriptlang.org/",
    level: "Advanced",
    category: "language",
    color: "from-blue-500 to-blue-700",
    description: "skills.description.ts",
  },
  {
    title: "Node.js",
    icon: "https://skillicons.dev/icons?i=nodejs",
    href: "https://nodejs.org",
    level: "Expert",
    category: "backend",
    color: "from-green-500 to-green-700",
    description: "skills.description.node",
  },
  {
    title: "HTML",
    icon: "https://skillicons.dev/icons?i=html",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    level: "Expert",
    category: "frontend",
    color: "from-orange-500 to-orange-700",
    description: "skills.description.html",
  },
  {
    title: "CSS",
    icon: "https://skillicons.dev/icons?i=css",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    level: "Expert",
    category: "frontend",
    color: "from-blue-400 to-blue-600",
    description: "skills.description.css",
  },
  {
    title: "Electron.js",
    icon: "https://skillicons.dev/icons?i=electron",
    href: "https://electronjs.org/",
    level: "Advanced",
    category: "framework",
    color: "from-cyan-400 to-cyan-600",
    description: "skills.description.electron",
  },
  {
    title: "Tauri",
    icon: "https://skillicons.dev/icons?i=tauri",
    href: "https://v2.tauri.app/",
    level: "Intermediate",
    category: "framework",
    color: "from-yellow-500 to-orange-600",
    description: "skills.description.tauri",
  },
  {
    title: "React",
    icon: "https://skillicons.dev/icons?i=react",
    href: "https://tr.react.dev/",
    level: "Expert",
    category: "frontend",
    color: "from-cyan-400 to-blue-500",
    description: "skills.description.react",
  },
  {
    title: "Next.js",
    icon: "https://skillicons.dev/icons?i=nextjs",
    href: "https://nextjs.org/",
    level: "Advanced",
    category: "framework",
    color: "from-gray-700 to-gray-900",
    description: "skills.description.next",
  },
  {
    title: "Vite",
    icon: "https://skillicons.dev/icons?i=vite",
    href: "https://vitejs.dev/",
    level: "Advanced",
    category: "tools",
    color: "from-purple-500 to-yellow-500",
    description: "skills.description.vite",
  },
  {
    title: "TailwindCSS",
    icon: "https://skillicons.dev/icons?i=tailwind",
    href: "https://tailwindcss.com/",
    level: "Expert",
    category: "frontend",
    color: "from-cyan-400 to-blue-500",
    description: "skills.description.tailwind",
  },
  {
    title: "MongoDB",
    icon: "https://skillicons.dev/icons?i=mongodb",
    href: "https://www.mongodb.com/",
    level: "Advanced",
    category: "backend",
    color: "from-green-600 to-green-800",
    description: "skills.description.mongodb",
  },
];

export const getLevelColor = (level) => {
  switch (level) {
    case "Expert":
      return "bg-green-500/20 text-green-400 border-green-500/50";
    case "Advanced":
      return "bg-blue-500/20 text-blue-400 border-blue-500/50";
    case "Intermediate":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/50";
  }
};
