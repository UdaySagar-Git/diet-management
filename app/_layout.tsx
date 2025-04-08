import "../global.css";

import { Slot } from "expo-router";
import { AuthProvider } from "@/context/auth-provider";

export default function AppLayout() {
	return (
		<AuthProvider>
			<Slot />
		</AuthProvider>
	);
}
