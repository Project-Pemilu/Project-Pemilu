import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Navbar/>,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
]);

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
