import React, { useRef, useEffect, useState, useMemo } from "react";

import { motion } from "framer-motion";

import { TypeAnimation } from "react-type-animation";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Img from "../../Public/profile_photo_3.jpg";

const Home = () => {
	const { t, i18n } = useTranslation();

	const navigate = useNavigate();

	const skills = [
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

	// Particles configuration - daha fazla parçacık
	const particles = useMemo(
		() =>
			Array.from({ length: 50 }, (_, i) => ({
				id: i,
				x: Math.random() * 100,
				y: Math.random() * 100,
				delay: Math.random() * 3,
				duration: 3 + Math.random() * 3,
			})),
		[]
	);

	// Floating skill icons - tamamen rastgele dağılım
	const floatingSkills = useMemo(
		() =>
			skills.map((skill) => ({
				...skill,
				x: 5 + Math.random() * 85, // %5 ile %90 arası tamamen rastgele
				y: 5 + Math.random() * 85, // %5 ile %90 arası tamamen rastgele
				delay: Math.random() * 3,
				duration: 4 + Math.random() * 3,
				moveX: (Math.random() - 0.5) * 20, // Rastgele yön (-10 ile +10 arası)
				moveY: (Math.random() - 0.5) * 40, // Rastgele yön (-20 ile +20 arası)
			})),
		[skills]
	);

	return (
		<div className="w-screen h-screen relative flex justify-between flex-col">
			{/* FULL PAGE BACKGROUND ANIMATIONS */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{/* Floating Particles - TÜM SAYFA */}
				{particles.map((particle) => (
					<motion.div
						key={particle.id}
						className="absolute w-1 h-1 bg-pink-500 rounded-full"
						style={{
							left: `${particle.x}%`,
							top: `${particle.y}%`,
						}}
						animate={{
							y: [0, -40, 0],
							opacity: [0.2, 1, 0.2],
							scale: [1, 1.8, 1],
						}}
						transition={{
							duration: particle.duration,
							repeat: Infinity,
							delay: particle.delay,
							ease: "easeInOut",
						}}
					/>
				))}

				{/* Floating Skill Icons with Text - TÜM SAYFA */}
				{floatingSkills.map((skill, i) => (
					<motion.div
						key={skill.title}
						className="absolute flex flex-col items-center gap-1"
						style={{
							left: `${skill.x}%`,
							top: `${skill.y}%`,
						}}
						animate={{
							y: [0, -25, 0],
							x: [0, Math.sin(i) * 10, 0],
							rotate: [0, 5, -5, 0],
							opacity: [0.3, 0.6, 0.3],
						}}
						transition={{
							duration: skill.duration,
							repeat: Infinity,
							delay: skill.delay,
							ease: "easeInOut",
						}}
					>
						<img src={skill.icon} alt={skill.title} className="w-8 h-8 opacity-40 hover:opacity-80 transition-opacity" />
						<span className="text-xs text-pink-500/40 font-mono whitespace-nowrap">{skill.title}</span>
					</motion.div>
				))}

				{/* Gradient Orbs - Background Effect */}
				<motion.div
					className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 blur-3xl"
					style={{ left: "10%", top: "20%" }}
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.3, 0.5, 0.3],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>

				<motion.div
					className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl"
					style={{ right: "15%", top: "60%" }}
					animate={{
						scale: [1, 1.3, 1],
						opacity: [0.3, 0.5, 0.3],
					}}
					transition={{
						duration: 7,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 1,
					}}
				/>
			</div>
			<Navbar />
			{/* Main Content */}
			<div className="flex items-center justify-evenly p-5 w-full h-3/4 max-lg:flex-col-reverse relative z-10">
				{/* Left Side - Text Content */}
				<div className="flex flex-col items-center justify-center gap-5 w-full">
					<span className="text-gray-300 text-4xl font-medium max-md:text-2xl">{t("me.title")}</span>
					<span className="text-gray-300 text-5xl font-bold max-xl:text-3xl max-md:text-xl max-md:text-nowrap">
						<TypeAnimation sequence={[t("me.about"), 1000]} wrapper="span" cursor={true} repeat={Infinity} />
					</span>
					<span className="p-2 text-gray-300 text-xl font-medium text-center">{t("me.details")}</span>
					<div className="w-full flex items-center gap-5 justify-center">
						<div className="relative flex items-center justify-center">
							<button
								onClick={() => navigate("/about")}
								className="p-2 rounded-md text-slate-100 hover:text-white bg-gradient-to-r from-sky-500 to-indigo-500 peer z-10 transition-all"
							>
								{t("me.buttons.more")}
							</button>
							<span className="w-full h-full absolute bg-gradient-to-r to-sky-900 from-indigo-700 rounded-md peer-hover:blur-2xl z-0 transition-all"></span>
						</div>
						<button
							onClick={() => navigate("/contact")}
							className="p-2 rounded-lg text-slate-200 hover:text-white transition-all border-2 border-[#555] hover:bg-[#333]"
						>
							{t("me.buttons.contact")}
						</button>
					</div>
				</div>

				{/* Right Side - Image */}
				<div className="flex items-center justify-center w-2/3 relative">
					<div className="flex flex-col items-center justify-center w-full relative z-10">
						<motion.div
							className="w-64 h-64 bg-gradient-to-br  rounded-lg z-10 shadow-2xl flex items-center justify-center"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8 }}
						>
							<img src={Img} alt="Profile" className="w-60 h-60 object-cover rounded-lg shadow-lg" />
						</motion.div>
						<motion.div
							className="w-64 h-64 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-lg blur-xl absolute"
							animate={{
								scale: [1, 1.1, 1],
								opacity: [0.5, 0.7, 0.5],
							}}
							transition={{
								duration: 3,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						/>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default Home;
