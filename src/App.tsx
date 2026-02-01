import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRoutes } from "./App-routes";
import { Layout } from "./app/Layout";
import { About } from "./pages/about";
import { NotFound } from "./pages/not-found/not-found";

export function App() {
	return <AppRoutes />;
}
