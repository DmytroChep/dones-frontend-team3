import { useState } from "react";
import type { IUpdateAdress } from "../assets/types/backend-types";

export function useUpdateAdress() {
	const [address, setaddress] = useState<IUpdateAdress | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const update = async (updateData: IUpdateAdress) => {
		setIsLoading(true);
		try {
			const response = await fetch(`http://127.0.0.1:3000/user/adress/${updateData.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},

				body: JSON.stringify(updateData),
			});

			const data: IUpdateAdress = await response.json();
			setaddress(data);
			return data;
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return { update, address, isLoading };
}
