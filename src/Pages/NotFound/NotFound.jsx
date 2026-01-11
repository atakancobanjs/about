import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const { t } = useTranslation();

	const Route = useNavigate();

	return (
		<div className="w-screen h-screen grid place-items-center place-content-center relative overflow-hidden">
			<div className="w-48 h-48 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500 absolute z-10 -bottom-10 -left-10 drop-shadow-xl blur-xl"></div>
			<div className="w-48 h-48 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500 absolute z-10 bottom-3/4 left-3/4 drop-shadow-xl blur-xl"></div>
			<div className="h-full relative flex justify-center items-center flex-col gap-3">
				<h1 className="text-transparent font-black bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 md:text-[10rem] text-9xl">
					404
				</h1>
				<div className="flex items-center justify-center gap-3 flex-col">
					<span className="md:text-3xl text-2xl text-gray-500 font-medium">
						{t("notfound.description", { url: window.location.pathname })}
					</span>
					<div className="relative flex items-center justify-center">
						<a
							href="/home"
							className="p-2 rounded-md text-slate-100 text-2xl font-medium hover:text-white bg-gradient-to-r from-sky-500 to-indigo-500 peer z-10 transition-all"
						>
							{t("notfound.button")}
						</a>
						<span className="w-full h-full absolute bg-gradient-to-r to-sky-900 from-indigo-700 rounded-md peer-hover:blur-2xl z-0 transition-all"></span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
