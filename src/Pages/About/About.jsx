import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { BsFillStarFill, BsGithub, BsCalendar3 } from "react-icons/bs";
import { GoRepoForked } from "react-icons/go";
import { MdOutlineBalance, MdUpdate } from "react-icons/md";
import { CgTranscript } from "react-icons/cg";
import { FiExternalLink, FiFilter } from "react-icons/fi";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Select } from "antd";
import { useTranslation } from "react-i18next";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

import pp_1 from "../../Public/profile_photo_1.jpg";
import pp_2 from "../../Public/profile_photo_2.jpg";
import pp_3 from "../../Public/profile_photo_3.jpg";
import pp_4 from "../../Public/profile_photo_4.jpeg";
import pp_5 from "../../Public/profile_photo_5.jpeg";

const About = () => {
	const [repos, setRepos] = useState([]);
	const [filteredRepos, setFilteredRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedLanguage, setSelectedLanguage] = useState("all");
	const [sortBy, setSortBy] = useState("stars");
	const [selectedProject, setSelectedProject] = useState(null);

	const { t } = useTranslation();

	useEffect(() => {
		const fetchDataFromGithub = async () => {
			setLoading(true);
			try {
				const { data } = await axios.get("https://api.github.com/users/atakancobanjs/repos");
				setRepos(data);
				setFilteredRepos(data);
			} catch (error) {
				console.error("Error fetching repos:", error);
			}
			setLoading(false);
		};

		fetchDataFromGithub();
	}, []);

	useEffect(() => {
		let filtered = [...repos];

		// Language filter
		if (selectedLanguage !== "all") {
			filtered = filtered.filter((repo) => repo.language === selectedLanguage);
		}

		// Sorting
		filtered.sort((a, b) => {
			switch (sortBy) {
				case "stars":
					return b.stargazers_count - a.stargazers_count;
				case "forks":
					return b.forks - a.forks;
				case "updated":
					return new Date(b.updated_at) - new Date(a.updated_at);
				default:
					return 0;
			}
		});

		setFilteredRepos(filtered);
	}, [selectedLanguage, sortBy, repos]);

	const getLanguages = () => {
		const languages = [...new Set(repos.map((repo) => repo.language).filter(Boolean))];
		return languages;
	};

	const getLanguageColor = (language) => {
		const colors = {
			JavaScript: "from-yellow-400 to-yellow-600",
			TypeScript: "from-blue-500 to-blue-700",
			Python: "from-blue-400 to-blue-600",
			Java: "from-red-500 to-orange-600",
			HTML: "from-orange-500 to-red-600",
			CSS: "from-blue-400 to-purple-500",
			React: "from-cyan-400 to-blue-500",
			"C++": "from-pink-500 to-purple-600",
			Ruby: "from-red-600 to-red-800",
			Go: "from-cyan-500 to-blue-600",
		};
		return colors[language] || "from-gray-500 to-gray-700";
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const now = new Date();
		const diffTime = Math.abs(now - date);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays < 30) return `${diffDays} ${t("about.projects.daysAgo")}`;
		if (diffDays < 365) return `${Math.floor(diffDays / 30)} ${t("about.projects.monthsAgo")}`;
		return `${Math.floor(diffDays / 365)} ${t("about.projects.yearsAgo")}`;
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const cardVariants = {
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
		<div className="w-full min-h-screen relative flex flex-col overflow-hidden">
			{/* Animated Background */}
			<div className="fixed inset-0 -z-10">
				<div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-violet-950"></div>
				<div className="absolute top-20 left-10 w-96 h-96 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
				<div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
				<div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
			</div>

			<Navbar />

			<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
				{/* Hero Section */}
				<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16 text-center">
					{/* Profile Images */}
					<div className="relative w-64 h-64 mx-auto mb-8">
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
							className="absolute inset-0 border-4 border-violet-500/30 rounded-full"
						></motion.div>
						<div className="absolute inset-4 rounded-full overflow-hidden border-4 border-violet-500">
							<img src={pp_3} alt="Profile" className="w-full h-full object-cover" />
						</div>
						{/* Floating images */}
						<motion.div
							animate={{ y: [0, -10, 0] }}
							transition={{ duration: 3, repeat: Infinity }}
							className="absolute -top-4 -right-4 w-20 h-20 rounded-lg overflow-hidden border-2 border-violet-500"
						>
							<img src={pp_4} alt="Float 1" className="w-full h-full object-cover" />
						</motion.div>
						<motion.div
							animate={{ y: [0, 10, 0] }}
							transition={{ duration: 3, repeat: Infinity, delay: 1 }}
							className="absolute -bottom-4 -left-4 w-20 h-20 rounded-lg overflow-hidden border-2 border-violet-500"
						>
							<img src={pp_2} alt="Float 2" className="w-full h-full object-cover" />
						</motion.div>
					</div>

					<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
						{t("about.hero.title")}
					</h1>
					<p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">{t("about.hero.description")}</p>
				</motion.div>

				{/* Projects Section */}
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-8">
					{/* Header with Filters */}
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
						<h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
							{t("about.projects.title")}
						</h2>

						<div className="flex flex-wrap gap-3">
							{/* Language Filter */}
							<Select
								value={selectedLanguage}
								onChange={setSelectedLanguage}
								style={{ width: 200 }}
								size="large"
								placeholder={t("about.projects.selectLanguage")}
								suffixIcon={<FiFilter className="text-violet-400" />}
								className="custom-select"
								options={[
									{ value: "all", label: t("about.projects.allLanguages") },
									...getLanguages().map((lang) => ({
										value: lang,
										label: lang,
									})),
								]}
							/>

							{/* Sort Filter */}
							<Select
								value={sortBy}
								onChange={setSortBy}
								style={{ width: 200 }}
								size="large"
								placeholder={t("about.projects.selectSort")}
								className="custom-select"
								options={[
									{
										value: "stars",
										label: (
											<span className="flex items-center gap-2">
												<BsFillStarFill className="text-yellow-400" />
												{t("about.projects.sortByStars")}
											</span>
										),
									},
									{
										value: "forks",
										label: (
											<span className="flex items-center gap-2">
												<GoRepoForked className="text-blue-400" />
												{t("about.projects.sortByForks")}
											</span>
										),
									},
									{
										value: "updated",
										label: (
											<span className="flex items-center gap-2">
												<MdUpdate className="text-green-400" />
												{t("about.projects.sortByUpdated")}
											</span>
										),
									},
								]}
							/>
						</div>
					</div>

					{/* Stats */}
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
						<div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl border border-violet-500/20 p-4 text-center">
							<div className="text-3xl font-bold text-violet-400">{repos.length}</div>
							<div className="text-sm text-gray-400">{t("about.projects.totalRepos")}</div>
						</div>
						<div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-xl border border-yellow-500/20 p-4 text-center">
							<div className="text-3xl font-bold text-yellow-400">{repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)}</div>
							<div className="text-sm text-gray-400">{t("about.projects.totalStars")}</div>
						</div>
						<div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-xl border border-blue-500/20 p-4 text-center">
							<div className="text-3xl font-bold text-blue-400">{repos.reduce((acc, repo) => acc + repo.forks, 0)}</div>
							<div className="text-sm text-gray-400">{t("about.projects.totalForks")}</div>
						</div>
						<div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-xl border border-green-500/20 p-4 text-center">
							<div className="text-3xl font-bold text-green-400">{getLanguages().length}</div>
							<div className="text-sm text-gray-400">{t("about.projects.languages")}</div>
						</div>
					</div>

					{/* Projects Grid */}
					{loading ? (
						<div className="w-full h-64 flex items-center justify-center">
							<Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: "#8b5cf6" }} spin />} />
						</div>
					) : (
						<motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{filteredRepos.map((repo) => (
								<motion.div key={repo.id} variants={cardVariants} whileHover={{ y: -5 }}>
									<a
										href={repo.html_url}
										target="_blank"
										rel="noopener noreferrer"
										className="group relative bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 transition-all duration-300 hover:border-violet-500/50 overflow-hidden block h-full"
									>
										{/* Gradient overlay */}
										<div
											className={`absolute inset-0 bg-gradient-to-br ${getLanguageColor(
												repo.language
											)} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
										></div>

										{/* Content */}
										<div className="relative z-10 flex flex-col h-full">
											{/* Header */}
											<div className="flex items-start justify-between mb-4">
												<div className="flex items-center gap-3">
													<BsGithub size={24} className="text-gray-400" />
													<h3 className="text-xl font-bold text-white group-hover:text-violet-400 transition-colors">{repo.name}</h3>
												</div>
												<FiExternalLink size={20} className="text-gray-400 group-hover:text-violet-400 transition-colors" />
											</div>

											{/* Description */}
											<p className="text-gray-400 mb-4 line-clamp-2 flex-1">{repo.description || t("about.projects.noDescription")}</p>

											{/* Language Badge */}
											{repo.language && (
												<div className="mb-4">
													<span
														className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getLanguageColor(
															repo.language
														)} bg-clip-text text-transparent border border-current/20`}
													>
														<CgTranscript size={16} className="mr-2" />
														{repo.language}
													</span>
												</div>
											)}

											{/* Stats */}
											<div className="flex flex-wrap items-center gap-3 mb-4">
												<span className="flex items-center gap-1 text-gray-300 bg-gray-800/50 rounded-lg px-3 py-1.5">
													<BsFillStarFill size={14} className="text-yellow-400" />
													<span className="text-sm">{repo.stargazers_count}</span>
												</span>
												<span className="flex items-center gap-1 text-gray-300 bg-gray-800/50 rounded-lg px-3 py-1.5">
													<GoRepoForked size={14} className="text-blue-400" />
													<span className="text-sm">{repo.forks}</span>
												</span>
												{repo.license && (
													<span className="flex items-center gap-1 text-gray-300 bg-gray-800/50 rounded-lg px-3 py-1.5">
														<MdOutlineBalance size={16} className="text-green-400" />
														<span className="text-sm">{repo.license.spdx_id}</span>
													</span>
												)}
											</div>

											{/* Updated */}
											<div className="flex items-center gap-2 text-sm text-gray-500">
												<MdUpdate size={16} />
												<span>
													{t("about.projects.updated")} {formatDate(repo.updated_at)}
												</span>
											</div>
										</div>

										{/* Shine effect */}
										<div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
									</a>
								</motion.div>
							))}
						</motion.div>
					)}
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

			<style jsx global>{`
				.custom-select .ant-select-selector {
					border: 1px solid rgb(55, 65, 81) !important;
					color: rgb(209, 213, 219) !important;
					height: 42px !important;
					display: flex;
					align-items: center;
					backdrop-filter: blur(8px);
					transition: all 0.3s ease;
				}

				.custom-select .ant-select-selector:hover {
					border-color: rgb(139, 92, 246) !important;
					box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.1);
				}

				.custom-select.ant-select-focused .ant-select-selector {
					border-color: rgb(139, 92, 246) !important;
					box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2) !important;
				}

				.custom-select .ant-select-arrow {
					color: rgb(139, 92, 246);
				}

				.custom-select .ant-select-selection-item {
					color: rgb(209, 213, 219) !important;
					display: flex;
					align-items: center;
				}

				.ant-select-dropdown {
					border-radius: 12px !important;
					padding: 8px !important;
				}

				.ant-select-item {
					color: rgb(209, 213, 219) !important;
					border-radius: 8px !important;
					margin: 2px 0 !important;
				}

				.ant-select-item-option-active {
					background: rgba(139, 92, 246, 0.1) !important;
				}
			`}</style>
		</div>
	);
};

export default About;
