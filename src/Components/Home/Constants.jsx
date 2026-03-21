import Photo1 from "../../Public/profile_photo_1.jpg";
import Photo2 from "../../Public/profile_photo_2.jpg";
import Photo3 from "../../Public/profile_photo_3.jpeg";
import Photo4 from "../../Public/profile_photo_4.jpeg";
import Photo5 from "../../Public/profile_photo_5.jpeg";

export const PHOTOS = [
  { src: Photo1, position: "center top" },
  { src: Photo2, position: "center center" },
  { src: Photo3, position: "center top" },
  { src: Photo4, position: "center center" },
  { src: Photo5, position: "center center" },
];

export const BIRTH_DATE = new Date("2007-08-15");

export const getAge = () => {
  const today = new Date();
  let age = today.getFullYear() - BIRTH_DATE.getFullYear();
  const notYet =
    today.getMonth() < BIRTH_DATE.getMonth() ||
    (today.getMonth() === BIRTH_DATE.getMonth() &&
      today.getDate() < BIRTH_DATE.getDate());
  return notYet ? age - 1 : age;
};

export const HEX_SIZE = 300;

export const HEX_CLIP =
  "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)";

export const skills = [
  { title: "JavaScript", icon: "https://skillicons.dev/icons?i=js" },
  { title: "TypeScript", icon: "https://skillicons.dev/icons?i=ts" },
  { title: "Node.js", icon: "https://skillicons.dev/icons?i=nodejs" },
  { title: "HTML", icon: "https://skillicons.dev/icons?i=html" },
  { title: "CSS", icon: "https://skillicons.dev/icons?i=css" },
  { title: "Electron.js", icon: "https://skillicons.dev/icons?i=electron" },
  { title: "Tauri", icon: "https://skillicons.dev/icons?i=tauri" },
  { title: "React", icon: "https://skillicons.dev/icons?i=react" },
  { title: "Next.js", icon: "https://skillicons.dev/icons?i=nextjs" },
  { title: "Vite", icon: "https://skillicons.dev/icons?i=vite" },
  { title: "Tailwind", icon: "https://skillicons.dev/icons?i=tailwind" },
  { title: "MongoDB", icon: "https://skillicons.dev/icons?i=mongodb" },
];

export const ICON_BG = {
  clock: "rgba(168,85,247,0.12)",
  rocket: "rgba(236,72,153,0.12)",
  github: "rgba(195,232,141,0.12)",
  stack: "rgba(99,102,241,0.12)",
};
