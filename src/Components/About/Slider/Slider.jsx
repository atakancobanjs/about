import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsTranslate, BsFillStarFill } from "react-icons/bs";
import { GoRepoForked } from "react-icons/go";
import { MdOutlineBalance } from "react-icons/md";
import { CgTranscript } from "react-icons/cg";

import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

import { useTranslation } from "react-i18next";

const Slider = () => {
	const [Repos, setRepos] = useState([]);
	const [Load, setLoad] = useState(false);

	const { t } = useTranslation();

	useEffect(() => {
		const FetchDataFromGithub = async () => {
			setLoad(true);
			const Data = await axios.get("https://api.github.com/users/Lurff/repos");
			return Data.data;
		};

		FetchDataFromGithub().then((value) => {
			setLoad(false);
			setRepos(value);
		});
	}, []);

	const Render = () => {
		if (Load) {
			return (
				<div className="w-full h-full flex items-center justify-center">
					<Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: "#8b5cf6" }} spin />} />
				</div>
			);
		} else {
			return (
				<div className="w-full h-full place-content-center grid grid-cols-2 gap-5 overflow-y-visible max-xl:grid-cols-1">
					{Repos.map((repo) => (
						<a
							href={repo.html_url}
							target="_blank"
							key={repo.id}
							className="flex h-40 w-full bg-[#111] cursor-pointer flex-col justify-between rounded-lg border border-violet-500/50 p-4 transition-all hover:scale-105 max-lg:scale-90 max-lg:hover:scale-100 hover:border-violet-500"
						>
							<div className="w-full space-y-3">
								<p className="text-lg text-white font-semibold">{repo.name}</p>
								<p className="text-lg text-[#aaa] line-clamp-2">{repo.description || t("about.projects.noDescription")}</p>
							</div>
							<div className="w-full flex items-center justify-between">
								<div className="flex items-center gap-2">
									<span className="flex items-center text-white bg-violet-500/40 rounded-md gap-1 p-0.5">
										<BsFillStarFill size={15} className="mx-1" />
										<span className="px-1">{repo.stargazers_count}</span>
									</span>
									<span className="flex items-center text-white bg-violet-500/40 rounded-md gap-1 p-0.5">
										<GoRepoForked size={15} className="mx-1" />
										<span className="px-1">{repo.forks}</span>
									</span>
									<span className="flex items-center text-white bg-violet-500/40 rounded-md p-0.5 text-nowrap max-xl:hidden">
										<MdOutlineBalance size={23} className="mx-1" />
										<span className="px-1 text-sm">{repo.license?.spdx_id || t("about.projects.noLicense")}</span>
									</span>
								</div>
								<span className="flex items-center text-white bg-violet-500/40 rounded-md gap-1 p-0.5">
									<CgTranscript size={23} className="mx-1" />
									<span className="px-1 text-sm">{repo.language}</span>
								</span>
							</div>
						</a>
					))}
				</div>
			);
		}
	};

	return (
		<div className="w-[60%] h-full flex gap-5 justify-center p-3 flex-col max-xl:w-full">
			<h1 className="text-gray-300 text-4xl">
				<strong>{t("about.projects.title")}</strong>
			</h1>
			{Render()}
		</div>
	);
};

export default Slider;
