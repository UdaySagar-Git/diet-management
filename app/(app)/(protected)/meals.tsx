import { ScrollView, View, TextInput } from "react-native";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useHealth } from "@/context/health-context";

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

const MealsPage = () => {
	const [mealType, setMealType] = useState("");
	const [calories, setCalories] = useState("");
	const [description, setDescription] = useState("");
	const { addMeal, getTodayMeals } = useHealth();
	const todayMeals = getTodayMeals();

	const handleLogMeal = async () => {
		if (!mealType || !calories) return;
		await addMeal({
			type: mealType,
			calories: parseFloat(calories),
			description,
		});
		setMealType("");
		setCalories("");
		setDescription("");
	};

	return (
		<ScrollView className="flex-1 bg-background">
			<View className="px-4 py-6 space-y-6">
				<Card className="p-6 bg-card">
					<Text className="text-2xl font-bold text-foreground mb-6">
						Log New Meal
					</Text>
					<View className="space-y-4">
						<View>
							<Text className="text-lg font-semibold text-foreground mb-2">
								Meal Type
							</Text>
							<TextInput
								className="bg-muted rounded-lg p-4 text-foreground"
								placeholder="e.g., Breakfast, Lunch, Dinner"
								value={mealType}
								onChangeText={setMealType}
							/>
						</View>

						<View>
							<Text className="text-lg font-semibold text-foreground mb-2">
								Calories
							</Text>
							<TextInput
								className="bg-muted rounded-lg p-4 text-foreground"
								placeholder="Enter calories"
								keyboardType="numeric"
								value={calories}
								onChangeText={setCalories}
							/>
						</View>

						<View>
							<Text className="text-lg font-semibold text-foreground mb-2">
								Description
							</Text>
							<TextInput
								className="bg-muted rounded-lg p-4 text-foreground"
								placeholder="Describe your meal"
								multiline
								numberOfLines={3}
								value={description}
								onChangeText={setDescription}
							/>
						</View>

						<Button
							className="h-14 bg-primary w-full"
							onPress={handleLogMeal}
						>
							<Text className="text-primary-foreground font-semibold text-base">
								Log Meal
							</Text>
						</Button>
					</View>
				</Card>

				<Card className="p-6 bg-card">
					<Text className="text-2xl font-bold text-foreground mb-6">
						Today's Meals
					</Text>
					<View className="space-y-4">
						{todayMeals.map((meal) => (
							<MealCard
								key={meal.id}
								mealType={meal.type}
								calories={meal.calories.toString()}
								suggestion={meal.description}
								time={new Date(meal.timestamp).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}
							/>
						))}
						{todayMeals.length === 0 && (
							<Text className="text-center text-muted-foreground">
								No meals logged today
							</Text>
						)}
					</View>
				</Card>
			</View>
		</ScrollView>
	);
};

export { MealsPage as default };
