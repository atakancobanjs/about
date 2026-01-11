import React from "react";
import { Trans } from "react-i18next";

const Footer = () => {
	return (
		<footer className="w-full pb-5 flex items-center justify-center transition-all relative">
			<div className="w-3/4 p-3 border-t border-[#555] gap-5 flex">
				<div className="w-full flex items-center flex-col justify-center gap-2">
					<div className="text-gray-400 text-lg max-md:text-sm max-lg:text-center">
						<Trans i18nKey="footer.developer" />
					</div>
					<div className="text-gray-400 text-lg gap-2 max-md:text-sm max-lg:text-center">
						<Trans className="nowrap" i18nKey="footer.description" />
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
