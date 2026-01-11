import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Spin } from "hamburger-react";

import Link from "./Items/Link";
import LanguagePicker from "./Items/LanguagePicker";

import "./style.css";

const ChipTabs = () => {
	const { t } = useTranslation();

	const tabs = [
		{ text: t("navbar.list.home"), hash: "/home" },
		{ text: t("navbar.list.contact"), hash: "/contact" },
		{ text: t("navbar.list.about"), hash: "/about" },
		{ text: t("navbar.list.faq"), hash: "/skills" },
		{ text: t("navbar.list.projects"), hash: "/projects" },
	];

	const { pathname } = useLocation();
	const navigate = useNavigate();

	const [selected, setSelected] = useState(pathname);
	const [isOpen, setOpen] = useState(false);

	const currentUrl = tabs.find((t) => t.hash === pathname);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) setOpen(false);
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		navigate(selected);
	}, [selected, navigate]);

	return (
		<div className={`w-full flex justify-center ${isOpen ? "h-screen fixed p-0" : "sticky pt-5"} transition-all z-50`}>
			{isOpen && (
				<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="absolute w-full h-full">
					<filter id="n" x="0" y="0">
						<feTurbulence type="fractalNoise" baseFrequency="0.5" stitchTiles="stitch" />
					</filter>
					<rect width="100%" height="100%" fill="#000" />
					<rect width="100%" height="100%" filter="url(#n)" opacity="0.15" />
				</svg>
			)}
			<div
				className={`w-3/4 p-5 border border-[#555] rounded-lg gap-5 flex ${
					isOpen ? "max-md:flex-col-reverse max-md:gap-5 justify-center" : "max-md:justify-between max-md:py-3 justify-center items-center"
				}`}
			>
				<AnimatePresence>
					{tabs.map((tab) => (
						<Link
							key={tab.hash}
							text={tab.text}
							selected={selected === tab.hash}
							setSelected={setSelected}
							hash={tab.hash}
							isOpen={isOpen}
							currentUrl={currentUrl}
						/>
					))}
				</AnimatePresence>
				<LanguagePicker isOpen={isOpen} />
				<Spin toggled={isOpen} toggle={setOpen} color="white" direction="right" size={32} />
			</div>
		</div>
	);
};

export default ChipTabs;
