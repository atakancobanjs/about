import React from "react";

import { Badge } from "antd";

const Card = ({ image_url, title, description, hash, date }) => {
	return (
		<a
			href={hash}
			target="_blank"
			className="max-w-md w-full h-auto flex flex-col items-center justify-center border border-[#555] bg-[#090909] p-0.5 rounded-md hover:scale-105 hover:border-pink-500 transition-all"
		>
			<Badge.Ribbon text={date} color="purple">
				<img src={image_url} alt={title} className="w-full h-auto object-contain rounded-t-md" />
				<div className="w-full h-32 px-3 py-2 flex flex-col justify-start rounded-b-md overflow-hidden">
					<h3 className="text-lg max-md:text-base font-semibold text-gray-300 line-clamp-1">{title}</h3>
					<p className="text-sm max-md:text-xs text-gray-300/70 line-clamp-4">{description}</p>
				</div>
			</Badge.Ribbon>
		</a>
	);
};

export default Card;
