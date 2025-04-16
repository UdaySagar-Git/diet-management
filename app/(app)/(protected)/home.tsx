import { ScrollView, View, Pressable } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import Animated, {
	useAnimatedStyle,
	withSpring,
	useSharedValue,
} from "react-native-reanimated";
import { useRouter } from "expo-router";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { colors } from "@/constants/colors";
import { useColorScheme } from "@/lib/useColorScheme";
import { useHealth } from "@/context/health-context";

const Home = () => {
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";
	const foregroundColor = isDark
		? colors.dark.foreground
		: colors.light.foreground;
	const primaryColor = isDark ? colors.dark.primary : colors.light.primary;
	const router = useRouter();
	const {
		getTodaySteps,
		getTodayWater,
		getLatestWeight,
		getWeeklyWeightData,
	} = useHealth();

	const dailySteps = getTodaySteps();
	const dailyWater = getTodayWater();
	const latestWeight = getLatestWeight();
	const weightData = {
		labels: getWeeklyWeightData().labels,
		datasets: [{ data: getWeeklyWeightData().data }],
	};

	return (
		<ScrollView className="flex-1 bg-background">
			<View className="px-4 space-y-8">
				<Card className="p-6 pt-2 bg-card">
					<Text className="mb-6 text-2xl font-bold text-foreground">
						Today's Progress
					</Text>
					<View className="flex-row justify-between">
						<Pressable onPress={() => router.push("/steps")}>
							<StatsCard
								icon="footsteps-outline"
								value={dailySteps.toLocaleString()}
								label="Steps"
								target="10,000"
							/>
						</Pressable>
						<Pressable onPress={() => router.push("/meals")}>
							<StatsCard
								icon="flame-outline"
								value="1,200"
								label="Calories"
								target="2,000"
							/>
						</Pressable>
						<Pressable onPress={() => router.push("/water")}>
							<StatsCard
								icon="water-outline"
								value={`${(dailyWater / 1000).toFixed(1)}L`}
								label="Water"
								target="2.5L"
							/>
						</Pressable>
					</View>
				</Card>

				<Card className="p-6 bg-card">
					<Text className="mb-6 text-2xl font-bold text-foreground">
						Weight Progress
					</Text>
					<LineChart
						data={weightData}
						width={Dimensions.get("window").width - 64}
						height={220}
						chartConfig={{
							backgroundColor: "transparent",
							backgroundGradientFrom: "transparent",
							backgroundGradientTo: "transparent",
							decimalPlaces: 1,
							color: (opacity = 1) => `rgba(147, 51, 234, ${opacity})`,
							labelColor: () => foregroundColor,
							propsForLabels: {
								fill: foregroundColor,
							},
						}}
						bezier
						style={{
							borderRadius: 16,
							marginLeft: -10,
						}}
					/>
				</Card>

				<Card className="p-4 bg-card">
					<Text className="mb-6 text-2xl font-bold text-foreground">
						Today's Meal Plan
					</Text>
					<View>
						<MealCard
							mealType="Breakfast"
							calories="400"
							suggestion="Oatmeal with berries and nuts"
							time="8:00 AM"
						/>
						<View className="h-3" />
						<MealCard
							mealType="Lunch"
							calories="600"
							suggestion="Grilled chicken salad"
							time="1:00 PM"
						/>
						<View className="h-3" />
						<MealCard
							mealType="Dinner"
							calories="500"
							suggestion="Baked salmon with vegetables"
							time="7:00 PM"
						/>
					</View>
				</Card>

				<View className="flex-row justify-between mb-4">
					<Button
						className="flex-1 h-14 bg-primary mr-4"
						onPress={() => router.push("/meals")}
					>
						<Text className="text-primary-foreground font-semibold text-base">
							Log Meal
						</Text>
					</Button>
					<Button
						className="flex-1 h-14"
						variant="outline"
						onPress={() => router.push("/weight")}
					>
						<Text className="font-semibold text-base">Log Weight</Text>
					</Button>
				</View>
			</View>
		</ScrollView>
	);
};

const StatsCard = ({
	icon,
	value,
	label,
	target,
}: {
	icon: string;
	value: string;
	label: string;
	target: string;
}) => {
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === "dark";
	const primaryColor = isDark ? colors.dark.primary : colors.light.primary;

	const progress = useSharedValue(0);

	useEffect(() => {
		const numValue = Number(value.replace(/[^0-9.]/g, ""));
		const numTarget = Number(target.replace(/[^0-9.]/g, ""));
		const calculatedProgress = (numValue / numTarget) * 100;

		progress.value = withSpring(calculatedProgress, {
			damping: 15,
			stiffness: 100,
		});
	}, [value, target]);

	return (
		<View className="items-center px-2">
			<Ionicons name={icon as any} size={28} color={primaryColor} />
			<Text className="mt-3 text-xl font-bold text-foreground">{value}</Text>
			<Text className="text-sm text-muted-foreground mt-1">{label}</Text>
			<Progress value={progress.value} className="mt-3 h-2 w-20" />
		</View>
	);
};

const MealCard = ({
	mealType,
	calories,
	suggestion,
	time,
}: {
	mealType: string;
	calories: string;
	suggestion: string;
	time: string;
}) => (
	<View className="flex-row items-center justify-between p-4 bg-muted rounded-xl">
		<View className="flex-1">
			<Text className="text-lg font-semibold text-foreground">{mealType}</Text>
			<Text className="text-sm text-muted-foreground mt-1">{suggestion}</Text>
			<Text className="text-xs text-muted-foreground mt-1">{time}</Text>
		</View>
		<View className="items-end">
			<Text className="text-base font-semibold text-primary">
				{calories} cal
			</Text>
		</View>
	</View>
);

export default Home;
