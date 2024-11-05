import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("user");
		navigate("/login");
	};
	return (
		<nav className="bg-white border-gray-200 dark:bg-gray-900">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<Link
					to="/"
					className="flex items-center space-x-3 rtl:space-x-reverse">
					<img src="#" className="h-8" alt="Hacktiv-pemilu" />
					<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
						Hacktiv Pemilu
					</span>
				</Link>
				<div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
					<button
						type="button"
						onClick={handleLogout}
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						Logout
					</button>
				</div>
			</div>
		</nav>
	);
}
