import { AppRoutes } from "./App-routes";
import { UserContextProvider } from "./context/user-context";

export function App() {
	return (
		<UserContextProvider>
			<AppRoutes />
		</UserContextProvider>
);
}
