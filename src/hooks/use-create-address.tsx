import { useContext, useState } from "react";
import type { IAdress, ICreateAdress, IOrder } from "../assets/types/backend-types";
import { IOrderRequest } from "../pages/OrderPage/ProductPage";
import { UserContext } from "../context";

export function useCreateAdress() {
    const [adress, setadress] = useState<ICreateAdress | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const userContextData = useContext(UserContext)
    const token = userContextData?.token

    const createAdress = async (orderdata: ICreateAdress) => {
        try {
            setIsLoaded(false);

            const response = await fetch(`http://127.0.0.1:3000/user/adress`, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(orderdata),
            });
            const data = await response.json();

            setadress(data);
        } catch (error) {
            console.error("Failed to fetch Products:", error);
        } finally {
            setIsLoaded(true);
        }
    };

    return { adress, isLoaded, createAdress };
}
