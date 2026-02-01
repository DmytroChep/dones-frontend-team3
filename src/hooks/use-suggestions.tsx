import { useEffect, useState } from "react";
import type { IProduct, IProductsSuggHeaders } from "../assets/types";

export function useProductsSugg(productsSuggHeaders: IProductsSuggHeaders) {
	const [Products, setProducts] = useState<IProduct[]>([]);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	const { typeOfSuggestion, take } = productsSuggHeaders;

	useEffect(() => {
		async function getAllProducts() {
			try {
				setIsLoaded(false);

				const url = `http://127.0.0.1:3000/products/suggestions?`;
				const params = new URLSearchParams();

				if (take) params.append("take", take.toString());
				if (typeOfSuggestion === "new") params.append("new", "true");
				if (typeOfSuggestion === "popular") params.append("popular", "true");

				const response = await fetch(url + params.toString());
				const data = await response.json();

				console.log(params.toString());

				setProducts(data.reverse());
			} catch (error) {
				console.error("Failed to fetch Products:", error);
			} finally {
				setIsLoaded(true);
			}
		}

		getAllProducts();
	}, [typeOfSuggestion, take]);

	return { Products, isLoaded };
}
