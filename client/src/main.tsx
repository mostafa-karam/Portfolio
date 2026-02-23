import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootEl = document.getElementById("root");
if (!rootEl) {
	console.error("Root element not found");
} else {
	try {
		createRoot(rootEl).render(<App />);
	} catch (err) {
		console.error("Render error:", err);
		rootEl.innerText = "Render error: " + (err instanceof Error ? err.message : String(err));
	}
}
