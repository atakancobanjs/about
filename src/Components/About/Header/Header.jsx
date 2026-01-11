import React from "react";
import { useTranslation } from "react-i18next";
import { TypeAnimation } from "react-type-animation";

import Motorlu from "../../../Public/Motorlu.jpg";

const Header = () => {
	const { t } = useTranslation();

	return (
		<div className="w-full h-full flex items-center justify-center p-3 gap-5 max-lg:flex-col">
			<div className="flex items-center justify-center max-lg:w-full m-5">
				<div className="flex flex-col items-center relative max-lg:w-full">
					<img src={Motorlu} draggable={false} className="w-64 bg-cover rounded-lg z-10" />
					<img src={Motorlu} draggable={false} className="w-64 bg-cover rounded-lg blur-xl absolute" />
				</div>
			</div>
			<div className="flex flex-col justify-between gap-3 w-1/2 h-full max-lg:items-center max-lg:w-full">
				<h1 className="text-gray-300 text-4xl max-lg:text-center max-xl:text-3xl max-md:text-2xl">
					<strong>{t("about.title")}</strong>
				</h1>
				<div className="min-h-[100px] max-lg:w-full">
					<TypeAnimation
						sequence={[t("about.paragraph"), 500]}
						wrapper="p"
						className="indent-4 text-2xl text-gray-400 h-full max-lg:text-xl max-xl:text-center w-full"
					/>
				</div>
			</div>
		</div>
	);
};

export default Header;
