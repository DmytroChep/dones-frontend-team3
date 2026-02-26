import { AppRoutes } from "./App-routes";
import { CartContextProvider } from "./context/cart-context";
import { UserContextProvider } from "./context/user-context";

export function App() {
	return (
		<CartContextProvider>
			<UserContextProvider>
				<AppRoutes />
			</UserContextProvider>
		</ CartContextProvider>
);
}
