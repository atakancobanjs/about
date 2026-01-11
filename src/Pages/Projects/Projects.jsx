import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { TypeAnimation } from "react-type-animation";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Card from "../../Components/Projects/Card";
import ClickableCard from "../../Components/Projects/ClickableCard";

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

	const DevelopedProjects = [
		{
			title: t("developingProjects.chatApp.title"),
			description: t("developingProjects.chatApp.description"),
			date: t("developingProjects.chatApp.date"),
		},
		{
			title: t("developingProjects.blogApp.title"),
			description: t("developingProjects.blogApp.description"),
			date: t("developingProjects.blogApp.date"),
		},
	];

	return (
		<div className="min-h-screen w-full h-full relative flex justify-between flex-col select-none">
			<Navbar />
			<div className="h-full w-full relative flex justify-center items-center flex-col gap-3">
				<div className="w-full h-full flex flex-col items-center justify-center p-3 gap-5">
					<div className="flex flex-col gap-5 justify-center w-3/4 max-lg:w-full z-10">
						<h1 className="text-gray-300 text-4xl max-lg:text-center max-xl:text-3xl max-md:text-2xl">
							<strong>{t("projects.title")}</strong>
						</h1>
						<div className="max-lg:w-full">
							<TypeAnimation
								sequence={[t("projects.description"), 500]}
								wrapper="p"
								className="indent-4 text-2xl text-gray-400 h-full max-lg:text-xl max-xl:text-start w-full"
							/>
						</div>
					</div>
					<div className="w-48 h-48 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500 fixed z-0 -bottom-20 -left-10 drop-shadow-xl blur-xl"></div>
					<div className="w-48 h-48 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500 fixed z-0 bottom-3/4 left-3/4 drop-shadow-xl blur-xl"></div>
					<div className="w-full h-full flex gap-5 items-center justify-center flex-wrap p-10 overflow-y-auto z-10">
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
				{DevelopedProjects.length > 0 && (
					<>
						<hr className="w-3/4 border-violet-500" />
						<div className="w-full h-full flex flex-col items-center justify-center p-3 gap-5">
							<div className="flex flex-col gap-5 justify-center w-3/4 max-lg:w-full">
								<h1 className="text-gray-300 text-4xl max-lg:text-center max-xl:text-3xl max-md:text-2xl">
									<strong>{t("developingProjects.title")}</strong>
								</h1>
								<div className="max-lg:w-full">
									<TypeAnimation
										sequence={[t("developingProjects.description"), 500]}
										wrapper="p"
										className="indent-4 text-2xl text-gray-400 h-full max-lg:text-xl max-xl:text-start w-full"
									/>
								</div>
							</div>
							<div className="w-full h-full flex gap-5 items-center justify-center flex-wrap p-10 overflow-y-auto">
								{DevelopedProjects.map((project, index) => (
									<ClickableCard key={index} title={project.title} description={project.description} date={project.date} />
								))}
							</div>
						</div>
					</>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default Projects;
