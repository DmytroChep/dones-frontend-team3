import { useContext, useEffect, useState, useCallback } from "react";
import type { IOrder, IShipment } from "../assets/types/backend-types";
import { IOrderRequest } from "../pages/OrderPage/ProductPage";
import { UserContext } from "../context";
import { env } from "process";
import { ENV } from "../config/env";
import { NP_TOKEN } from "./use-get-poshtomats";

export function useGetShipment() {
	const [shipment, setShipment] = useState<IShipment | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const getShipment = useCallback(async (code: string) => {
		if (!code || code.trim() === "") {
			setError("Код відправлення не вказано");
			setShipment(null);
			return null;
		}

		setIsLoading(true);
		setError(null);

		try {
			// TODO: Зробити запит до Nova Poshta API через backend
			// Поки що просто повертаємо дані з кодом
			const response = await fetch(
				`https://api-stage.novapost.pl/v.1.0/shipments/tracking/history/?numbers[]=SHPL8274506803`,
				{
					headers: {
						Authorization: NP_TOKEN,
						"Content-Type": "application/json",
						Accept: "application/json",
						"Accept-Language": "ua",
					},
				},
			);

			if (!response.ok) {
				throw new Error(`API Error: ${response.status}`);
			}

			const data = await response.json();
			setShipment(data);
			return data;
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Помилка при завантаженні даних";
			console.error("Failed to fetch shipment:", error);
			setError(errorMessage);
			setShipment(null);
			return null;
		} finally {
			setIsLoading(false);
		}
	}, []);

	return { shipment, getShipment, isLoading, error };
}
