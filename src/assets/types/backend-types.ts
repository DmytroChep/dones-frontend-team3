export interface ICategory {
	id: number;
	name: string;
}

export interface IProduct {
	id: number;
	title: string;
	price: number;
	img: string;
	category: ICategory[];
	description: string;
	color: string;
	_count: {
		orderProduct: number;
	};
	productDescription: productDescription[],
	ProductCharacteristic: ProductCharacteristic
}


interface productDescription{
	id: number,
	title: string,
	description: string,
	img: string,
	productId: number
}

interface ProductCharacteristic{
	id: number,
	title: string,
	description: string,
	img: string,
	coding: string,
	ufsStorage: number,
	eMMSStorage: number,
	productId: number
}