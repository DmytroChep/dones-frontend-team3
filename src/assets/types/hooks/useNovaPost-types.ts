export type NovaPoshtaCity =
	| "Вінниця"
	| "Одеса"
	| "Харків"
	| "Дніпро"
	| "Київ"
	| "Львів";

export interface NovaPoshtaLocker {
	id: number;
	name: string;
	shortName: string;
	cityName?: string;
	address?: string;
}

export interface UseNovaPoshtaLockersReturn {
	lockers: NovaPoshtaLocker[];
	loading: boolean;
	error: string | null;
	refetch: () => void;
}
