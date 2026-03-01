import { useContext, useState } from "react";
import type { IOrder } from "../assets/types/backend-types";
import { IOrderRequest } from "../pages/OrderPage/ProductPage";
import { UserContext } from "../context";

export function useCreateOrder() {
	const [order, setOrder] = useState<IOrder | null>(null);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const userContextData = useContext(UserContext)
    const token = userContextData?.token

	const createOrder = async (orderdata: IOrderRequest) => {
		try {
			setIsLoaded(false);

			const response = await fetch(`http://127.0.0.1:3000/user/order`, {
				method: "POST",
				headers: {
					"Content-Type": "Application/json",
                    "Authorization": `Bearer ${token}`
				},
				body: JSON.stringify(orderdata),
			});
			const data = await response.json();

			setOrder(data);
		} catch (error) {
			console.error("Failed to fetch Products:", error);
		} finally {
			setIsLoaded(true);
		}
	};

	return { order, isLoaded, createOrder };
}
