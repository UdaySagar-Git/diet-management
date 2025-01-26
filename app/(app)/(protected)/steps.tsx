import { ScrollView, View, Dimensions } from "react-native";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { useEffect } from "react";
import { BarChart, LineChart } from "react-native-chart-kit";
import { colors } from "@/constants/colors";
import { useColorScheme } from "@/lib/useColorScheme";

const StepsPage = () => {
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";
	const foregroundColor = isDark
		? colors.dark.foreground
		: colors.light.foreground;
	const primaryColor = isDark ? colors.dark.primary : colors.light.primary;

	const progress = useSharedValue(0);
	const dailySteps = "6,543";
	const dailyTarget = "10,000";

	const weeklyData = {
		labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
		datasets: [
			{
				data: [8432, 10243, 7654, 9876, 6543, 8765, 9234],
				color: (opacity = 1) => `rgba(147, 51, 234, ${opacity})`,
			},
		],
	};

	const monthlyData = {
		labels: ["1w", "2w", "3w", "4w"],
		datasets: [
			{
				data: [45678, 52345, 48765, 51234],
			},
		],
	};

	useEffect(() => {
		const numValue = Number(dailySteps.replace(/[^0-9.]/g, ""));
		const numTarget = Number(dailyTarget.replace(/[^0-9.]/g, ""));
		const calculatedProgress = (numValue / numTarget) * 100;

		progress.value = withSpring(calculatedProgress, {
			damping: 15,
			stiffness: 100,
		});
	}, [dailySteps, dailyTarget]);

	const chartConfig = {
		backgroundColor: "transparent",
		backgroundGradientFrom: "transparent",
		backgroundGradientTo: "transparent",
		decimalPlaces: 0,
		color: (opacity = 1) => `rgba(147, 51, 234, ${opacity})`,
		labelColor: () => foregroundColor,
		strokeWidth: 2,
		barPercentage: 0.5,
		fillShadowGradientFrom: primaryColor,
		fillShadowGradientTo: `${primaryColor}33`,
		propsForLabels: {
			fill: foregroundColor,
		},
		propsForBackgroundLines: {
			stroke: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
		},
		formatYLabel: (yLabel: string) => {
			const value = parseInt(yLabel, 10);
			return value.toLocaleString();
		},
	};

	return (
		<ScrollView className="flex-1 bg-background">
			<View className="px-4 py-6 space-y-6">
				<Card className="p-6 bg-card">
					<Text className="text-2xl font-bold text-foreground">
						Today's Steps
					</Text>
					<View className="items-center mt-6">
						<Text className="text-4xl font-bold text-primary">
							{dailySteps}
						</Text>
						<Text className="text-sm text-muted-foreground mt-2">
							Goal: {dailyTarget} steps
						</Text>
						<Progress value={progress.value} className="mt-4 h-3 w-full" />
					</View>
				</Card>

				<Card className="p-6 bg-card">
					<Text className="text-xl font-bold text-foreground mb-4">
						Weekly Overview
					</Text>
					<BarChart
						data={weeklyData}
						width={Dimensions.get("window").width - 48}
						height={220}
						chartConfig={chartConfig}
						showBarTops={false}
						fromZero
						yAxisLabel=""
						yAxisSuffix=" steps"
						verticalLabelRotation={0}
						withInnerLines={true}
						style={{
							borderRadius: 16,
							marginLeft: -16,
						}}
					/>
				</Card>

				<Card className="p-6 bg-card">
					<Text className="text-xl font-bold text-foreground mb-4">
						Monthly Trend
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
						Sync with Health App
					</Text>
				</Button>
			</View>
		</ScrollView>
	);
};

export { StepsPage as default };
