import { useState } from "react";
import type { IUpdatePassword } from "../assets/types/hooks/update-user-types";

export function useUpdatePassword() {
	const [isLoading, setIsLoading] = useState(false);

	const updatePassword = async (userData: IUpdatePassword) => {
		setIsLoading(true);
		try {
			const response = await fetch(
				`http://127.0.0.1:3000/user/updatePassword`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },

					body: JSON.stringify(userData),
				},
			);

			const data: IUpdatePassword = await response.json();

			return data;
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return { updatePassword, isLoading };
}
