import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Card from "../../Components/Projects/Card";

import AboutCardPhoto from "../../Public/Card/about_page_card_photo.png";
import WeatherCardPhoto from "../../Public/Card/weather_page_card_photo.png";
import TodoCardPhoto from "../../Public/Card/todo_page_card_photo.png";

const Projects = () => {
	const { t } = useTranslation();

	const Route = useNavigate();

	const ProjectsData = [
		{
			image_url: AboutCardPhoto,
			title: t("projects.about.title"),
			description: t("projects.about.description"),
			hash: "https://acobnn.netlify.app",
			date: t("projects.about.date"),
		},
		{
			image_url: WeatherCardPhoto,
			title: t("projects.weather.title"),
			description: t("projects.weather.description"),
			hash: "https://cobanweather.netlify.app/",
			date: t("projects.weather.date"),
		},
		{
			image_url: TodoCardPhoto,
			title: t("projects.todo.title"),
			description: t("projects.todo.description"),
			hash: "https://cobantodo.netlify.app/",
			date: t("projects.todo.date"),
		},
	];

	return (
		<div className="w-screen h-screen relative flex justify-between flex-col">
			<Navbar />
			<div className="h-full relative flex justify-center items-center flex-col gap-3">
				<div className="w-48 h-48 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500 absolute z-10 -bottom-20 -left-10 drop-shadow-xl blur-xl"></div>
				<div className="w-48 h-48 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500 absolute z-10 bottom-3/4 left-3/4 drop-shadow-xl blur-xl"></div>
				<div className="w-full h-full flex gap-5 items-center justify-center flex-wrap p-10 overflow-y-auto">
					{ProjectsData.map((project, index) => (
						<Card
							key={index}
							image_url={project.image_url}
							title={project.title}
							description={project.description}
							hash={project.hash}
							date={project.date}
						/>
					))}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Projects;
