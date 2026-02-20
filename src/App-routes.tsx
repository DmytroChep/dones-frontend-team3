import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DarkHeaderLayout } from "./app/darkHeaderLayout";
import { Layout } from "./app/Layout";
import { About } from "./pages/about";
import { CatalogPage } from "./pages/catalog";
import { HomePage } from "./pages/home";
import { NotFound } from "./pages/not-found/not-found";
import { ProductPage } from "./pages/productPage";
import { Profile } from "./pages/profile";
import { Contact } from "./pages/contact";

export function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<DarkHeaderLayout />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/product/:id" element={<ProductPage />} />
				</Route>
				<Route path="/" element={<Layout />}>
					<Route path="/contacts/" element={<Contact />} />
					<Route path="/profile/" element={<Profile />}/>
					<Route path="/about/" element={<About />} />
					<Route path="/catalog/" element={<CatalogPage />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
