import React from "react";

import { Badge } from "antd";

const Card = ({ image_url, title, description, hash, date }) => {
	return (
		<a
			href={hash}
			target="_blank"
			className="max-w-md w-full h-1/2 flex flex-col items-center justify-center border border-[#555] bg-[#090909] p-0.5 rounded-md hover:scale-105 hover:border-pink-500 transition-all"
		>
			<Badge.Ribbon text={date} color="purple">
				<img src={image_url} alt={title} className="w-full object-contain rounded-t-md" />
				<div className="w-full px-1 py-0.5 flex flex-col justify-center rounded-b-md">
					<h3 className="text-lg font-semibold text-gray-300">{title}</h3>
					<p className="text-sm text-gray-300/70">{description}</p>
				</div>
			</Badge.Ribbon>
		</a>
	);
};

export default Card;
