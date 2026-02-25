import {
	createContext,
	type ReactNode,
	useCallback,
	useEffect,
	useState,
} from "react";
import type {
	IUser,
	IUserLogin,
	IUserReg,
} from "../assets/types/backend-types";
import type { IFormData } from "../shared/Form/Form.types";

interface IUserContext {
	token: string | null;
	user: IUser | null;
	signUp: (userData: IUserReg) => Promise<string>;
	signIn: (userData: IUserLogin) => Promise<string>;
	logout: () => void;
}

interface IUserContextProviderProps {
	children: ReactNode;
}

export const UserContext = createContext<IUserContext | null>(null);

export function UserContextProvider(props: IUserContextProviderProps) {
	const { children } = props;
	const [token, setToken] = useState<string | null>(
		localStorage.getItem("token"),
	);
	const [user, setUser] = useState<IUser | null>(null);

	async function signIn(UserBody: IFormData) {
		const response = await fetch(`http://127.0.0.1:3000/user/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(UserBody),
		});

		if (!response.ok) throw new Error("Login failed");

		const data: string = await response.json();
		console.log(data)
		localStorage.setItem("token", data);
		setToken(data);
		return data
	}

	async function signUp(UserBody: IFormData) {
		const response = await fetch(`http://127.0.0.1:3000/user/registration`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(UserBody),
		});

		if (!response.ok) throw new Error("Registration failed");

		const data = await response.json();
		setToken(data);
		localStorage.setItem("token", data);
		return data
	}


	const logout = useCallback(() => {
		setToken(null);
		setUser(null);
		localStorage.removeItem("token");
	}, []);

	useEffect(() => {
		async function fetchMe() {
			if (!token) return;

			try {
				const response = await fetch(`http://127.0.0.1:3000/user/me`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (response.ok) {
					const userData = await response.json();
					setUser(userData);
				} else {
					if (!response.ok) logout();
				}
			} catch (err) {
				console.error("Ошибка загрузки пользователя", err);
			}
		}

		fetchMe();
	}, [token, logout]);

	return (
		<UserContext.Provider value={{ token, user, signIn, signUp, logout }}>
			{children}
		</UserContext.Provider>
	);
}
