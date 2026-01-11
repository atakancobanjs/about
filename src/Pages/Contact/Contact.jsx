import React from "react";

import { useTranslation } from "react-i18next";
import { TypeAnimation } from "react-type-animation";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

import { BiLogoGithub, BiLogoInstagram, BiLogoGmail, BiLogoLinkedin, BiLogoDiscord } from "react-icons/bi";

import { FiX } from "react-icons/fi";

const Contact = () => {
	const { t } = useTranslation();

	const medias = [
		{
			icon: <BiLogoGithub size={35} />,
			label: "Github",
			href: "https://github.com/Lurff",
			username: "@Lurff",
		},
		{
			icon: <BiLogoInstagram size={35} />,
			label: "Instagram",
			href: "https://instagram.com/acobnn",
			username: "@acobnn",
		},
		{
			icon: <FiX size={35} />,
			label: "X/Twitter",
			href: "https://x.com/ACobnn",
			username: "@ACobnn",
		},
		{
			icon: <BiLogoGmail size={35} />,
			label: "Mail",
			href: "mailto:atakancoban536@gmail.com",
			username: "atakancoban536@gmail.com",
		},
		{
			icon: <BiLogoLinkedin size={35} />,
			label: "LinkIn",
			href: "https://www.linkedin.com/in/atakan-coban-291b27138/",
			username: "@Atakan Çoban",
		},
		{
			icon: <BiLogoDiscord size={35} />,
			label: "Discord",
			href: "https://discord.com/channels/@me/855812906876534845",
			username: "lurfflex",
		},
	];

	return (
		<div className="w-screen min-h-screen relative flex justify-between flex-col">
			<Navbar />
			<div className="w-full h-full flex flex-col items-center justify-center p-3 gap-5">
				<div className="flex flex-col gap-5 justify-center w-3/4 max-lg:w-full">
					<h1 className="text-gray-300 text-4xl max-lg:text-center max-xl:text-3xl max-md:text-2xl">
						<strong>{t("contact.title")}</strong>
					</h1>
					<div className="min-h-[100px] max-lg:w-full">
						<TypeAnimation
							sequence={[t("contact.description"), 500]}
							wrapper="p"
							className="indent-4 text-2xl text-gray-400 h-full max-lg:text-xl max-xl:text-start w-full"
						/>
					</div>
				</div>
				<div className="w-3/4 max-lg:w-full max-2xl:grid-cols-2 h-full grid grid-cols-3 place-items-center place-content-center max-lg:grid-cols-1 gap-3">
					{medias.map((media, index) => {
						return (
							<a
								className="w-full h-full flex items-center gap-2 text-gray-300 bg-[#111] p-5 transition-all rounded-lg border border-blue-500/50 hover:border-blue-500 hover:scale-95"
								key={index}
								target="_blank"
								href={media.href}
							>
								<div>{media.icon}</div>
								<div className="flex justify-center flex-col p-3">
									<span className="text-xl font-semibold">{media.label}</span>
									<span className="text-blue-500 truncate">{media.username}</span>
								</div>
							</a>
						);
					})}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Contact;
