export const TOKEN_COLORS = {
  k: "#c792ea",
  s: "#c3e88d",
  n: "#f78c6c",
  p: "#89ddff",
  cm: "#546e7a",
};

export const makeJsonLines = (t, age) => [
  [{ t: "p", v: "{" }],
  [
    { t: "k", v: '  "name"' },
    { t: "p", v: ": " },
    { t: "s", v: `"${t("me.name")}"` },
    { t: "p", v: "," },
  ],
  [
    { t: "k", v: '  "role"' },
    { t: "p", v: ": " },
    { t: "s", v: `"${t("me.role")}"` },
    { t: "p", v: "," },
  ],
  [
    { t: "k", v: '  "location"' },
    { t: "p", v: ": " },
    { t: "s", v: `"${t("me.location")}"` },
    { t: "p", v: "," },
  ],
  [
    { t: "k", v: '  "age"' },
    { t: "p", v: ": " },
    { t: "n", v: String(age) },
    { t: "p", v: "," },
  ],
  [
    { t: "k", v: '  "available"' },
    { t: "p", v: ": " },
    { t: "n", v: "true" },
    { t: "p", v: "," },
  ],
  [
    { t: "k", v: '  "bio"' },
    { t: "p", v: ": " },
    { t: "s", v: `"${t("me.bio")}"` },
    { t: "p", v: "," },
  ],
  [
    { t: "k", v: '  "skills"' },
    { t: "p", v: ": [" },
  ],
  [
    { t: "s", v: '    "React"' },
    { t: "p", v: ", " },
    { t: "s", v: '"Node.js"' },
    { t: "p", v: ", " },
    { t: "s", v: '"TypeScript"' },
  ],
  [
    { t: "s", v: '    "MongoDB"' },
    { t: "p", v: ", " },
    { t: "s", v: '"Tailwind"' },
    { t: "p", v: ", " },
    { t: "s", v: '"Next.js"' },
  ],
  [{ t: "p", v: "  ]," }],
  [
    { t: "k", v: '  "links"' },
    { t: "p", v: ": {" },
  ],
  [
    { t: "k", v: '    "github"' },
    { t: "p", v: ": " },
    { t: "s", v: '"github.com/atakancobanjs"' },
    { t: "p", v: "," },
  ],
  [
    { t: "k", v: '    "linkedin"' },
    { t: "p", v: ": " },
    { t: "s", v: '"linkedin.com/in/atakancoban"' },
    { t: "p", v: "," },
  ],
  [
    { t: "k", v: '    "twitter"' },
    { t: "p", v: ": " },
    { t: "s", v: '"x.com/ACobnn"' },
  ],
  [{ t: "p", v: "  }," }],
  [{ t: "cm", v: `  // ${t("me.comment")}` }],
  [{ t: "p", v: "}" }],
];
