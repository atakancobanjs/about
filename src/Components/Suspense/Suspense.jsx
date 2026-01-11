import React from "react";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Suspense = () => {
	return (
		<div className="w-full min-h-screen flex flex-col relative">
			<Navbar />
			<div className="flex-grow flex items-center justify-center flex-col gap-5"></div>
			<Footer />
		</div>
	);
};

export default Suspense;
