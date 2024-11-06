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
		},
		light: {
			backgroundColor: "#D4F6FF",
			fontColor: "#0B2447",
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
