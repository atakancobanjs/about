import React from "react";

import Navbar from "../../Components/Navbar/Navbar";
import Slider from "../../Components/About/Slider/Slider";
import Header from "../../Components/About/Header/Header";
import Footer from "../../Components/Footer/Footer";

const About = () => {
	return (
		<div className="w-full min-h-screen flex flex-col relative">
			<Navbar />
			<div className="flex-grow flex items-center justify-center flex-col gap-5">
				<Header />
				<Slider />
			</div>
			<Footer />
		</div>
	);
};

export default About;
