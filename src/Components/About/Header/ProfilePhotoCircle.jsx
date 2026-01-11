import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ProfilePhotoCircle = ({ image, circlePath, onClick }) => {
	const [offset, setOffset] = useState(image.startOffset);

	useEffect(() => {
		let animationFrameId;
		let startTime = null;
		const duration = 15000; // 10 saniye

		const animate = (timestamp) => {
			if (!startTime) startTime = timestamp;
			const elapsed = timestamp - startTime;
			const progress = (elapsed % duration) / duration;

			setOffset((image.startOffset + progress * 100) % 100);
			animationFrameId = requestAnimationFrame(animate);
		};

		animationFrameId = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(animationFrameId);
	}, [image.startOffset]);

	// Scale ve opacity hesaplama
	const normalizedOffset = offset % 100;
	let scale = 1;
	let opacity = 1;

	if (normalizedOffset >= 25 && normalizedOffset < 50) {
		scale = 0.8;
		opacity = 0.5;
	} else if (normalizedOffset >= 50 && normalizedOffset < 75) {
		scale = 0.8;
		opacity = 0.5;
	}

	return (
		<motion.button
			onClick={() => onClick(image)}
			className="w-24 h-24 rounded-lg border border-violet-500 absolute top-0 left-0 shadow-lg overflow-hidden z-20"
			style={{
				offsetPath: `path("${circlePath}")`,
				offsetDistance: `${offset}%`,
				offsetRotate: "0deg",
			}}
		>
			<img src={image.src} alt="Profile" className="w-full h-full object-cover" draggable={false} />
		</motion.button>
	);
};

export default ProfilePhotoCircle;
