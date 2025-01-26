import { Stack } from "expo-router";
import { View } from "react-native";
import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";

import { ThemeSwitch } from "@/components/ThemeSwitcher";
import { colors } from "@/constants/colors";
import { useColorScheme } from "@/lib/useColorScheme";

export const unstable_settings = {
	initialRouteName: "(root)",
};

const AppLayout = () => {
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";

	const backgroundColor = isDark
		? colors.dark.background
		: colors.light.background;
	const foregroundColor = isDark
		? colors.dark.foreground
		: colors.light.foreground;

	const modalScreenOptions: NativeStackNavigationOptions = {
		presentation: "modal" as const,
		headerShown: true,
		headerStyle: {
			backgroundColor,
		},
		headerTintColor: foregroundColor,
		gestureEnabled: true,
		headerRight: () => (
			<View className="mr-4">
				<ThemeSwitch />
			</View>
		),
	};

	return (
		<View className="flex-1">
			<Stack
				screenOptions={{
					headerShown: false,
					gestureEnabled: false,
					headerStyle: {
						backgroundColor,
					},
					headerTintColor: foregroundColor,
				}}
			>
				<Stack.Screen name="(protected)" />
				<Stack.Screen name="welcome" />
				<Stack.Screen
					name="sign-up"
					options={{
						...modalScreenOptions,
						headerTitle: "Sign Up",
					}}
				/>
				<Stack.Screen
					name="sign-in"
					options={{
						...modalScreenOptions,
						headerTitle: "Sign In",
					}}
				/>
				<Stack.Screen
					name="modal"
					options={{
						...modalScreenOptions,
						headerTitle: "Modal",
					}}
				/>
			</Stack>
		</View>
	);
};

export default AppLayout;
