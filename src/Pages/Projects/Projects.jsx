import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

import { FiExternalLink, FiCalendar, FiCode, FiLayers } from "react-icons/fi";
import { BsRocket, BsCodeSlash } from "react-icons/bs";

import AboutCardPhoto from "../../Public/Card/about_page_card_photo.png";
import WeatherCardPhoto from "../../Public/Card/weather_page_card_photo.png";
import TodoCardPhoto from "../../Public/Card/todo_page_card_photo.png";
import FaceidCardPhoto from "../../Public/Card/faceid_page_card_photo.png";
import Mu6CardPhoto from "../../Public/Card/mu6_page_card_photo.png"

const Projects = () => {
	const { t } = useTranslation();
	const [hoveredProject, setHoveredProject] = useState(null);

	const ProjectsData = [
		{
			image_url: AboutCardPhoto,
			title: t("projects.about.title"),
			description: t("projects.about.description"),
			hash: "https://about-bl2.pages.dev/projects",
			date: t("projects.about.date"),
			color: "from-violet-500 to-purple-600",
			status: "live",
		},
		{
			image_url: WeatherCardPhoto,
			title: t("projects.weather.title"),
			description: t("projects.weather.description"),
			hash: "https://weather-3ib.pages.dev/",
			date: t("projects.weather.date"),
			color: "from-blue-500 to-cyan-600",
			status: "live",
		},
		{
			image_url: TodoCardPhoto,
			title: t("projects.todo.title"),
			description: t("projects.todo.description"),
			hash: "https://todo-app-985.pages.dev/",
			date: t("projects.todo.date"),
			color: "from-pink-500 to-rose-600",
			status: "live",
		},
		{
			image_url: FaceidCardPhoto,
			title: t("projects.face_id.title"),
			description: t("projects.face_id.description"),
			hash: "https://face-id.pages.dev/",
			date: t("projects.face_id.date"),
			color: "from-yellow-500 to-amber-600",
			status: "live",
		},
		{
			image_url: Mu6CardPhoto,
			title: t("projects.mu6.title"),
			description: t("projects.mu6.description"),
			hash: "https://face-id.pages.dev/",
			date: t("projects.mu6.date"),
			color: "from-sky-500 to-purple-600",
			status: "live",
	];

	const DevelopedProjects = [
		{
			title: t("developingProjects.chatApp.title"),
			description: t("developingProjects.chatApp.description"),
			date: t("developingProjects.chatApp.date"),
			color: "from-green-500 to-emerald-600",
			icon: <BsCodeSlash size={32} />,
			progress: 75,
		},
		{
			title: t("developingProjects.blogApp.title"),
			description: t("developingProjects.blogApp.description"),
			date: t("developingProjects.blogApp.date"),
			color: "from-orange-500 to-red-600",
			icon: <FiLayers size={32} />,
			progress: 60,
		},
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 50, opacity: 0 },
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
		<div className="min-h-screen w-full relative flex flex-col">
			{/* Animated Background */}
			<div className="fixed inset-0 -z-10">
				<div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-violet-950"></div>
				<div className="absolute top-20 left-10 w-96 h-96 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
				<div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
				<div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
			</div>

			<Navbar />

			<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
				{/* Header Section */}
				<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16 text-center">
					<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
						{t("projects.title")}
					</h1>
					<div className="max-w-3xl mx-auto">
						<TypeAnimation sequence={[t("projects.description"), 500]} wrapper="p" className="text-xl sm:text-2xl text-gray-400 leading-relaxed" />
					</div>
				</motion.div>

				{/* Live Projects Section */}
				<motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-20">
					<motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
						<div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
							<BsRocket size={24} className="text-white" />
						</div>
						<div>
							<h2 className="text-3xl sm:text-4xl font-bold text-gray-200">{t("projects.liveProjects")}</h2>
							<p className="text-sm text-gray-500">{t("projects.liveProjectsSubtitle")}</p>
						</div>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{ProjectsData.map((project, index) => (
							<motion.div
								key={index}
								variants={itemVariants}
								whileHover={{ y: -10 }}
								onHoverStart={() => setHoveredProject(`live-${index}`)}
								onHoverEnd={() => setHoveredProject(null)}
							>
								<a
									href={project.hash}
									target="_blank"
									rel="noopener noreferrer"
									className="group block relative bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden transition-all duration-300 hover:border-violet-500/50 h-full"
								>
									{/* Image Container */}
									<div className="relative h-48 overflow-hidden">
										<motion.img
											src={project.image_url}
											alt={project.title}
											className="w-full h-full object-cover"
											animate={{
												scale: hoveredProject === `live-${index}` ? 1.1 : 1,
											}}
											transition={{ duration: 0.3 }}
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>

										{/* Status Badge */}
										<div className="absolute top-3 right-3">
											<span className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-xs font-semibold text-green-400 flex items-center gap-1.5 backdrop-blur-sm">
												<span className="relative flex h-2 w-2">
													<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
													<span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
												</span>
												{t("projects.statusLive")}
											</span>
										</div>

										{/* Gradient Overlay */}
										<div
											className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
										></div>
									</div>

									{/* Content */}
									<div className="p-6 space-y-4">
										<div className="flex items-start justify-between gap-3">
											<h3 className="text-xl font-bold text-white group-hover:text-violet-400 transition-colors line-clamp-1">{project.title}</h3>
											<FiExternalLink size={20} className="text-gray-400 group-hover:text-violet-400 transition-colors flex-shrink-0" />
										</div>

										<p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{project.description}</p>

										<div className="flex items-center gap-2 text-sm text-gray-500">
											<FiCalendar size={14} />
											<span>{project.date}</span>
										</div>
									</div>

									{/* Shine Effect */}
									<div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
								</a>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Developing Projects Section */}
				{DevelopedProjects.length > 0 && (
					<motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-12">
						<motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
							<div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
								<FiCode size={24} className="text-white" />
							</div>
							<div>
								<h2 className="text-3xl sm:text-4xl font-bold text-gray-200">{t("developingProjects.title")}</h2>
								<p className="text-sm text-gray-500">{t("developingProjects.description")}</p>
							</div>
						</motion.div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{DevelopedProjects.map((project, index) => (
								<motion.div
									key={index}
									variants={itemVariants}
									whileHover={{ y: -8 }}
									onHoverStart={() => setHoveredProject(`dev-${index}`)}
									onHoverEnd={() => setHoveredProject(null)}
									className="group relative bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 overflow-hidden transition-all duration-300 hover:border-orange-500/50"
								>
									{/* Gradient Background */}
									<div
										className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
									></div>

									<div className="relative z-10 space-y-4">
										{/* Icon & Status */}
										<div className="flex items-start justify-between">
											<motion.div
												className={`p-3 bg-gradient-to-br ${project.color} rounded-xl text-white`}
												animate={{
													rotate: hoveredProject === `dev-${index}` ? [0, -10, 10, 0] : 0,
												}}
												transition={{ duration: 0.5 }}
											>
												{project.icon}
											</motion.div>
											<span className="px-3 py-1 bg-orange-500/20 border border-orange-500/50 rounded-full text-xs font-semibold text-orange-400">
												{t("projects.statusDeveloping")}
											</span>
										</div>

										{/* Title */}
										<h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">{project.title}</h3>

										{/* Description */}
										<p className="text-gray-400 leading-relaxed">{project.description}</p>

										{/* Progress Bar */}
										<div className="space-y-2">
											<div className="flex items-center justify-between text-sm">
												<span className="text-gray-500">{t("projects.progress")}</span>
												<span className={`font-semibold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>{project.progress}%</span>
											</div>
											<div className="h-2 bg-gray-800 rounded-full overflow-hidden">
												<motion.div
													className={`h-full bg-gradient-to-r ${project.color} rounded-full`}
													initial={{ width: 0 }}
													animate={{ width: `${project.progress}%` }}
													transition={{ duration: 1, delay: 0.5 }}
												></motion.div>
											</div>
										</div>

										{/* Date */}
										<div className="flex items-center gap-2 text-sm text-gray-500">
											<FiCalendar size={14} />
											<span>{project.date}</span>
										</div>
									</div>

									{/* Shine Effect */}
									<div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
								</motion.div>
							))}
						</div>
					</motion.div>
				)}
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

export default Projects;
