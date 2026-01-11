import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import "./index.css";
import "../Components/Navbar/style.css";
import "./i18n.js";

// Lazy yüklenen bileşenler
const NotFound = lazy(() => import("../Pages/NotFound/NotFound"));
const Entry = lazy(() => import("../Pages/Entry/Entry"));
const Contact = lazy(() => import("../Pages/Contact/Contact"));
const About = lazy(() => import("../Pages/About/About"));
const Home = lazy(() => import("../Pages/Home/Home"));
const Skills = lazy(() => import("../Pages/Skills/Skills"));
const Projects = lazy(() => import("../Pages/Projects/Projects"));

import Loader from "../Components/Suspense/Suspense";

const App = () => {
	// Motion values - re-render'a sebep olmuyor
	const cursorX = useMotionValue(0);
	const cursorY = useMotionValue(0);
	const cursorScale = useMotionValue(1);

	// Smooth spring animasyonu
	const springConfig = { damping: 25, stiffness: 200 };
	const cursorXSpring = useSpring(cursorX, springConfig);
	const cursorYSpring = useSpring(cursorY, springConfig);
	const scaleSpring = useSpring(cursorScale, { damping: 15, stiffness: 300 });

	useEffect(() => {
		const handleMouseMove = (e) => {
			cursorX.set(e.clientX - 20);
			cursorY.set(e.clientY - 20);
		};

		const handleMouseDown = () => {
			cursorScale.set(0.8);
		};

		const handleMouseUp = () => {
			cursorScale.set(1);
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mousedown", handleMouseDown);
		window.addEventListener("mouseup", handleMouseUp);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mousedown", handleMouseDown);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, []);

	return (
		<div className="w-full h-full relative cursor-none select-none">
			{/* Custom Cursor */}
			<motion.div
				className="fixed pointer-events-none z-[100]"
				style={{
					x: cursorXSpring,
					y: cursorYSpring,
					scale: scaleSpring,
				}}
			>
				{/* Outer circle with glow */}
				<motion.div
					className="absolute w-10 h-10 rounded-full border-2 border-purple-500/50"
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.5, 0.8, 0.5],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
				{/* Glow effect */}
				<div className="absolute w-10 h-10 rounded-full bg-purple-500/20 blur-md" />
				{/* Center dot */}
				<div className="absolute w-2 h-2 rounded-full bg-pink-500 left-4 top-4" />
			</motion.div>

			{/* Noise Background */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				className="absolute w-full h-full inset-0 pointer-events-none"
			>
				<filter id="n" x="0" y="0">
					<feTurbulence type="fractalNoise" baseFrequency="0.5" stitchTiles="stitch" />
				</filter>
				<rect width="100%" height="100%" fill="#000" />
				<rect width="100%" height="100%" filter="url(#n)" opacity="0.15" />
			</svg>

			<BrowserRouter>
				<Suspense fallback={<Loader />}>
					<Routes>
						<Route exact path="/" element={<Entry />} />
						<Route path="*" element={<NotFound />} />
						<Route path="/about" element={<About />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/home" element={<Home />} />
						<Route path="/skills" element={<Skills />} />
						<Route path="/projects" element={<Projects />} />
					</Routes>
				</Suspense>
			</BrowserRouter>
		</div>
	);
};

createRoot(document.getElementById("root")).render(<App />);
