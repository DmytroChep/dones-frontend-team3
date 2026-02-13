export interface ISameAsFilter {
    name?: string;
    limit?: number;
    price?: {
        price: number;
        deviation: number;
    };
    categories?: {
        id: string | number;
        name?: string;
    }[];
}

export interface IProductsSuggHeaders {
    typeOfSuggestion?: "new" | "popular";
    take?: number;
    sameAs?: ISameAsFilter;
}