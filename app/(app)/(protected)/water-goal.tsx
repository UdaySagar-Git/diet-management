import { View, TextInput, ScrollView } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useHealth } from "@/context/health-context";
import { useRouter } from "expo-router";

const WaterGoalPage = () => {
  const router = useRouter();
  const { waterGoal, setWaterGoal } = useHealth();
  const [goal, setGoal] = useState(waterGoal);

  useEffect(() => {
    setGoal(waterGoal);
  }, [waterGoal]);

  const handleUpdateGoal = () => {
    setWaterGoal(goal);
    router.back();
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="px-4 py-6 space-y-6">
        <Card className="p-6 bg-card">
          <Text className="text-2xl font-bold text-foreground mb-6">
            Set Daily Water Goal
          </Text>
          <View className="space-y-4">
            <View>
              <Text className="text-lg font-semibold text-foreground mb-2">
                Goal (in ml)
              </Text>
              <TextInput
                className="bg-muted rounded-lg p-4 text-foreground"
                placeholder="Enter goal in ml"
                keyboardType="numeric"
                value={goal.toString()}
                onChangeText={(text) => setGoal(Number(text) || 0)}
              />
            </View>
            <View className="flex-row space-x-4 mt-4">
              <Button
                className="flex-1 h-14"
                variant="outline"
                onPress={() => router.back()}
              >
                <Text className="font-semibold text-base">Cancel</Text>
              </Button>
              <Button
                className="flex-1 h-14 bg-primary"
                onPress={handleUpdateGoal}
              >
                <Text className="text-primary-foreground font-semibold text-base">
                  Update Goal
                </Text>
              </Button>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

export default WaterGoalPage; 