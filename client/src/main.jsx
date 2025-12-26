import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";
import ThemeContextProvider from "./context/ThemeContextProvider.jsx";

createRoot(document.getElementById("root")).render(
	<ThemeContextProvider>
		<BrowserRouter>
			<AppProvider>
				<App />
			</AppProvider>
		</BrowserRouter>
	</ThemeContextProvider>
);
