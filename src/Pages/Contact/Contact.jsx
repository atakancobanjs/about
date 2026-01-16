import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

import { BiLogoGithub, BiLogoInstagram, BiLogoGmail, BiLogoLinkedin, BiLogoDiscord } from "react-icons/bi";
import { FiX, FiCopy, FiCheck, FiSend, FiMail, FiUser, FiMessageSquare } from "react-icons/fi";

import emailjs from "@emailjs/browser";

const Contact = () => {
	const { t } = useTranslation();
	const [copiedEmail, setCopiedEmail] = useState(false);
	const [formData, setFormData] = useState({ name: "", email: "", message: "" });
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [hoveredCard, setHoveredCard] = useState(null);

	const medias = [
		{
			icon: <BiLogoGithub size={35} />,
			label: "Github",
			href: "https://github.com/atakancobanjs",
			username: "@atakancobanjs",
			color: "from-gray-700 to-gray-900",
			hoverColor: "group-hover:text-gray-400",
			bgColor: "bg-gradient-to-br from-gray-700/20 to-gray-900/20",
			borderColor: "border-gray-700/50 hover:border-gray-600",
		},
		{
			icon: <BiLogoInstagram size={35} />,
			label: "Instagram",
			href: "https://instagram.com/acobnn",
			username: "@acobnn",
			color: "from-purple-600 to-pink-600",
			hoverColor: "group-hover:text-pink-400",
			bgColor: "bg-gradient-to-br from-purple-600/20 to-pink-600/20",
			borderColor: "border-purple-600/50 hover:border-purple-500",
		},
		{
			icon: <FiX size={35} />,
			label: "X/Twitter",
			href: "https://x.com/ACobnn",
			username: "@ACobnn",
			color: "from-blue-400 to-blue-600",
			hoverColor: "group-hover:text-blue-400",
			bgColor: "bg-gradient-to-br from-blue-400/20 to-blue-600/20",
			borderColor: "border-blue-600/50 hover:border-blue-500",
		},
		{
			icon: <BiLogoGmail size={35} />,
			label: "Mail",
			href: "mailto:atakancoban536@gmail.com",
			username: "atakancoban536@gmail.com",
			color: "from-red-500 to-red-700",
			hoverColor: "group-hover:text-red-400",
			bgColor: "bg-gradient-to-br from-red-500/20 to-red-700/20",
			borderColor: "border-red-600/50 hover:border-red-500",
			copyable: true,
		},
		{
			icon: <BiLogoLinkedin size={35} />,
			label: "LinkedIn",
			href: "https://www.linkedin.com/in/atakan-coban-291b27138/",
			username: "@Atakan Çoban",
			color: "from-blue-600 to-blue-800",
			hoverColor: "group-hover:text-blue-500",
			bgColor: "bg-gradient-to-br from-blue-600/20 to-blue-800/20",
			borderColor: "border-blue-700/50 hover:border-blue-600",
		},
		{
			icon: <BiLogoDiscord size={35} />,
			label: "Discord",
			href: "https://discord.com/channels/@me/855812906876534845",
			username: "lurfflex",
			color: "from-indigo-500 to-indigo-700",
			hoverColor: "group-hover:text-indigo-400",
			bgColor: "bg-gradient-to-br from-indigo-500/20 to-indigo-700/20",
			borderColor: "border-indigo-600/50 hover:border-indigo-500",
		},
	];

	const copyToClipboard = (text) => {
		navigator.clipboard.writeText(text);
		setCopiedEmail(true);
		setTimeout(() => setCopiedEmail(false), 2000);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		emailjs
			.send(
				"service_xxto58p",
				"template_zc3hrw8",
				{
					from_name: formData.name,
					from_email: formData.email,
					message: formData.message,
				},
				"eQP-c2zhjhA8MROHY"
			)
			.then(() => {
				setFormSubmitted(true);
				setTimeout(() => {
					setFormSubmitted(false);
					setFormData({ name: "", email: "", message: "" });
				}, 3000);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.08,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 30, opacity: 0 },
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
		<div className="w-full min-h-screen relative flex justify-between flex-col">
			{/* Animated Background */}
			<div className="fixed inset-0 -z-10">
				<div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-blue-950"></div>
				<div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
				<div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
				<div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
			</div>

			<Navbar />

			<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center py-12 gap-12 flex-1">
				{/* Header Section */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="flex flex-col gap-6 justify-center w-full text-center"
				>
					<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
						{t("contact.title")}
					</h1>
					<div className="max-w-3xl mx-auto">
						<TypeAnimation sequence={[t("contact.description"), 500]} wrapper="p" className="text-xl sm:text-2xl text-gray-400 leading-relaxed" />
					</div>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.8 }}
						className="flex items-center justify-center gap-2 text-sm text-gray-500"
					>
						<span className="relative flex h-3 w-3">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
							<span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
						</span>
						{t("contact.responseTime")}
					</motion.div>
				</motion.div>

				{/* Social Media Cards */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
				>
					{medias.map((media, index) => (
						<motion.div
							key={index}
							variants={itemVariants}
							whileHover={{ y: -8, scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onHoverStart={() => setHoveredCard(index)}
							onHoverEnd={() => setHoveredCard(null)}
							className="relative group"
						>
							<a
								className={`relative w-full h-full flex items-center gap-4 text-gray-300 p-6 transition-all duration-300 rounded-2xl border ${media.borderColor} backdrop-blur-sm ${media.bgColor} overflow-hidden`}
								target="_blank"
								href={media.href}
								rel="noopener noreferrer"
							>
								{/* Animated gradient border */}
								<motion.div
									className={`absolute inset-0 bg-gradient-to-r ${media.color} opacity-0 blur-xl`}
									animate={{
										opacity: hoveredCard === index ? 0.3 : 0,
									}}
									transition={{ duration: 0.3 }}
								></motion.div>

								{/* Gradient overlay on hover */}
								<div
									className={`absolute inset-0 bg-gradient-to-br ${media.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
								></div>

								<motion.div
									className={`relative z-10 transition-all duration-300 ${media.hoverColor}`}
									animate={{
										rotate: hoveredCard === index ? [0, -10, 10, 0] : 0,
									}}
									transition={{ duration: 0.5 }}
								>
									{media.icon}
								</motion.div>

								<div className="relative z-10 flex justify-center flex-col flex-1">
									<span className="text-lg font-semibold mb-1">{media.label}</span>
									<span className={`text-sm bg-gradient-to-r ${media.color} bg-clip-text text-transparent font-medium`}>{media.username}</span>
								</div>

								{media.copyable && (
									<motion.button
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										onClick={(e) => {
											e.preventDefault();
											copyToClipboard(media.username);
										}}
										className="relative z-10 p-2.5 rounded-xl bg-gray-800/70 hover:bg-gray-700/70 transition-colors backdrop-blur-sm"
									>
										{copiedEmail ? <FiCheck size={18} className="text-green-400" /> : <FiCopy size={18} className="text-gray-400" />}
									</motion.button>
								)}

								{/* Shine effect */}
								<div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
							</a>
						</motion.div>
					))}
				</motion.div>

				{/* Contact Form */}
				<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="w-full max-w-4xl">
					<div className="relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden">
						{/* Decorative elements */}
						<div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
						<div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>

						<div className="relative z-10">
							<div className="flex items-center gap-3 mb-8">
								<div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl">
									<FiMail size={24} className="text-white" />
								</div>
								<div>
									<h2 className="text-3xl sm:text-4xl font-bold text-gray-200 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
										{t("contact.form.title")}
									</h2>
									<p className="text-sm text-gray-500">{t("contact.form.subtitle")}</p>
								</div>
							</div>

							{formSubmitted ? (
								<motion.div
									initial={{ scale: 0.8, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									className="flex flex-col items-center justify-center py-16 gap-4"
								>
									<motion.div
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
										className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500 flex items-center justify-center"
									>
										<FiCheck size={40} className="text-green-400" />
									</motion.div>
									<h3 className="text-2xl text-gray-300 font-bold">{t("contact.form.success")}</h3>
									<p className="text-gray-500 text-center max-w-md">{t("contact.form.successMessage")}</p>
								</motion.div>
							) : (
								<form onSubmit={handleSubmit} className="space-y-6">
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
										<div className="space-y-2">
											<label className="flex items-center gap-2 text-sm font-medium text-gray-400">
												<FiUser size={16} />
												{t("contact.form.name")}
											</label>
											<input
												type="text"
												required
												value={formData.name}
												onChange={(e) => setFormData({ ...formData, name: e.target.value })}
												className="w-full px-4 py-3.5 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none text-gray-200 transition-all placeholder:text-gray-600"
												placeholder={t("contact.form.namePlaceholder")}
											/>
										</div>
										<div className="space-y-2">
											<label className="flex items-center gap-2 text-sm font-medium text-gray-400">
												<FiMail size={16} />
												{t("contact.form.email")}
											</label>
											<input
												type="email"
												required
												value={formData.email}
												onChange={(e) => setFormData({ ...formData, email: e.target.value })}
												className="w-full px-4 py-3.5 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none text-gray-200 transition-all placeholder:text-gray-600"
												placeholder={t("contact.form.emailPlaceholder")}
											/>
										</div>
									</div>
									<div className="space-y-2">
										<label className="flex items-center gap-2 text-sm font-medium text-gray-400">
											<FiMessageSquare size={16} />
											{t("contact.form.message")}
										</label>
										<textarea
											required
											value={formData.message}
											onChange={(e) => setFormData({ ...formData, message: e.target.value })}
											rows="6"
											className="w-full px-4 py-3.5 bg-gray-900/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none text-gray-200 transition-all resize-none placeholder:text-gray-600"
											placeholder={t("contact.form.messagePlaceholder")}
										/>
									</div>
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										type="submit"
										className="w-full py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transition-all duration-300 flex items-center justify-center gap-2"
									>
										<FiSend size={20} />
										{t("contact.form.send")}
									</motion.button>
								</form>
							)}
						</div>
					</div>
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

export default Contact;
