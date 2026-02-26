import { useContext, useState } from "react";
import type { IUpdateuser } from "../assets/types/hooks/update-user-types";
import { UserContext } from "../context";

export function useUpdateUserData() {
	const [updatedUser, setUpdatedUser] = useState<IUpdateuser | null>(null);
	const [isLoading, setIsLoading] = useState(false);
    const contextData = useContext(UserContext)
    if (!contextData){
        return 
    }

    const {user} = contextData

    if (!user){
        return
    }
    
	const update = async (userData: IUpdateuser) => {
		setIsLoading(true);
		try {
			const response = await fetch(
				`http://127.0.0.1:3000/user/${user.id}`,
				{
					method: "PATCH",
					headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`},

					body: JSON.stringify(userData),
				},
			);

			// if (!response.ok) throw new Error("Update failed");

			const data: IUpdateuser = await response.json();
			setUpdatedUser(data);
			return data;
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return { update, updatedUser, isLoading };
}
