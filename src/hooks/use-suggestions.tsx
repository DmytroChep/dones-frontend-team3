import { useEffect, useState } from "react";
import type { IProduct, IProductsSuggHeaders } from "../assets/types";

export function useProductsSugg(productsSuggHeaders: IProductsSuggHeaders) {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	const { typeOfSuggestion, take, sameAs } = productsSuggHeaders;

	useEffect(() => {
		async function getAllProducts() {
			try {
				setIsLoaded(false);

				const params = new URLSearchParams();

				if (take) params.append("take", take.toString());
				if (typeOfSuggestion === "new") params.append("new", "true");
				if (typeOfSuggestion === "popular") params.append("popular", "true");

				if (sameAs) {
					params.append("sameAs", JSON.stringify(sameAs));
				}

				const response = await fetch(
					`http://127.0.0.1:3000/products/suggestions?${params.toString()}`,
				);
				const data = await response.json();

				setProducts(data);
			} catch (error) {
				console.error("Failed to fetch Products:", error);
			} finally {
				setIsLoaded(true);
			}
		}

		getAllProducts();
	}, [typeOfSuggestion, take, sameAs]);

	return { products, isLoaded };
}
