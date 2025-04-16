import "../global.css";

import { Stack } from "expo-router";
import { AuthProvider } from "@/context/auth-provider";
import { HealthProvider } from "@/context/health-context";

export default function RootLayout() {
	return (
		<AuthProvider>
			<HealthProvider>
				<Stack screenOptions={{ headerShown: false }} />
			</HealthProvider>
		</AuthProvider>
	);
}
