import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { TypeAnimation } from "react-type-animation";

import { motion } from "framer-motion";

import pp_1 from "../../../Public/profile_photo_1.jpg";
import pp_2 from "../../../Public/profile_photo_2.jpg";
import pp_3 from "../../../Public/profile_photo_3.jpg";
import pp_4 from "../../../Public/profile_photo_4.jpeg";
import pp_5 from "../../../Public/profile_photo_5.jpeg";

import ProfilePhotoCircle from "../Header/ProfilePhotoCircle";

const Header = () => {
	const { t } = useTranslation();

	const circlePath = "M 225 50 A 175 175 0 1 1 224.9 50";

	const Images = useMemo(
		() => [
			{ src: pp_1, startOffset: Math.random() * 100, id: 1 },
			{ src: pp_2, startOffset: Math.random() * 100, id: 2 },
			{ src: pp_3, startOffset: Math.random() * 100, id: 3 },
			{ src: pp_4, startOffset: Math.random() * 100, id: 4 },
			{ src: pp_5, startOffset: Math.random() * 100, id: 5 },
		],
		[]
	);

	const RandomImages = useMemo(() => {
		return Images[Math.floor(Math.random() * Images.length)];
	}, [Images]);

	const [randomImage, setRandomImage] = useState(RandomImages);

	const HandleChangeRandomPhoto = (e) => setRandomImage(e);

	return (
		<div className="w-full h-full flex items-center justify-center p-3 gap-5 max-lg:flex-col">
			<div className="flex items-center justify-center max-lg:w-full m-5">
				<div className="flex flex-col items-center justify-center relative max-lg:w-full w-[350px] h-[350px]">
					<svg xmlns="http://www.w3.org/2000/svg" width="350" height="350" viewBox="0 0 350 350" className="absolute z-10">
						<motion.path
							d="M 175 25 A 150 150 0 1 1 174.9 25"
							fill="transparent"
							strokeWidth="1"
							stroke="#ec4899"
							strokeDasharray="10 5"
							strokeLinecap="round"
						/>
					</svg>

					<img src={randomImage.src} draggable={false} className="w-64 h-64 object-cover rounded-full z-0" />

					{Images.filter((i) => i.src !== randomImage.src).map((image) => (
						<ProfilePhotoCircle key={image.id} image={image} circlePath="M 175 25 A 150 150 0 1 1 174.9 25" onClick={HandleChangeRandomPhoto} />
					))}
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
