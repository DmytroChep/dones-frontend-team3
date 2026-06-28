import { useState, useEffect, useCallback } from "react";
import {
	NovaPoshtaCity,
	NovaPoshtaLocker,
	UseNovaPoshtaLockersReturn,
} from "../assets/types/hooks/useNovaPost-types";

export const NP_TOKEN =
	"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJucCIsImlhdCI6MTc3NDAyODk4MywiZXhwIjoxNzc0MDMyNTgzLCJjaWQiOiJiZjdhYmVkOC02MzM5LTRjYzQtYmVkYi02YzNlZDRjOWJkNjQiLCJyZWYiOiI2OWE4NDljMTc2NDVhNzM0NTMwNjc5ZTIiLCJzcmMiOiJsb2NhbCIsInN1YiI6ImV5SnBkaUk2SW5SdlEwTk9Xa0pSWlRCMlJDdEtaVTVoVkZOVFRVRTlQU0lzSW5aaGJIVmxJam9pWVV0eE1rcDNOa0pqVjJwV2NEUm1lRmhFWTFabmRYZHNOMFU0SzNSRVoxSkZRMGxxTUVwNVdEUkJhREUxY0dFclVrdEpSSFphTlRsNVpFUlVUSGxDVFNJc0ltMWhZeUk2SW1OaE9XWTBOalUwTlRGak0ySTJOek0yWVdVMlpEZzFZVFJtT1RWak1HSmhaVFpoTXpJM05EY3lNbVkzTldZM05XVTFPREV5TnpRM1pXVmhaRFk0WWpFaUxDSjBZV2NpT2lJaWZRPT0ifQ.Rcf6K4Ej3aQKoRxKu3aFLqoA3E2Wxts0JfCdSKVH0w4";

interface UseNovaPoshtaLockersOptions {
	city: NovaPoshtaCity;
	deliveryType: string;
}

const CYRILLIC_REGEX = /[а-яА-ЯіІїЇєЄ]/;

export function useNovaPoshtaLockers({
	city,
	deliveryType,
}: UseNovaPoshtaLockersOptions): UseNovaPoshtaLockersReturn {
	const [lockers, setLockers] = useState<NovaPoshtaLocker[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchLockers = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(
				`https://api-stage.novapost.pl/v.1.0/divisions?limit=100&page=1&cityName=${encodeURIComponent(city)}`,
				{
					method: "GET",
					headers: {
						Authorization: `${NP_TOKEN}`,
						"Content-Type": "application/json",
					},
				},
			);
			const data = await response.json();
			const all: NovaPoshtaLocker[] = data.items ?? [];

			const ukrainianOnly = all.filter((item) =>
				CYRILLIC_REGEX.test(item.name),
			);

			if (deliveryType === "postomat") {
				setLockers(
					ukrainianOnly.filter((item) =>
						item.name.toLowerCase().includes("пункт"),
					),
				);
			} else {
				setLockers(
					ukrainianOnly.filter((item) =>
						item.name.toLowerCase().includes("відділення"),
					),
				);
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unknown error");
			setLockers([]);
		} finally {
			setLoading(false);
		}
	}, [city, deliveryType]);

	useEffect(() => {
		fetchLockers();
	}, [fetchLockers]);

	return { lockers, loading, error, refetch: fetchLockers };
}
