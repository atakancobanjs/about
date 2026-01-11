import React from "react";

import { useTranslation } from "react-i18next";
import { TypeAnimation } from "react-type-animation";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const Skills = () => {
	const { t } = useTranslation();

	const skills = [
		{
			title: "JavaScript",
			icon: "https://skillicons.dev/icons?i=js",
			href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
		},
		{
			title: "TypeScript",
			icon: "https://skillicons.dev/icons?i=ts",
			href: "https://www.typescriptlang.org/",
		},
		{
			title: "Node.Js",
			icon: "https://skillicons.dev/icons?i=nodejs",
			href: "https://nodejs.org",
		},
		{
			title: "Html",
			icon: "https://skillicons.dev/icons?i=html",
			href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
		},
		{
			title: "Css",
			icon: "https://skillicons.dev/icons?i=css",
			href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
		},
		{
			title: "Electron.Js",
			icon: "https://skillicons.dev/icons?i=electron",
			href: "https://electronjs.org/",
		},
		{
			title: "Tauri.Js",
			icon: "https://skillicons.dev/icons?i=tauri",
			href: "https://v2.tauri.app/",
		},
		{
			title: "React",
			icon: "https://skillicons.dev/icons?i=react",
			href: "https://tr.react.dev/",
		},
		{
			title: "Next.Js",
			icon: "https://skillicons.dev/icons?i=nextjs",
			href: "https://nextjs.org/",
		},
		{
			title: "Vite",
			icon: "https://skillicons.dev/icons?i=vite",
			href: "https://vitejs.dev/",
		},
		{
			title: "TailwindCSS",
			icon: "https://skillicons.dev/icons?i=tailwind",
			href: "https://tailwindcss.com/",
		},
		{
			title: "MongoDB",
			icon: "https://skillicons.dev/icons?i=mongodb",
			href: "https://www.mongodb.com/",
		},
	];

	return (
		<div className="w-full min-h-screen relative flex justify-between flex-col items-center">
			<Navbar />
			<div className="w-2/3 h-full flex flex-col items-center justify-center">
				<div className="w-full h-full flex flex-col items-center justify-center p-3 gap-5">
					<h1 className="text-gray-300 w-full text-left text-4xl max-xl:text-3xl max-md:text-2xl">
						<strong>{t("skills.title")}</strong>
					</h1>
					<div className="w-full grid grid-cols-5 gap-5 overflow-y-visible max-sm:grid-cols-1 max-xl:grid-cols-2">
						{skills.map((skill, i) => (
							<a
								key={i}
								href={skill.href}
								target="_blank"
								className="group bg-[#111] relative gap-3 flex h-36 flex-col justify-center items-center rounded-lg border border-violet-500/50 p-4 transition-all hover:scale-105 max-lg:scale-90 max-lg:hover:scale-100 hover:border-violet-500"
							>
								<img
									draggable={false}
									src={skill.icon}
									alt={skill.title}
									className="scale-150"
								/>
								<span className="text-gray-300 font-semibold opacity-0 translate-y-2.5 absolute bottom-3 transition-all group-hover:opacity-100 group-hover:translate-y-1">
									{skill.title}
								</span>
							</a>
						))}
					</div>
				</div>
				<div className="w-full h-full flex flex-col items-center justify-center p-3 gap-5">
					<h1 className="text-gray-300 w-full text-left text-4xl max-xl:text-3xl max-md:text-2xl">
						<strong>{t("skills.position.title")}</strong>
					</h1>
					<TypeAnimation
						sequence={[t("skills.position.description"), 500]}
						wrapper="p"
						className="indent-4 text-2xl text-gray-400 h-full max-lg:text-xl max-xl:text-center w-full"
					/>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Skills;
