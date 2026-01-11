import React, { useRef, useEffect, useState } from "react";

import { TypeAnimation } from "react-type-animation";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Img from "../../Public/Profile.jpg";

const Home = () => {
	const { t, i18n } = useTranslation();

	const navigate = useNavigate();

	return (
		<div className="w-screen h-screen relative flex justify-between flex-col">
			<Navbar />
			<div className="flex items-center justify-evenly p-5 w-full h-3/4 max-lg:flex-col-reverse relative">
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
				<div className="flex items-center justify-center w-2/3">
					<div className="flex flex-col items-center justify-center w-full relative">
						<img src={Img} draggable={false} className="w-64 bg-cover rounded-lg z-10" />
						<img src={Img} draggable={false} className="w-64 bg-cover rounded-lg blur-xl absolute" />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Home;
