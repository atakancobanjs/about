import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsPcDisplay, BsGlobe2, BsPhone, BsGear, BsX, BsBoxArrowUpRight } from "react-icons/bs";
import { FiCalendar, FiExternalLink } from "react-icons/fi";

import StackBadge from "./StackBadge";

const PLATFORM_META = {
	web: {
		labelKey: "developingProjects.chatApp.platforms.web",
		icon: <BsGlobe2 className="text-sky-400" size={18} />,
		href: "https://chataverna.netlify.app/",
	},
	desktop: {
		labelKey: "developingProjects.chatApp.platforms.desktop",
		icon: <BsPcDisplay className="text-violet-400" size={18} />,
		href: "https://chataverna.netlify.app/download",
	},
	mobile: {
		labelKey: "developingProjects.chatApp.platforms.mobile",
		icon: <BsPhone className="text-green-400" size={18} />,
		href: "#",
	},
};

const ChatAppProjectCard = React.memo(({ project, tFunc }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleCardClick = () => {
		setIsModalOpen(true);
	};

	return (
		<>
			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.4, ease: "easeOut" }}
				whileHover={{ y: -4 }}
				onClick={handleCardClick}
				className="group relative cursor-pointer bg-[#0D1117] border border-gray-800/80 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:border-gray-700 col-span-1 md:col-span-1 flex flex-col justify-between"
			>
				<div className="relative w-full h-44 bg-gradient-to-br from-gray-900 via-[#161B22] to-gray-900 overflow-hidden border-b border-gray-800/60 flex items-center justify-center">
					{project.image ? (
						<img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
					) : (
						<div className="flex items-center justify-center text-4xl text-gray-700 opacity-40 group-hover:scale-110 transition-transform duration-500">{project.icon}</div>
					)}

					<div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-black/30" />

					<div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full backdrop-blur-md">
						<span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
						<span className="text-xs font-medium text-emerald-400">{tFunc("developingProjects.chatApp.completed")} 2/3</span>
					</div>
				</div>

				<div className="p-5 flex-1 flex flex-col justify-between space-y-4">
					<div className="space-y-2">
						<div className="flex items-center justify-between gap-2">
							<h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">{project.title}</h3>
							<FiExternalLink size={17} className="text-gray-500 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
						</div>

						<p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{project.description}</p>
					</div>

					<div className="flex flex-wrap gap-1.5 pt-1">
						{project.stack.map((tech) => (
							<StackBadge key={tech} tech={tech} />
						))}
					</div>

					<div className="pt-2 border-t border-gray-800/40 flex items-center gap-2 text-xs text-gray-500">
						<FiCalendar size={13} className="text-gray-500" />
						<span>{project.date}</span>
					</div>
				</div>
			</motion.div>

			<AnimatePresence>
				{isModalOpen && (
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />

						<motion.div
							initial={{ scale: 0.95, opacity: 0, y: 15 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.95, opacity: 0, y: 15 }}
							className="relative w-full max-w-md bg-[#0D1117] border border-gray-800 rounded-2xl p-6 shadow-2xl z-10 space-y-5"
						>
							<div className="flex items-center justify-between">
								<div>
									<h3 className="text-lg font-bold text-white">{project.title}</h3>
									<p className="text-xs text-gray-400 mt-0.5">Erişmek istediğiniz platformu seçin</p>
								</div>
								<button onClick={() => setIsModalOpen(false)} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors">
									<BsX size={22} />
								</button>
							</div>

							<div className="space-y-2.5">
								{project.platforms.map(({ key, status }) => {
									const meta = PLATFORM_META[key];
									const isMobile = key === "mobile";

									return (
										<a
											key={key}
											href={meta.href}
											target="_blank"
											rel="noopener noreferrer"
											onClick={(e) => {
												if (isMobile) e.preventDefault();
												else setIsModalOpen(false);
											}}
											className={`flex items-center justify-between p-3.5 rounded-xl border border-gray-800/80 bg-[#161B22]/60 transition-all ${
												isMobile ? "opacity-50 cursor-not-allowed" : "hover:border-emerald-500/40 hover:bg-[#161B22]"
											}`}
										>
											<div className="flex items-center gap-3">
												<div className="p-2 bg-[#0D1117] border border-gray-800 rounded-lg">{meta.icon}</div>
												<span className="text-sm font-medium text-gray-200">{tFunc(meta.labelKey)}</span>
											</div>

											{isMobile ? (
												<span className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
													<BsGear size={12} className="animate-spin" />
													{tFunc("developingProjects.chatApp.developing")}
												</span>
											) : (
												<BsBoxArrowUpRight className="text-gray-400" size={15} />
											)}
										</a>
									);
								})}
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</>
	);
});

export default ChatAppProjectCard;
