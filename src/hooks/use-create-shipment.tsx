import { useContext, useEffect, useState } from "react";
import type {
	IOrder,
	IShipment,
	IShipmentfromNovaPost,
} from "../assets/types/backend-types";
import { IOrderRequest } from "../pages/OrderPage/ProductPage";
import { UserContext } from "../context";
import { env } from "process";
import { ENV } from "../config/env";
import { NP_TOKEN } from "./use-get-poshtomats";

export function useCreateShipment() {
	const [shipment, setShipment] = useState<IShipmentfromNovaPost | null>(null);

	const createShipment = async () => {
		const shipment = {
			status: "ReadyToShip",
			clientOrder: "",
			note: "",
			payerType: "Sender",
			payerContractNumber: null,
			invoice: null,
			services: [],
			parcels: [
				{
					cargoCategory: "documents",
					number: null,
					parcelDescription: "Documents",
					insuranceCost: "0.01",
					rowNumber: 1,
					untied: false,
					width: 250,
					length: 350,
					height: 20,
					actualWeight: 1000,
					volumetricWeight: 1000,
				},
			],
			sender: {
				companyTin: "",
				companyName: "",
				phone: "48900555111",
				email: "chuckS@ff.ff",
				name: "Chuck NorrisS",
				countryCode: "PL",
				settlementId: 22326,
				address: null,
				divisionId: 948389,
				ioss: null,
				addressParts: {},
			},
			recipient: {
				companyTin: "",
				companyName: "",
				phone: "48555444333",
				email: "ChuckNorrisR@gmail.comm",
				name: "Chuck Norris",
				countryCode: "PL",
				settlementId: 22326,
				address: null,
				divisionId: 1888291,
				addressParts: {},
			},
		};
		try {
			const response = await fetch(
				`https://api-stage.novapost.pl/v.1.0/shipments`,
				{
					method: "POST",
					headers: {
						Authorization: NP_TOKEN,
						"Content-Type": "application/json",
						Accept: "application/json",
						"Accept-Language": "ua",
					},
					body: JSON.stringify(shipment),
				},
			);
			const data = (await response.json()) as IShipmentfromNovaPost;

			setShipment(data);
			console.log(data);
			return data;
		} catch (error) {
			console.error("Failed to fetch Products:", error);
		}
	};

	return { shipment, createShipment };
}
