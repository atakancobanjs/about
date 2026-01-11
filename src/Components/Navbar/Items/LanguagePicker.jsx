import React from "react";

import Turkey from "../Flags/Turkey";
import Uk from "../Flags/Uk";

import { Select } from "antd";

import { useTranslation } from "react-i18next";

const LanguagePicker = ({ isOpen }) => {
	const { i18n } = useTranslation();

	const Language = [
		{
			text: "Türkçe",
			icon: <Turkey />,
			code: "tr-TR",
		},
		{
			text: "English",
			icon: <Uk />,
			code: "en-EN",
		},
	];

	const HandleLanguage = (value) => i18n.changeLanguage(value);

	return (
		<Select
			suffixIcon={null}
			defaultValue={i18n.language}
			className={`w-32 ${isOpen ? "max-lg:block max-lg:w-full" : "max-md:hidden"}`}
			onChange={HandleLanguage}
		>
			{Language.map((lng, index) => (
				<Select.Option value={lng.code} key={index}>
					<div className={`w-full flex items-center gap-2`}>
						<div>{lng.icon}</div>
						<span className={`font-bold ${!isOpen && "max-lg:hidden"}`}>{lng.text}</span>
					</div>
				</Select.Option>
			))}
		</Select>
	);
};

export default LanguagePicker;
