import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/lib/useColorScheme";
import { colors } from "@/constants/colors";

export function ThemeSwitch() {
	const { colorScheme, toggleColorScheme } = useColorScheme();

	const isDark = colorScheme === "dark";
	const backgroundColor = isDark
		? colors.dark.background
		: colors.light.background;
	const iconColor = isDark ? colors.dark.foreground : colors.light.foreground;

	return (
		<TouchableOpacity onPress={toggleColorScheme}>
			<View
				style={{
					backgroundColor,
					padding: 5,
					borderRadius: 20,
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				<Ionicons
					name={isDark ? "moon" : "sunny"}
					size={24}
					color={iconColor}
				/>
			</View>
		</TouchableOpacity>
	);
}
