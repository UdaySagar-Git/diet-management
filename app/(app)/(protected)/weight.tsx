import { ScrollView, View, Dimensions } from "react-native";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { LineChart } from "react-native-chart-kit";
import { colors } from "@/constants/colors";
import { useColorScheme } from "@/lib/useColorScheme";

const WeightPage = () => {
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";
	const foregroundColor = isDark
		? colors.dark.foreground
		: colors.light.foreground;

	const weeklyData = {
		labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
		datasets: [
			{
				data: [76.5, 76.3, 76.4, 76.2, 76.0, 75.8, 75.7],
			},
		],
	};

	const monthlyData = {
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
		datasets: [
			{
				data: [80, 79, 78, 77.5, 77, 76.5],
			},
		],
	};

	const chartConfig = {
		backgroundColor: "transparent",
		backgroundGradientFrom: "transparent",
		backgroundGradientTo: "transparent",
		decimalPlaces: 1,
		color: (opacity = 1) => `rgba(147, 51, 234, ${opacity})`,
		labelColor: () => foregroundColor,
		propsForLabels: {
			fill: foregroundColor,
		},
		propsForBackgroundLines: {
			stroke: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
		},
	};

	return (
		<ScrollView className="flex-1 bg-background">
			<View className="px-4 py-6 space-y-6">
				<Card className="p-6 bg-card">
					<Text className="text-2xl font-bold text-foreground">
						Current Weight
					</Text>
					<View className="items-center mt-6">
						<Text className="text-4xl font-bold text-primary">75.7 kg</Text>
						<Text className="text-sm text-muted-foreground mt-2">
							Goal: 73.0 kg
						</Text>
					</View>
				</Card>

				<Card className="p-6 bg-card">
					<Text className="text-xl font-bold text-foreground mb-4">
						Weekly Progress
					</Text>
					<LineChart
						data={weeklyData}
						width={Dimensions.get("window").width - 48}
						height={220}
						chartConfig={chartConfig}
						bezier
						style={{
							borderRadius: 16,
							marginLeft: -16,
						}}
					/>
				</Card>

				<Card className="p-6 bg-card">
					<Text className="text-xl font-bold text-foreground mb-4">
						6-Month Trend
					</Text>
					<LineChart
						data={monthlyData}
						width={Dimensions.get("window").width - 48}
						height={220}
						chartConfig={chartConfig}
						bezier
						style={{
							borderRadius: 16,
							marginLeft: -16,
						}}
					/>
				</Card>

				<Button className="h-14 bg-primary w-full" onPress={() => {}}>
					<Text className="text-primary-foreground font-semibold text-base">
						Log New Weight
					</Text>
				</Button>
			</View>
		</ScrollView>
	);
};

export { WeightPage as default };
