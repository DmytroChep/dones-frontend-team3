import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./app/Layout";
import { About } from "./pages/about";
import { HomePage } from "./pages/home";
import { NotFound } from "./pages/not-found/not-found";
import { CatalogPage } from "./pages/catalog";

export function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/about/" element={<About />} />
					<Route path="/catalog/" element={<CatalogPage/>}/>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
