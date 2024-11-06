import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
// import { RouterProvider } from "react-router-dom";

export const defaultValue = {
	currentTheme: "",
	setCurrentTheme: () => {},
	data: {
		dark: {
			backgroundColor: "#0B2447",
			fontColor: "#D4F6FF",
			cardBox: "#A5D7E8",
			cardText: "#19376D",
			buttonContainer: "#19376D",
			buttonText: "#D4F6FF",
			buttonBorder: "1px solid #D4F6FF",

		},
		light: {
			backgroundColor: "#D4F6FF",
			fontColor: "#0B2447",
			cardBox: "#0B2447",
			cardText: "#FBFBFB",
			buttonContainer: "#D4F6FF",
			buttonText: "#0B2447",
			buttonBorder: "1px solid #0B2447",
		},
	},
};

export const ThemeContext = createContext(defaultValue);
export const useTheme = () => {
	const theme = useContext(ThemeContext);
	return theme;
};

// eslint-disable-next-line react/prop-types
export function ThemeProvider({ children }) {
	const [currentTheme, setCurrentTheme] = useState("light");

	function updateToLocalStorage(theme) {
		localStorage.setItem("theme", theme);
	}

	useEffect(() => {
		const persistentTheme = localStorage.getItem("theme");
		if (persistentTheme) {
			setCurrentTheme(persistentTheme);
		}
	}, []);

	// if (!currentTheme) {
	// 	return null;
	// }

	return (
		<ThemeContext.Provider
			value={{
				currentTheme,
				setCurrentTheme: (theme) => {
					updateToLocalStorage(theme);
					setCurrentTheme(theme);
				},
				data: defaultValue.data,
			}}>
			{children}
		</ThemeContext.Provider>
	);
}
