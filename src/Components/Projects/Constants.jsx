export const TOKEN_COLORS = {
  k: "#c792ea",
  s: "#c3e88d",
  n: "#f78c6c",
  p: "#89ddff",
  cm: "#546e7a",
};

export const makeProjectsLines = (t) => [
  [{ t: "p", v: "{" }],
  [
    { t: "k", v: '  "section"' },
    { t: "p", v: ": " },
    { t: "s", v: `"${t("projects.title")}"` },
    { t: "p", v: "," },
  ],
  [
    { t: "k", v: '  "description"' },
    { t: "p", v: ": " },
    { t: "s", v: `"${t("projects.description")}"` },
    { t: "p", v: "," },
  ],
  [
    { t: "k", v: '  "liveCount"' },
    { t: "p", v: ": " },
    { t: "n", v: "5" },
    { t: "p", v: "," },
  ],
  [
    { t: "k", v: '  "inProgress"' },
    { t: "p", v: ": " },
    { t: "n", v: "2" },
    { t: "p", v: "," },
  ],
  [{ t: "cm", v: "  // canlı projeler ve geliştirilenler aşağıda" }],
  [{ t: "p", v: "}" }],
];
