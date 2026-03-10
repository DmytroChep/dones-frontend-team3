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

export interface IAdress {
	id: number;
	city: string;
	postDepartament?: string;
	street: string;
	home: string;
	appartament: string;
	entrants: string;
}

export interface ICreateAdress {
	id?: number;
	city: string;
	postDepartament?: string;
	street: string;
	home: string;
	appartament: string;
	entrants: string;
}

export interface IUpdateAdress {
	id?: number;
	city?: string;
	postDepartament?: string;
	street?: string;
	home?: string;
	appartament?: string;
	entrants?: string;
}

export interface IUerWithRelations {
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
	userAdress: IAdress[];
	order: IOrder[];
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

export interface IOrderProduct {
	id: number;
	amount: number;
	priceInPurchase: number;
	productId: number;
	product: {
		id: number;
		title: string;
		description: string;
		color: string;
		price: number;
		discount: number | null;
		img: string;
		creationDate: string;
	};
}

export interface IOrder {
	id: number;
	totalPrice: number;
	status: string;
	trackingNumber: string;
	deliveryAddress: string;
	createdAt: string;
	userId: number;
	user: IUser;
	products: IOrderProduct[];
}

export interface IShipment {
	items: [
		{
			id: string;
			number: string;
			scheduled_delivery_date: string;
			history_tracking: [
				{
					code: string;
					code_name: string;
					country_code: string;
					settlement: string;
					date: string;
				},
			];
			related_numbers: [];
		},
	];
}

export interface IShipmentParcel {
	number: string;
	rowNumber: number;
	untied: boolean;
}

export interface IShipmentService {
	id: string;
	shipmentId: string;
	shipmentParcelRowNumber: string;
}

export interface IShipmentfromNovaPost {
	id: number;
	number: string;
	scheduledDeliveryDate: string;
	status: string;
	cost: number;
	parcelsAmount: number;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	deliveryPartners: [];
	parcels: IShipmentParcel[];
	services: IShipmentService[];
}

export const SHIPMENT_STATUS_MAP: Record<string, number> = {
	// Крок 0 — Оформлено
	"Registered and being prepared": 0,
	Created: 0,

	// Крок 1 — Збирається
	Collecting: 1,
	"At the sender warehouse": 1,
	"Received by sender": 1,

	// Крок 2 — У дорозі
	"On the way": 2,
	"In transit": 2,
	"Departed from warehouse": 2,
	"Arrived at sorting center": 2,
	"Departed from sorting center": 2,

	// Крок 3 — Доставлено (до відділення)
	"Arrived at the city": 3,
	"At the branch": 3,
	"Arrived at destination": 3,
	"Ready for pickup": 3,
	"Arrived at division": 3,

	// Крок 4 — Отримано
	Delivered: 4,
	"Received by recipient": 4,
	"Successfully delivered": 4,
};
