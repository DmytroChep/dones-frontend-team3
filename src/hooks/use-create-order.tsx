import { useContext, useState } from "react";
import type { IOrder } from "../assets/types/backend-types";
import { IOrderRequest } from "../pages/OrderPage/ProductPage";
import { UserContext } from "../context";
import { useCreateShipment } from "./use-create-shipment";

export function useCreateOrder() {
	const [order, setOrder] = useState<IOrder | null>(null);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const userContextData = useContext(UserContext);
	const token = userContextData?.token;
	const { createShipment } = useCreateShipment();

	const createOrder = async (orderdata: IOrderRequest) => {
		try {
			const shipment = await createShipment();
			console.log(shipment);
			const trackingNumber = shipment?.parcels[0].number || null;
			console.log(trackingNumber);

			const finalOrderData = { ...orderdata, trackingNumber };
			setIsLoaded(false);

			const response = await fetch(`http://127.0.0.1:3000/user/order`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(finalOrderData),
			});
			const data = await response.json();

			setOrder(data);
		} catch (error) {
			console.error("Failed to create order:", error);
		} finally {
			setIsLoaded(true);
		}
	};

	return { order, isLoaded, createOrder };
}
