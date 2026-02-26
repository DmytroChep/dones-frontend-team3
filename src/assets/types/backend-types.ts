export interface ICategory {
	id: number;
	name: string;
}

export interface IProduct {
	id: number;
	title: string;
	price: number;
	img: string;
	discount?: number;
	category: ICategory[];
	description: string;
	color: string;
	_count: {
		orderProduct: number;
	};
	productDescription: productDescription[];
	ProductCharacteristic: ProductCharacteristic[];
}

export interface ICartProduct {
	id: number;
	title: string;
	price: number;
	img: string;
	discount?: number;
	category: ICategory[];
	description: string;
	color: string;
	quantity: number;
	_count: {
		orderProduct: number;
	};
	productDescription: productDescription[];
	ProductCharacteristic: ProductCharacteristic[];
}

export interface productDescription {
	id: number;
	title: string;
	description: string;
	img: string;
	productId: number;
}

export interface ProductCharacteristic {
	id: number;
	title: string;
	description: string;
	img: string;
	coding: string;
	ufsStorage: number;
	eMMSStorage: number;
	productId: number;
}

export interface IUser {
	id: number;
	username: string;
	email: string;
	password: string;
	isAdmin: boolean;
	name?: string;
	surname?: string;
	middleName?: string;
	birthday?: string;
	phoneNumber?: string;
}

export interface IUserReg {
	username: string;
	email: string;
	password: string;
	isAdmin: boolean;
}

export interface IUserLogin {
	email: string;
	password: string;
}
