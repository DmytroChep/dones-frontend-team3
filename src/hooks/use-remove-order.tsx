import { useState } from "react";
import type { IUpdateAdress } from "../assets/types/backend-types";

export function useRemoveOrder() {
	const [isLoading, setIsLoading] = useState(false);

	const remove = async (id: number) => {
		setIsLoading(true);
		try {
			await fetch(`http://127.0.0.1:3000/user/order/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				}
			});
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return { remove, isLoading };
}
