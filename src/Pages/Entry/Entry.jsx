import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const Home = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const [station, setStation] = useState({ text_1: false, text_2: false });
	const [showWelcome, setShowWelcome] = useState(false);
	const [particles, setParticles] = useState([]);

	// Generate particles
	useEffect(() => {
		const newParticles = Array.from({ length: 50 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 4 + 1,
			duration: Math.random() * 3 + 2,
			delay: Math.random() * 2,
		}));
		setParticles(newParticles);
	}, []);

	useEffect(() => {
		if (station.text_1 && station.text_2) {
			setShowWelcome(true);
			setTimeout(() => {
				navigate("/home");
			}, 1500);
		}
	}, [station, navigate]);

	return (
		<div className="w-screen h-screen relative overflow-hidden bg-black">
			{/* Animated Background Blobs */}
			<motion.div
				className="w-96 h-96 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500 absolute blur-3xl opacity-20"
				animate={{
					x: [-50, 100, -50],
					y: [-50, 50, -50],
					scale: [1, 1.2, 1],
				}}
				transition={{
					duration: 8,
					repeat: Infinity,
					ease: "easeInOut",
				}}
				style={{ bottom: "-10%", left: "-10%" }}
			/>

			<motion.div
				className="w-96 h-96 rounded-full bg-gradient-to-tr from-violet-500 to-blue-500 absolute blur-3xl opacity-20"
				animate={{
					x: [0, -100, 0],
					y: [0, 100, 0],
					scale: [1.2, 1, 1.2],
				}}
				transition={{
					duration: 10,
					repeat: Infinity,
					ease: "easeInOut",
				}}
				style={{ top: "-10%", right: "-10%" }}
			/>

			<motion.div
				className="w-72 h-72 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 absolute blur-3xl opacity-15"
				animate={{
					x: [50, -50, 50],
					y: [50, -50, 50],
					scale: [1, 1.3, 1],
				}}
				transition={{
					duration: 7,
					repeat: Infinity,
					ease: "easeInOut",
				}}
				style={{ top: "50%", left: "50%" }}
			/>

			{/* Floating Particles */}
			{particles.map((particle) => (
				<motion.div
					key={particle.id}
					className="absolute rounded-full bg-gradient-to-r from-pink-500 to-violet-500"
					style={{
						left: `${particle.x}%`,
						top: `${particle.y}%`,
						width: particle.size,
						height: particle.size,
					}}
					animate={{
						y: [0, -30, 0],
						opacity: [0.2, 0.8, 0.2],
					}}
					transition={{
						duration: particle.duration,
						repeat: Infinity,
						delay: particle.delay,
						ease: "easeInOut",
					}}
				/>
			))}

			{/* Noise Texture */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				className="absolute top-0 left-0 w-full h-full pointer-events-none"
			>
				<filter id="n" x="0" y="0">
					<feTurbulence type="fractalNoise" baseFrequency="0.5" stitchTiles="stitch" />
				</filter>
				<rect width="100%" height="100%" filter="url(#n)" opacity="0.08" />
			</svg>

			{/* Main Content */}
			<div className="h-full relative flex flex-col justify-center items-center gap-8 px-4">
				{/* Animated Text */}
				<motion.div className="relative z-20" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
					{/* Glowing Background Text */}
					<div className="absolute inset-0 blur-2xl">
						<TypeAnimation
							sequence={[t("hi"), 1000, () => setStation((v) => ({ ...v, text_2: true }))]}
							wrapper="span"
							cursor={false}
							className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 text-4xl sm:text-6xl md:text-8xl text-nowrap"
						/>
					</div>

					{/* Main Text with Gradient */}
					<TypeAnimation
						sequence={[t("hi"), 100, () => setStation((v) => ({ ...v, text_1: true }))]}
						wrapper="span"
						cursor={true}
						repeat={1}
						className="relative font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-violet-500 to-purple-500 text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-nowrap"
						style={{
							textShadow: "0 0 80px rgba(236, 72, 153, 0.5)",
						}}
					/>
				</motion.div>

				{/* Subtitle Animation */}
				<AnimatePresence>
					{station.text_1 && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.8 }}
							className="relative z-20"
						>
							<p className="text-gray-400 text-lg sm:text-xl md:text-2xl text-center font-light">{t("home.subtitle")}</p>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Loading Progress */}
				<AnimatePresence>
					{station.text_1 && !showWelcome && (
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							className="relative z-20 w-64 sm:w-80"
						>
							<div className="h-1 bg-gray-800 rounded-full overflow-hidden">
								<motion.div
									className="h-full bg-gradient-to-r from-pink-500 via-violet-500 to-purple-500"
									initial={{ width: "0%" }}
									animate={{ width: "100%" }}
									transition={{ duration: 1.5, ease: "easeInOut" }}
								/>
							</div>
							<motion.p
								className="text-center text-gray-500 text-sm mt-3"
								animate={{ opacity: [0.5, 1, 0.5] }}
								transition={{ duration: 1.5, repeat: Infinity }}
							>
								{t("home.loading")}
							</motion.p>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Welcome Message */}
				<AnimatePresence>
					{showWelcome && (
						<motion.div
							initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
							animate={{ opacity: 1, scale: 1, rotate: 0 }}
							exit={{ opacity: 0, scale: 1.5 }}
							transition={{ type: "spring", stiffness: 200, damping: 20 }}
							className="absolute inset-0 flex items-center justify-center z-30"
						>
							<div className="relative">
								{/* Glow Effect */}
								<div className="absolute inset-0 blur-3xl bg-gradient-to-r from-pink-500 via-violet-500 to-purple-500 opacity-50 animate-pulse"></div>

								{/* Welcome Text */}
								<motion.div
									animate={{
										scale: [1, 1.1, 1],
									}}
									transition={{
										duration: 0.5,
										repeat: 2,
									}}
									className="relative px-8 py-4 rounded-2xl border-2 border-violet-500 bg-black/50 backdrop-blur-xl"
								>
									<p className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-violet-400 to-purple-400">
										{t("home.welcome")} ✨
									</p>
								</motion.div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Animated Rings */}
				<motion.div
					className="absolute inset-0 flex items-center justify-center pointer-events-none"
					initial={{ opacity: 0 }}
					animate={{ opacity: station.text_1 ? 0.3 : 0 }}
				>
					{[1, 2, 3].map((ring) => (
						<motion.div
							key={ring}
							className="absolute rounded-full border border-violet-500/20"
							style={{
								width: `${ring * 200}px`,
								height: `${ring * 200}px`,
							}}
							animate={{
								scale: [1, 1.2, 1],
								opacity: [0.3, 0.1, 0.3],
							}}
							transition={{
								duration: 3,
								repeat: Infinity,
								delay: ring * 0.3,
							}}
						/>
					))}
				</motion.div>
			</div>

			<style jsx>{`
				@keyframes float {
					0%,
					100% {
						transform: translateY(0px);
					}
					50% {
						transform: translateY(-20px);
					}
				}
			`}</style>
		</div>
	);
};

export default Home;
