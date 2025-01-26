import { ScrollView, View } from "react-native";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

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
	return (
		<ScrollView className="flex-1 bg-background">
			<View className="px-4 py-6 space-y-6">
				<Card className="p-6 bg-card">
					<Text className="text-2xl font-bold text-foreground mb-6">
						Today's Meal Plan
					</Text>
					<View className="space-y-4">
						<MealCard
							mealType="Breakfast"
							calories="400"
							suggestion="Oatmeal with berries and nuts"
							time="8:00 AM"
						/>
						<MealCard
							mealType="Lunch"
							calories="600"
							suggestion="Grilled chicken salad"
							time="1:00 PM"
						/>
						<MealCard
							mealType="Dinner"
							calories="500"
							suggestion="Baked salmon with vegetables"
							time="7:00 PM"
						/>
					</View>
				</Card>

				<Button className="h-14 bg-primary w-full" onPress={() => {}}>
					<Text className="text-primary-foreground font-semibold text-base">
						Log New Meal
					</Text>
				</Button>
			</View>
		</ScrollView>
	);
};

export { MealsPage as default };
