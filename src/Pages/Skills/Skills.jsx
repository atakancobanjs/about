import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const Skills = () => {
	const { t } = useTranslation();
	const [selectedCategory, setSelectedCategory] = useState("all");

	const skills = [
		{
			title: "JavaScript",
			icon: "https://skillicons.dev/icons?i=js",
			href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
			level: "Expert",
			category: "language",
			color: "from-yellow-400 to-yellow-600",
		},
		{
			title: "TypeScript",
			icon: "https://skillicons.dev/icons?i=ts",
			href: "https://www.typescriptlang.org/",
			level: "Advanced",
			category: "language",
			color: "from-blue-500 to-blue-700",
		},
		{
			title: "Node.js",
			icon: "https://skillicons.dev/icons?i=nodejs",
			href: "https://nodejs.org",
			level: "Expert",
			category: "backend",
			color: "from-green-500 to-green-700",
		},
		{
			title: "HTML",
			icon: "https://skillicons.dev/icons?i=html",
			href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
			level: "Expert",
			category: "frontend",
			color: "from-orange-500 to-orange-700",
		},
		{
			title: "CSS",
			icon: "https://skillicons.dev/icons?i=css",
			href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
			level: "Expert",
			category: "frontend",
			color: "from-blue-400 to-blue-600",
		},
		{
			title: "Electron.js",
			icon: "https://skillicons.dev/icons?i=electron",
			href: "https://electronjs.org/",
			level: "Advanced",
			category: "framework",
			color: "from-cyan-400 to-cyan-600",
		},
		{
			title: "Tauri.js",
			icon: "https://skillicons.dev/icons?i=tauri",
			href: "https://v2.tauri.app/",
			level: "Intermediate",
			category: "framework",
			color: "from-yellow-500 to-orange-600",
		},
		{
			title: "React",
			icon: "https://skillicons.dev/icons?i=react",
			href: "https://tr.react.dev/",
			level: "Expert",
			category: "frontend",
			color: "from-cyan-400 to-blue-500",
		},
		{
			title: "Next.js",
			icon: "https://skillicons.dev/icons?i=nextjs",
			href: "https://nextjs.org/",
			level: "Advanced",
			category: "framework",
			color: "from-gray-700 to-gray-900",
		},
		{
			title: "Vite",
			icon: "https://skillicons.dev/icons?i=vite",
			href: "https://vitejs.dev/",
			level: "Advanced",
			category: "tools",
			color: "from-purple-500 to-yellow-500",
		},
		{
			title: "TailwindCSS",
			icon: "https://skillicons.dev/icons?i=tailwind",
			href: "https://tailwindcss.com/",
			level: "Expert",
			category: "frontend",
			color: "from-cyan-400 to-blue-500",
		},
		{
			title: "MongoDB",
			icon: "https://skillicons.dev/icons?i=mongodb",
			href: "https://www.mongodb.com/",
			level: "Advanced",
			category: "backend",
			color: "from-green-600 to-green-800",
		},
	];

	const categories = [
		{ id: "all", name: t("skills.categories.all"), icon: "🎯" },
		{ id: "language", name: t("skills.categories.language"), icon: "💻" },
		{ id: "frontend", name: t("skills.categories.frontend"), icon: "🎨" },
		{ id: "backend", name: t("skills.categories.backend"), icon: "⚙️" },
		{ id: "framework", name: t("skills.categories.framework"), icon: "🚀" },
		{ id: "tools", name: t("skills.categories.tools"), icon: "🛠️" },
	];

	const getLevelColor = (level) => {
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

	const filteredSkills = selectedCategory === "all" ? skills : skills.filter((skill) => skill.category === selectedCategory);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 100,
			},
		},
	};

	return (
		<div className="w-full min-h-screen relative flex justify-between flex-col items-center overflow-hidden">
			{/* Animated Background */}
			<div className="fixed inset-0 -z-10">
				<div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-violet-950"></div>
				<div className="absolute top-20 left-10 w-96 h-96 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
				<div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
				<div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
			</div>

			<Navbar />

			<div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center py-12 gap-12">
				{/* Header Section */}
				<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full text-center">
					<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
						{t("skills.title")}
					</h1>
					<p className="text-xl text-gray-400 max-w-2xl mx-auto">{t("skills.subtitle")}</p>
				</motion.div>

				{/* Category Filter */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className="flex flex-wrap justify-center gap-3"
				>
					{categories.map((category) => (
						<motion.button
							key={category.id}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => setSelectedCategory(category.id)}
							className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
								selectedCategory === category.id
									? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/50"
									: "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 border border-gray-700"
							}`}
						>
							<span className="mr-2">{category.icon}</span>
							{category.name}
						</motion.button>
					))}
				</motion.div>

				{/* Skills Grid */}
				<motion.div
					key={selectedCategory}
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
				>
					{filteredSkills.map((skill, i) => (
						<motion.a
							key={i}
							variants={itemVariants}
							href={skill.href}
							target="_blank"
							rel="noopener noreferrer"
							whileHover={{ y: -10, scale: 1.05 }}
							className="group relative bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 transition-all duration-300 hover:border-violet-500/50 overflow-hidden"
						>
							{/* Glow Effect on Hover */}
							<div
								className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
							></div>

							{/* Animated Border Glow */}
							<div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${skill.color} blur-xl`}></div>
							</div>

							<div className="relative z-10 flex flex-col items-center justify-center gap-4 h-full">
								{/* Icon */}
								<motion.div
									whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
									transition={{ duration: 0.5 }}
									className="w-16 h-16 sm:w-20 sm:h-20"
								>
									<img draggable={false} src={skill.icon} alt={skill.title} className="w-full h-full object-contain" />
								</motion.div>

								{/* Title */}
								<span className="text-gray-200 font-semibold text-center text-sm sm:text-base">{skill.title}</span>

								{/* Level Badge */}
								<span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(skill.level)}`}>{skill.level}</span>
							</div>

							{/* Shine Effect */}
							<div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
						</motion.a>
					))}
				</motion.div>

				{/* Stats Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
					className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
				>
					<div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl border border-violet-500/20 p-6 text-center">
						<div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-2">
							{skills.length}+
						</div>
						<div className="text-gray-400 text-sm sm:text-base">{t("skills.stats.technologies")}</div>
					</div>

					<div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-6 text-center">
						<div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">5+</div>
						<div className="text-gray-400 text-sm sm:text-base">{t("skills.stats.experience")}</div>
					</div>

					<div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl border border-green-500/20 p-6 text-center">
						<div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
							50+
						</div>
						<div className="text-gray-400 text-sm sm:text-base">{t("skills.stats.projects")}</div>
					</div>

					<div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 backdrop-blur-sm rounded-2xl border border-pink-500/20 p-6 text-center">
						<div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-2">
							{skills.filter((s) => s.level === "Expert").length}
						</div>
						<div className="text-gray-400 text-sm sm:text-base">{t("skills.stats.expert")}</div>
					</div>
				</motion.div>

				{/* Current Position Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6 }}
					className="w-full bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 sm:p-12 flex flex-col justify-center"
				>
					<h2 className="w-full text-elipsis text-3xl sm:text-4xl font-bold text-gray-200 mb-6 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
						{t("skills.position.title")}
					</h2>
					<TypeAnimation sequence={[t("skills.position.description"), 500]} wrapper="p" className="text-xl sm:text-2xl text-gray-400" />
				</motion.div>
			</div>

			<Footer />

			<style jsx>{`
				@keyframes blob {
					0%,
					100% {
						transform: translate(0, 0) scale(1);
					}
					33% {
						transform: translate(30px, -50px) scale(1.1);
					}
					66% {
						transform: translate(-20px, 20px) scale(0.9);
					}
				}
				.animate-blob {
					animation: blob 7s infinite;
				}
				.animation-delay-2000 {
					animation-delay: 2s;
				}
				.animation-delay-4000 {
					animation-delay: 4s;
				}
			`}</style>
		</div>
	);
};

export default Skills;
