import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosClient from "../utils/axiosClient";
import socket from "../utils/socket";
import { useTheme } from "../context/ThemeContext";

export default function HomePage() {
	const [candidates, setCandidates] = useState([]);
	const theme = useTheme();

	async function fetchCandidates() {
		try {
			const { data } = await axiosClient.get("/candidates");
			setCandidates(data);
		} catch (error) {
			console.log(error);
			Swal.fire(error.response.data.message);
		}
	}

	useEffect(() => {
		fetchCandidates();
	}, []);

	useEffect(() => {
		socket.on("notify:incomingVote", (arg) => {
			console.log(arg);
			fetchCandidates();
		});
		return () => {
			socket.off("notify:incomingVote");
		};
	}, []);

	return (
		<div className="min-h-screen" style={{backgroundColor: theme.data[theme.currentTheme].backgroundColor}}>
			<h2 className="text-4xl tracking-widest text-white text-center uppercase font-bold py-5">
				<span className="block">Who will be the next leader?</span>
			</h2>
			<div className="flex flex-wrap justify-center gap-2">
				{candidates.map((candidate) => {
					return (
						<div
							key={candidate.id}
							className="group flex flex-col items-center">
							<div className="relative w-full max-w-xs h-64 overflow-hidden">
								<img
									src={candidate.imgUrl}
									alt={candidate.name}
									className="w-full h-full object-center object-cover rounded-md opacity-90 group-hover:opacity-100"
								/>
							</div>
							<div className="w-full max-w-xs h-40 px-4 py-8 flex flex-col items-center bg-gray-800 rounded-md mt-2">
								<p className="text-xl text-white uppercase text-center font-bold">
									{candidate.name}
								</p>
								<p className="text-sm text-gray-300 text-center my-2 h-24">
									{candidate.motto}
								</p>
								<p className="text-md text-gray-300 text-center font-bold badge py-3">
									Total Vote: {candidate.totalVote}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
