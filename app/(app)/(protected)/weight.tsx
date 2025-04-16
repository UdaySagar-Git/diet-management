import { ScrollView, View, TextInput, Dimensions } from "react-native";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { LineChart } from "react-native-chart-kit";
import { colors } from "@/constants/colors";
import { useColorScheme } from "@/lib/useColorScheme";
import { useState } from "react";
import { useHealth } from "@/context/health-context";

const WeightPage = () => {
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";
	const foregroundColor = isDark
		? colors.dark.foreground
		: colors.light.foreground;
	const [weight, setWeight] = useState("");
	const {
		addWeight,
		getLatestWeight,
		getWeeklyWeightData,
		getMonthlyWeightData,
	} = useHealth();

	const latestWeight = getLatestWeight();
	const weeklyData = {
		labels: getWeeklyWeightData().labels,
		datasets: [{ data: getWeeklyWeightData().data }],
	};
	const monthlyData = {
		labels: getMonthlyWeightData().labels,
		datasets: [{ data: getMonthlyWeightData().data }],
	};

	const handleLogWeight = async () => {
		if (!weight) return;
		await addWeight({ weight: parseFloat(weight) });
		setWeight("");
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
					<Text className="text-2xl font-bold text-foreground mb-6">
						Log Weight
					</Text>
					<View className="space-y-4">
						<View>
							<Text className="text-lg font-semibold text-foreground mb-2">
								Weight (kg)
							</Text>
							<TextInput
								className="bg-muted rounded-lg p-4 text-foreground"
								placeholder="Enter weight in kg"
								keyboardType="numeric"
								value={weight}
								onChangeText={setWeight}
							/>
						</View>

						<Button
							className="h-14 bg-primary w-full"
							onPress={handleLogWeight}
						>
							<Text className="text-primary-foreground font-semibold text-base">
								Log Weight
							</Text>
						</Button>
					</View>
				</Card>

				<Card className="p-6 bg-card">
					<Text className="text-2xl font-bold text-foreground">
						Current Weight
					</Text>
					<View className="items-center mt-6">
						<Text className="text-4xl font-bold text-primary">
							{latestWeight ? `${latestWeight} kg` : "No data"}
						</Text>
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
			</View>
		</ScrollView>
	);
};

export { WeightPage as default };
