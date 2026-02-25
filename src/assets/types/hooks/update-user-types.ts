export interface IUpdateuser{
	id?: number;
	username?: string;
	email?: string;
	password?: string;
	isAdmin?: boolean;
	name?: string;
	surname?: string;
	middleName?: string;
	birthday?: string;
	phoneNumber?: string;
}

export interface IUpdatePassword{
	email: string,
	password: string
}