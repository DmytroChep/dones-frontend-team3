import { useEffect, useState } from "react";
import type { IProduct } from "../assets/types";

export function useProductById(id: number) {
	const [product, setProduct] = useState<IProduct | null>(null);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	useEffect(() => {
		async function getAllProducts() {
			try {
				setIsLoaded(false);

				const response = await fetch(`http://127.0.0.1:3000/products/${id}`);
				const data = await response.json();

				setProduct(data);
			} catch (error) {
				console.error("Failed to fetch Products:", error);
			} finally {
				setIsLoaded(true);
			}
		}

		getAllProducts();
	}, [id]);

	return { product, isLoaded };
}
