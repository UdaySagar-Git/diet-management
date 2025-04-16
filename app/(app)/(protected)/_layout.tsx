import { Stack, Tabs } from "expo-router";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/colors";
import { useColorScheme } from "@/lib/useColorScheme";
import { ThemeSwitch } from "@/components/ThemeSwitcher";

const ProtectedLayout = () => {
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";

	const backgroundColor = isDark
		? colors.dark.background
		: colors.light.background;
	const foregroundColor = isDark
		? colors.dark.foreground
		: colors.light.foreground;

	return (
		<Tabs
			screenOptions={{
				headerStyle: {
					backgroundColor,
					borderBottomWidth: 0,
					elevation: 0,
					shadowOpacity: 0,
				},
				headerTintColor: foregroundColor,
				headerTitleAlign: "left",
				headerTitle: ({ children }) => (
					<View className="flex-row items-center">
						<Image
							source={require("@/assets/icon-transparent.png")}
							className="h-12 w-12"
							resizeMode="contain"
						/>
						<Text
							style={{
								color: foregroundColor,
								fontSize: 20,
								fontWeight: "700",
								letterSpacing: 0.5,
							}}
						>
							{children}
						</Text>
					</View>
				),
				headerRight: () => (
					<View className="mr-4 flex-row items-center">
						<ThemeSwitch />
					</View>
				),
				tabBarStyle: {
					backgroundColor,
					borderTopWidth: 0,
					elevation: 0,
					shadowOffset: {
						width: 0,
						height: 0,
					},
					shadowOpacity: 0,
					shadowRadius: 0,
				},
				tabBarActiveTintColor: isDark
					? colors.dark.primary
					: colors.light.primary,
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="home-outline" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="steps"
				options={{
					title: "Steps",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="footsteps-outline" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="meals"
				options={{
					title: "Meals",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="restaurant-outline" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="weight"
				options={{
					title: "Weight",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="scale-outline" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="water"
				options={{
					title: "Water",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="water-outline" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="person-outline" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="water-goal"
				options={{
					href: null,
				}}
			/>
		</Tabs>
	);
};

export default ProtectedLayout;
